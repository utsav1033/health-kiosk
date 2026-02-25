import { NextRequest, NextResponse } from 'next/server';
import { YOLO_HEALTH_TESTS } from '@/lib/yoloHealthTests';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface RecommendRequest {
  symptoms: string;
}

interface MatchedTest {
  name: string;
  parameters: string[];
  timeToResults: string;
  category: string;
}

interface RecommendResponse {
  symptoms: string;
  matchedTests: MatchedTest[];
  recommendations: string;
  nextSteps: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: RecommendRequest = await request.json();
    const { symptoms } = body;

    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
      return NextResponse.json(
        { error: 'Symptoms field is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    const symptomText = symptoms.toLowerCase().trim();

    const matchedTests = YOLO_HEALTH_TESTS.filter((test) => {
      const testSymptoms = test.symptoms.map((s) => s.toLowerCase());
      return testSymptoms.some((symptom) =>
        symptomText.includes(symptom) || symptom.includes(symptomText)
      );
    });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'API configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    const testsList = matchedTests
      .map((test, index) => {
        return `${index + 1}. ${test.name}
   - Category: ${test.category}
   - Key Parameters: ${test.parameters.join(', ')}
   - Time to Results: ${test.timeToResults}
   - Description: ${test.description}`;
      })
      .join('\n');

    const prompt = `You are a medical assistant for a YoloHealth diagnostic kiosk system. A patient has reported the following symptoms:

PATIENT SYMPTOMS: "${symptoms}"

Based on the patient's symptoms, the following YoloHealth tests have been identified as potentially relevant:

${testsList || 'No direct matches found in the database.'}

Please provide:

1. DETAILED RECOMMENDATIONS: Based on the patient's symptoms and the available YoloHealth tests, provide a professional medical recommendation for which tests should be performed first. Explain why each recommended test is relevant to the symptoms. Consider the urgency of symptoms and standard medical protocols.

2. NEXT STEPS: Provide clear, actionable next steps for the patient. Include:
   - Which tests to perform immediately
   - Which tests can be deferred if necessary
   - Any precautions or preparations needed
   - When to seek immediate medical attention if symptoms worsen

Important guidelines:
- Be professional and clear for a medical kiosk context
- Do not diagnose conditions, only recommend appropriate tests
- Consider test efficiency and patient comfort
- Include relevant health information about what each test measures
- Provide evidence-based recommendations`;

    const response = await model.generateContent(prompt);
    const responseText = response.response.text();

    const sections = responseText.split(/(?=NEXT STEPS:|DETAILED RECOMMENDATIONS:)/i);

    let recommendations = '';
    let nextSteps = '';

    sections.forEach((section) => {
      if (section.toUpperCase().includes('DETAILED RECOMMENDATIONS')) {
        recommendations = section.replace(/^DETAILED RECOMMENDATIONS:\s*/i, '').trim();
      } else if (section.toUpperCase().includes('NEXT STEPS')) {
        nextSteps = section.replace(/^NEXT STEPS:\s*/i, '').trim();
      }
    });

    if (!recommendations) {
      recommendations = responseText;
    }

    const matchedTestsResponse: MatchedTest[] = matchedTests.map((test) => ({
      name: test.name,
      parameters: test.parameters,
      timeToResults: test.timeToResults,
      category: test.category,
    }));

    const result: RecommendResponse = {
      symptoms: symptoms.trim(),
      matchedTests: matchedTestsResponse,
      recommendations,
      nextSteps,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in recommendation endpoint:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while processing your request.';

    return NextResponse.json(
      {
        error: 'An error occurred while processing your request. Please try again.',
        details: message,
      },
      { status: 500 }
    );
  }
}
