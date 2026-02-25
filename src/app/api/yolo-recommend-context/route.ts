import { NextRequest, NextResponse } from 'next/server';
import { YOLO_HEALTH_TESTS, YoloHealthTest } from '@/lib/yoloHealthTests';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

/**
 * API Route: /api/yolo-recommend-with-context
 * 
 * Enhanced version that accepts conversation history and context
 * to provide better follow-up recommendations.
 * 
 * Input: 
 *   - symptoms: Current symptoms from user
 *   - conversationHistory: Previous messages in this session
 *   - accumulatedSymptoms: All symptoms mentioned so far
 *   - sessionId: Session identifier for tracking
 * 
 * Output: Recommendations based on all accumulated symptoms
 */

interface ConversationMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isFollowUp?: boolean;
}

interface RecommendWithContextRequest {
  symptoms: string;
  conversationHistory?: ConversationMessage[];
  accumulatedSymptoms?: string[];
  sessionId?: string;
  isFollowUp?: boolean;
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
  allSymptoms: string[];
  matchedTestsCount: number;
  recommendations: TestRecommendation[];
  generalAdvice: string;
  urgencyLevel: 'low' | 'medium' | 'high';
  isFollowUp: boolean;
  contextSummary: string;
  sessionId: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

/**
 * Search YoloHealth test database for tests matching symptoms
 */
function searchTestsBySymptoms(symptoms: string[]): YoloHealthTest[] {
  if (symptoms.length === 0) return [];

  const matchedTests = YOLO_HEALTH_TESTS.filter((test) => {
    const testSymptoms = test.symptoms.map((s) => s.toLowerCase());

    return symptoms.some((inputSymptom) =>
      testSymptoms.some((testSymptom) =>
        testSymptom.includes(inputSymptom.toLowerCase()) ||
        inputSymptom.toLowerCase().includes(testSymptom)
      )
    );
  });

  // Remove duplicates and sort by relevance
  const uniqueTests = Array.from(
    new Map(matchedTests.map((test) => [test.id, test])).values()
  );

  return uniqueTests.slice(0, 10);
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

/**
 * Format conversation history for context
 */
function formatConversationHistory(history: ConversationMessage[]): string {
  if (history.length === 0) {
    return '';
  }

  return history
    .map(
      (msg) =>
        `${msg.type === 'user' ? 'Patient' : 'Assistant'}: ${msg.content.substring(0, 200)}`
    )
    .join('\n');
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<RecommendResponse | ErrorResponse>> {
  try {
    const body: RecommendWithContextRequest = await request.json();
    const {
      symptoms,
      conversationHistory = [],
      accumulatedSymptoms = [],
      sessionId = `session-${Date.now()}`,
      isFollowUp = false,
    } = body;

    // Validate input
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

    // Combine symptoms: accumulated + new
    const symptomsList = symptoms.toLowerCase().split(',').map(s => s.trim());
    const allSymptoms = [
      ...accumulatedSymptoms.map(s => s.toLowerCase()),
      ...symptomsList,
    ].filter((s, idx, arr) => arr.indexOf(s) === idx); // Remove duplicates

    // Search database for matching tests based on ALL symptoms
    const matchedTests = searchTestsBySymptoms(allSymptoms);

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

    // Build conversation context for the prompt
    const conversationContext = formatConversationHistory(conversationHistory);
    const contextIndicator = isFollowUp
      ? 'This is a FOLLOW-UP question. The patient is adding additional information or asking clarifications.'
      : 'This is the INITIAL symptoms report from the patient.';

    // Prepare the system prompt with context awareness
    const systemPrompt = `You are a YoloHealth kiosk assistant specializing in symptom analysis and test recommendations.
Your role is to help patients identify the most relevant medical tests based on their reported symptoms.

CONTEXT MODE: ${contextIndicator}

${isFollowUp && accumulatedSymptoms.length > 0 ? `
IMPORTANT: The patient has previously reported these symptoms: ${accumulatedSymptoms.join(', ')}
Now they are reporting ADDITIONAL symptoms or clarifications: ${symptoms}
Consider ALL reported symptoms (both previous and new) when making recommendations.
` : ''}

${conversationContext ? `
PREVIOUS CONVERSATION:
${conversationContext}
` : ''}

Guidelines:
- Provide specific, evidence-based recommendations
- Consider all reported symptoms together for comprehensive assessment
- Explain why each test is relevant to the complete symptom picture
- Do NOT diagnose conditions, only recommend appropriate tests
- Be professional and clear for a medical kiosk context
- Assess urgency level based on the full symptom profile
- Provide practical next steps and any necessary precautions

Return your response in the following JSON format:
{
  "recommendations": [
    {
      "testName": "Test Name",
      "explanation": "Why this test is recommended given all symptoms",
      "category": "test category"
    }
  ],
  "generalAdvice": "General health advice considering all reported symptoms",
  "urgencyLevel": "low|medium|high"
}`;

    // Prepare the user message
    const testsInfo = formatTestsForPrompt(matchedTests);
    const userMessage = `${isFollowUp ? '[FOLLOW-UP INQUIRY] ' : '[INITIAL REPORT] '}

All symptoms reported by patient: ${allSymptoms.join(', ')}

Most recently added: ${symptoms}

Available YoloHealth Tests that may be relevant:
${testsInfo}

Please recommend the most appropriate tests considering the full symptom picture and provide relevant medical guidance.`;

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
      const contextSummary = isFollowUp
        ? `Considering previous symptoms (${accumulatedSymptoms.join(', ')}) plus new symptoms (${symptoms})`
        : `Initial symptom assessment: ${symptoms}`;
      
      return NextResponse.json(
        {
          symptoms,
          allSymptoms,
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
          isFollowUp,
          contextSummary,
          sessionId,
        },
        { status: 200 }
      );
    }

    // Parse the JSON response
    let parsedResponse;
    try {
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
      .slice(0, 5);

    // Create context summary for the response
    const contextSummary = isFollowUp
      ? `Considering previous symptoms (${accumulatedSymptoms.join(', ')}) plus new symptoms (${symptoms})`
      : `Initial symptom assessment: ${symptoms}`;

    const result: RecommendResponse = {
      symptoms: symptoms.trim(),
      allSymptoms,
      matchedTestsCount: matchedTests.length,
      recommendations: enrichedRecommendations,
      generalAdvice:
        parsedResponse.generalAdvice ||
        'Please consult with a healthcare provider for personalized medical advice.',
      urgencyLevel: parsedResponse.urgencyLevel || 'low',
      isFollowUp,
      contextSummary,
      sessionId,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in yolo-recommend-with-context endpoint:', error);

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
 * GET endpoint for health check
 */
export async function GET(): Promise<NextResponse<{ message: string }>> {
  return NextResponse.json(
    {
      message:
        'YoloHealth Recommendation API with Conversation Context. Use POST method with { "symptoms": "...", "accumulatedSymptoms": [...], "conversationHistory": [...] }',
    },
    { status: 200 }
  );
}
