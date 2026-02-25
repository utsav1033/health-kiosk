import { NextRequest, NextResponse } from 'next/server';
import { YOLO_HEALTH_TESTS, YoloHealthTest } from '@/lib/yoloHealthTests';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

/**
 * API Route: /api/yolo-recommend
 * 
 * Purpose: Uses Gemini API with LangChain to recommend YoloHealth tests
 * based on patient symptoms.
 * 
 * Input: symptoms (string or comma-separated list)
 * Output: Recommended tests with explanations, parameters, and time to results
 */

interface RecommendRequest {
  symptoms: string;
}

interface TestRecommendation {
  testName: string;
  explanation: string;
  parameters: string[];
  timeToResults: string;
  category: string;
}

interface RecommendResponse {
  symptoms: string;
  matchedTestsCount: number;
  recommendations: TestRecommendation[];
  generalAdvice: string;
  urgencyLevel: 'low' | 'medium' | 'high';
}

interface ErrorResponse {
  error: string;
  details?: string;
}

/**
 * Search YoloHealth test database for tests matching symptoms
 */
function searchTestsBySymptoms(symptoms: string): YoloHealthTest[] {
  const symptomText = symptoms.toLowerCase().trim();
  
  // Split symptoms by comma for multi-symptom input
  const symptomList = symptomText.split(',').map(s => s.trim());
  
  const matchedTests = YOLO_HEALTH_TESTS.filter((test) => {
    const testSymptoms = test.symptoms.map((s) => s.toLowerCase());
    
    // Match if any of the input symptoms match any test symptom
    return symptomList.some((inputSymptom) =>
      testSymptoms.some((testSymptom) =>
        testSymptom.includes(inputSymptom) || inputSymptom.includes(testSymptom)
      )
    );
  });

  // Remove duplicates and sort by relevance
  const uniqueTests = Array.from(
    new Map(matchedTests.map((test) => [test.id, test])).values()
  );

  return uniqueTests.slice(0, 10); // Limit to top 10 matches
}

/**
 * Format matched tests for the prompt
 */
function formatTestsForPrompt(tests: YoloHealthTest[]): string {
  if (tests.length === 0) {
    return 'No direct matches found in the database, but general recommendations will be provided.';
  }

  return tests
    .map(
      (test, index) =>
        `${index + 1}. **${test.name}**
   - Category: ${test.category}
   - Description: ${test.description}
   - Parameters Measured: ${test.parameters.join(', ')}
   - Time to Results: ${test.timeToResults}`
    )
    .join('\n\n');
}

export async function POST(request: NextRequest): Promise<NextResponse<RecommendResponse | ErrorResponse>> {
  try {
    // Validate request body
    const body: RecommendRequest = await request.json();
    const { symptoms } = body;

    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
      return NextResponse.json(
        { error: 'Symptoms field is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not set');
      return NextResponse.json(
        {
          error: 'API configuration error',
          details: 'GEMINI_API_KEY is not configured',
        },
        { status: 500 }
      );
    }

    // Search database for matching tests
    const matchedTests = searchTestsBySymptoms(symptoms);

    // Initialize LangChain Chat with Gemini
    // Using gemini-2.5-flash (free tier, fast and versatile)
    // Fallback options: gemini-2.5-flash-lite, gemini-2.0-flash
    const availableModels = [
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-2.0-flash',
    ];
    
    let chat: ChatGoogleGenerativeAI | null = null;
    let lastError: any = null;
    
    for (const model of availableModels) {
      try {
        chat = new ChatGoogleGenerativeAI({
          model: model,
          apiKey: apiKey,
          temperature: 0.7,
          maxRetries: 1,
        });
        console.log(`[GEMINI] Using model: ${model}`);
        break;
      } catch (err) {
        lastError = err;
        console.warn(`[GEMINI] Model ${model} not available, trying next...`);
      }
    }
    
    if (!chat) {
      console.error('[GEMINI] All models failed to initialize', lastError);
      throw new Error('Failed to initialize Gemini model');
    }

    // Prepare the system prompt
    const systemPrompt = `You are a YoloHealth kiosk assistant. 
Based on patient symptoms, recommend the most relevant tests from our available YoloHealth tests.

Important guidelines:
- Provide specific, evidence-based recommendations
- Explain why each test is relevant to the symptoms
- Do NOT diagnose conditions, only recommend appropriate tests
- Consider the urgency of symptoms and standard medical protocols
- Be professional and clear for a medical kiosk context
- Assess urgency level (low, medium, or high) based on symptoms
- Provide practical next steps and any necessary precautions

Return your response in the following JSON format:
{
  "recommendations": [
    {
      "testName": "Test Name",
      "explanation": "Why this test is recommended for the symptoms",
      "category": "test category"
    }
  ],
  "generalAdvice": "General health advice or precautions",
  "urgencyLevel": "low|medium|high"
}`;

    // Prepare the user message with symptoms and available tests
    const testsInfo = formatTestsForPrompt(matchedTests);
    const userMessage = `Patient Symptoms: ${symptoms}

Available YoloHealth Tests that may be relevant:
${testsInfo}

Please recommend the most appropriate tests and provide relevant medical guidance.`;

    // Call Gemini API using LangChain
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userMessage),
    ];

    let response;
    let responseText: string;
    
    try {
      response = await chat.invoke(messages);
      responseText = typeof response.content === 'string' 
        ? response.content 
        : JSON.stringify(response.content);

      if (!responseText) {
        throw new Error('Invalid response format from LLM');
      }
    } catch (apiError: any) {
      // Log the specific API error
      const errorMessage = apiError.message || '';
      const statusCode = apiError.status;
      
      console.error('[GEMINI_API_ERROR] Gemini API call failed:', {
        message: errorMessage,
        status: statusCode,
        statusText: apiError.statusText,
      });
      
      // Handle specific error cases
      if (statusCode === 429) {
        console.warn('[RATE_LIMIT] Rate limit exceeded, using fallback recommendations');
      } else if (statusCode === 403) {
        console.warn('[REGION_RESTRICTION] This service may not be available in your region');
      } else if (statusCode === 404 || errorMessage.includes('not found')) {
        console.warn('[MODEL_NOT_FOUND] Model not found, trying fallback');
      }
      
      // Return fallback recommendations based on database matches
      console.log('[FALLBACK] Returning keyword-matched recommendations without AI enrichment');
      return NextResponse.json(
        {
          symptoms,
          matchedTestsCount: matchedTests.length,
          recommendations: matchedTests.slice(0, 5).map((test) => ({
            testName: test.name,
            explanation: `${test.description} - This test is relevant to your symptoms.`,
            parameters: test.parameters,
            timeToResults: test.timeToResults,
            category: test.category,
          })),
          generalAdvice: 'These tests are recommended based on your symptoms. Please consult with a healthcare provider for medical advice.',
          urgencyLevel: 'medium' as const,
        },
        { status: 200 }
      );
    }

    // Parse the JSON response
    let parsedResponse;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      parsedResponse = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', responseText);
      return NextResponse.json(
        {
          error: 'Failed to parse recommendation response',
          details: 'The AI response could not be properly parsed',
        },
        { status: 500 }
      );
    }

    // Validate and enrich recommendations with matched test data
    const enrichedRecommendations: TestRecommendation[] = parsedResponse.recommendations
      .map((rec: { testName: string; explanation: string; category?: string }) => {
        const matchedTest = matchedTests.find(
          (t) => t.name.toLowerCase() === rec.testName.toLowerCase()
        );

        return {
          testName: rec.testName,
          explanation: rec.explanation,
          parameters: matchedTest?.parameters || [],
          timeToResults: matchedTest?.timeToResults || 'Contact for details',
          category: rec.category || matchedTest?.category || 'general',
        };
      })
      .slice(0, 5); // Limit to top 5 recommendations

    const result: RecommendResponse = {
      symptoms: symptoms.trim(),
      matchedTestsCount: matchedTests.length,
      recommendations: enrichedRecommendations,
      generalAdvice: parsedResponse.generalAdvice || 'Please consult with a healthcare provider for personalized medical advice.',
      urgencyLevel: parsedResponse.urgencyLevel || 'low',
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in yolo-recommend endpoint:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON in request body',
          details: error.message,
        },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while processing your request';

    return NextResponse.json(
      {
        error: 'An error occurred while processing your request',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for health check or documentation
 */
export async function GET(): Promise<NextResponse<{ message: string }>> {
  return NextResponse.json(
    {
      message: 'YoloHealth Recommendation API. Use POST method with { "symptoms": "your symptoms" }',
    },
    { status: 200 }
  );
}
