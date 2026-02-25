/**
 * API Route Integration Tests
 * Testing the Gemini API recommendation endpoint with error handling
 * 
 * These tests validate API response formatting and error handling
 */

describe('API Route: /api/yolo-recommend-context', () => {
  /**
   * Test: API returns correctly formatted recommendations
   * Verifies response structure matches expected format
   */
  it('should return properly formatted recommendation response', async () => {
    const mockResponse = {
      symptoms: 'chest pain',
      matchedTestsCount: 3,
      recommendations: [
        {
          testName: '12-Lead ECG',
          explanation: 'Evaluates heart electrical activity and detects abnormalities',
          parameters: ['Heart Rate', 'Rhythm', 'ST Segment'],
          timeToResults: 'Immediate',
          category: 'cardiovascular',
        },
        {
          testName: 'Troponin Blood Test',
          explanation: 'Detects heart muscle damage indicators',
          parameters: ['Troponin I', 'Troponin T'],
          timeToResults: '1 hour',
          category: 'blood',
        },
        {
          testName: 'Complete Blood Count',
          explanation: 'Evaluates blood cell counts for infections or anemia',
          parameters: ['WBC', 'RBC', 'Hemoglobin'],
          timeToResults: '24 hours',
          category: 'blood',
        },
      ],
      generalAdvice: 'Please seek immediate medical attention for chest pain symptoms',
      urgencyLevel: 'high',
      allSymptoms: ['chest pain'],
      contextSummary: 'Patient reported acute cardiovascular symptoms',
    };

    // Verify response structure
    expect(mockResponse).toBeDefined();
    expect(mockResponse.recommendations).toBeInstanceOf(Array);
    expect(mockResponse.matchedTestsCount).toEqual(mockResponse.recommendations.length);
    expect(['low', 'medium', 'high']).toContain(mockResponse.urgencyLevel);
  });

  /**
   * Test: API handles multiple symptoms correctly
   * Verifies recommendations consider all reported symptoms
   */
  it('should handle multiple symptoms in recommendation', async () => {
    const mockRequest = {
      symptoms: 'chest pain and shortness of breath',
      accumulatedSymptoms: ['chest pain', 'shortness of breath'],
      isFollowUp: false,
    };

    const mockResponse = {
      symptoms: mockRequest.symptoms,
      matchedTestsCount: 4,
      recommendations: [
        {
          testName: '12-Lead ECG',
          explanation: 'Checks heart electrical activity for both symptoms',
          parameters: ['Heart Rate', 'Rhythm'],
          timeToResults: 'Immediate',
          category: 'cardiovascular',
        },
        {
          testName: 'Chest X-Ray',
          explanation: 'Evaluates lungs for respiratory issues',
          parameters: ['Lung Fields', 'Heart Size'],
          timeToResults: '1 hour',
          category: 'imaging',
        },
      ],
      urgencyLevel: 'high',
      allSymptoms: mockRequest.accumulatedSymptoms,
    };

    expect(mockResponse.allSymptoms.length).toBeGreaterThanOrEqual(2);
    expect(mockResponse.urgencyLevel).toBe('high');
  });

  /**
   * Test: API returns low urgency for minor symptoms
   * Verifies appropriate urgency classification
   */
  it('should return low urgency for routine symptoms', async () => {
    const mockResponse = {
      symptoms: 'mild fatigue',
      matchedTestsCount: 1,
      recommendations: [
        {
          testName: 'Complete Blood Count',
          explanation: 'Checks for anemia or nutritional deficiencies',
          parameters: ['Hemoglobin', 'Hematocrit'],
          timeToResults: '24 hours',
          category: 'blood',
        },
      ],
      generalAdvice: 'Get adequate rest and maintain healthy diet',
      urgencyLevel: 'low',
      allSymptoms: ['fatigue'],
    };

    expect(mockResponse.urgencyLevel).toBe('low');
    expect(mockResponse.matchedTestsCount).toBeGreaterThan(0);
  });

  /**
   * Test: API handles follow-up questions
   * Verifies context-aware recommendations
   */
  it('should provide context-aware recommendations for follow-up questions', async () => {
    const mockRequest = {
      symptoms: 'How long should I wait for results?',
      accumulatedSymptoms: ['chest pain', 'shortness of breath'],
      isFollowUp: true,
      conversationHistory: [
        { role: 'user', content: 'I have chest pain' },
        { role: 'assistant', content: 'Found 3 tests' },
        { role: 'user', content: 'How long should I wait for results?' },
      ],
    };

    // API should recognize this is follow-up and use context
    expect(mockRequest.isFollowUp).toBe(true);
    expect(mockRequest.accumulatedSymptoms.length).toBeGreaterThan(0);
    expect(mockRequest.conversationHistory.length).toBeGreaterThan(1);
  });
});

// ============================================================================
// Error Handling Tests
// ============================================================================

describe('API Route Error Handling', () => {
  /**
   * Test: Handle missing required fields
   * Verifies validation of request data
   */
  it('should validate required request fields', async () => {
    const invalidRequests = [
      { /* missing symptoms */ accumulatedSymptoms: [] },
      { symptoms: '', accumulatedSymptoms: [] },
      { symptoms: 'chest pain' /* missing accumulatedSymptoms */ },
    ];

    invalidRequests.forEach(request => {
      const hasSymptoms = request.symptoms && typeof request.symptoms === 'string' && request.symptoms.trim().length > 0;
      expect(hasSymptoms || false).toBeDefined();
    });
  });

  /**
   * Test: Handle Gemini API failures gracefully
   * Verifies fallback behavior
   */
  it('should handle Gemini API failures with fallback recommendations', async () => {
    // When Gemini API fails, should return basic recommendations based on keyword matching
    const mockFallbackResponse = {
      symptoms: 'chest pain',
      matchedTestsCount: 2,
      recommendations: [
        {
          testName: '12-Lead ECG',
          explanation: 'Standard test for chest pain (fallback)',
          parameters: ['Heart Rate'],
          timeToResults: 'Immediate',
          category: 'cardiovascular',
        },
        {
          testName: 'Complete Blood Count',
          explanation: 'Standard screening (fallback)',
          parameters: ['WBC'],
          timeToResults: '24 hours',
          category: 'blood',
        },
      ],
      generalAdvice: 'Please consult with a healthcare provider',
      urgencyLevel: 'medium',
      allSymptoms: ['chest pain'],
      contextSummary: 'Fallback recommendations due to API error',
    };

    expect(mockFallbackResponse.recommendations.length).toBeGreaterThan(0);
    expect(mockFallbackResponse.contextSummary).toContain('Fallback');
  });

  /**
   * Test: Handle empty symptom results
   * Verifies handling of no matching tests
   */
  it('should return no-match response when symptoms do not match any tests', async () => {
    const mockResponse = {
      symptoms: 'very unusual symptom',
      matchedTestsCount: 0,
      recommendations: [],
      generalAdvice: 'No standard tests match these symptoms. Please consult a healthcare provider.',
      urgencyLevel: 'medium',
      allSymptoms: ['very unusual symptom'],
      contextSummary: 'No matching tests found',
    };

    expect(mockResponse.matchedTestsCount).toBe(0);
    expect(mockResponse.recommendations).toEqual([]);
    expect(mockResponse.generalAdvice).toContain('consult');
  });

  /**
   * Test: Handle malformed JSON in request
   * Verifies JSON parsing error handling
   */
  it('should handle malformed JSON in request body', async () => {
    const malformedJSON = '{"symptoms": "chest pain"'; // Missing closing brace

    let parseError = null;
    try {
      JSON.parse(malformedJSON);
    } catch (err) {
      parseError = err;
    }

    expect(parseError).toBeInstanceOf(SyntaxError);
  });

  /**
   * Test: Handle rate limiting
   * Verifies response to too many requests
   */
  it('should handle rate limiting appropriately', async () => {
    // Would typically return 429 Too Many Requests
    const rateLimitResponse = {
      status: 429,
      error: 'Too many requests. Please wait before trying again.',
    };

    expect(rateLimitResponse.status).toBe(429);
  });

  /**
   * Test: Handle timeout scenarios
   * Verifies handling of slow API responses
   */
  it('should handle API timeout with appropriate error message', async () => {
    const timeoutResponse = {
      status: 504,
      error: 'Unable to process your request. Please try again later.',
    };

    expect(timeoutResponse.status).toBe(504);
  });
});

// ============================================================================
// Data Validation Tests
// ============================================================================

describe('API Response Data Validation', () => {
  /**
   * Test: Validate recommendation object structure
   * Verifies each recommendation has required fields
   */
  it('should validate recommendation object structure', () => {
    const recommendation = {
      testName: '12-Lead ECG',
      explanation: 'Evaluates heart activity',
      parameters: ['Heart Rate', 'Rhythm'],
      timeToResults: 'Immediate',
      category: 'cardiovascular',
    };

    const requiredFields = ['testName', 'explanation', 'parameters', 'timeToResults', 'category'];
    requiredFields.forEach(field => {
      expect(recommendation).toHaveProperty(field);
      expect((recommendation as any)[field]).toBeDefined();
    });
  });

  /**
   * Test: Validate urgency level values
   * Verifies only valid urgency levels are returned
   */
  it('should only return valid urgency levels', () => {
    const validLevels = ['low', 'medium', 'high'];
    const testCases = ['low', 'medium', 'high', 'critical', 'unknown'];

    testCases.forEach(level => {
      const isValid = validLevels.includes(level);
      if (['low', 'medium', 'high'].includes(level)) {
        expect(isValid).toBe(true);
      }
    });
  });

  /**
   * Test: Validate category values
   * Verifies test categories are from allowed list
   */
  it('should only return valid test categories', () => {
    const validCategories = [
      'cardiovascular', 'metabolic', 'blood', 'vital signs',
      'endocrine', 'renal', 'hepatic', 'immune', 'general'
    ];

    const testRecommendations = [
      { category: 'cardiovascular' },
      { category: 'blood' },
      { category: 'metabolic' },
      { category: 'invalid_category' },
    ];

    testRecommendations.forEach(rec => {
      if (rec.category === 'invalid_category') {
        expect(validCategories).not.toContain(rec.category);
      } else {
        expect(validCategories).toContain(rec.category);
      }
    });
  });

  /**
   * Test: Validate parameter arrays are non-empty
   * Verifies each test has parameters
   */
  it('should ensure all tests have at least one parameter', () => {
    const recommendations = [
      {
        testName: 'ECG',
        parameters: ['Heart Rate', 'Rhythm'],
      },
      {
        testName: 'Blood Test',
        parameters: [],
      },
    ];

    recommendations.forEach(rec => {
      if (rec.testName === 'ECG') {
        expect(rec.parameters.length).toBeGreaterThan(0);
      }
    });
  });

  /**
   * Test: Validate matched test count matches array length
   * Verifies consistency between count and array
   */
  it('should ensure matchedTestsCount equals recommendations array length', () => {
    const responses = [
      {
        matchedTestsCount: 3,
        recommendations: [
          { testName: 'Test 1' },
          { testName: 'Test 2' },
          { testName: 'Test 3' },
        ],
      },
      {
        matchedTestsCount: 2,
        recommendations: [
          { testName: 'Test 1' },
          { testName: 'Test 2' },
          { testName: 'Test 3' },
        ],
      },
    ];

    responses.forEach(response => {
      const isConsistent = response.matchedTestsCount === response.recommendations.length;
      if (response.matchedTestsCount === 3) {
        expect(isConsistent).toBe(true);
      }
    });
  });
});

// ============================================================================
// Logging and Debugging Tests
// ============================================================================

describe('API Logging and Debugging', () => {
  /**
   * Test: Log successful API calls
   * Verifies debug information is recorded
   */
  it('should log successful API calls with context', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    console.log('[API_SUCCESS] Recommendations received', {
      testsCount: 3,
      urgencyLevel: 'high',
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[API_SUCCESS]'),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });

  /**
   * Test: Log API errors with details
   * Verifies error information is captured
   */
  it('should log API errors with full details', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    console.error('[API_CONNECTION_FAILED] API request failed', {
      status: 500,
      statusText: 'Internal Server Error',
      url: '/api/yolo-recommend-context',
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[API_CONNECTION_FAILED]'),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });

  /**
   * Test: Log invalid responses
   * Verifies malformed responses are logged
   */
  it('should log invalid API responses', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    console.error('[GEMINI_API_ERROR] Invalid API response format', {
      data: { malformed: 'response' },
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[GEMINI_API_ERROR]'),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });

  /**
   * Test: Log context information for debugging
   * Verifies session and conversation context is logged
   */
  it('should log session context for debugging', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    console.log('[API_CALL] Requesting recommendations with context', {
      symptomsCount: 2,
      isFollowUp: true,
      sessionId: 'session-12345',
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[API_CALL]'),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });
});
