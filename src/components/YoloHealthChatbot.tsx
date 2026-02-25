'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TestSelectionModal } from './TestSelectionModal';
import { useConversationMemory } from '@/hooks/useConversationMemory';
import { THEME_COLORS } from '@/constants/theme';

type ChatbotState = 'initial' | 'chat' | 'selection' | 'confirmation' | 'ready-for-tests';

// Error codes for debugging
enum ErrorCode {
  API_CONNECTION_FAILED = 'API_CONNECTION_FAILED',
  NO_MATCHING_TESTS = 'NO_MATCHING_TESTS',
  GEMINI_API_ERROR = 'GEMINI_API_ERROR',
  EMPTY_INPUT = 'EMPTY_INPUT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface TestRecommendation {
  testName: string;
  explanation: string;
  parameters: string[];
  timeToResults: string;
  category: string;
}

interface RecommendationData {
  symptoms: string;
  matchedTestsCount: number;
  recommendations: TestRecommendation[];
  generalAdvice: string;
  urgencyLevel: 'low' | 'medium' | 'high';
}

interface SelectedTest extends TestRecommendation {
  selectedAt?: Date;
}

const QUICK_SYMPTOMS = [
  'Chest Pain',
  'Fatigue',
  'Dizziness',
  'High Blood Pressure',
  'Irregular Heartbeat',
];

// Medical color mapping - professional medical blue, no emojis
const URGENCY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  low: { 
    bg: 'bg-slate-50', 
    border: 'border-slate-400', 
    text: 'text-slate-700',
  },
  medium: { 
    bg: 'bg-amber-50', 
    border: 'border-amber-400', 
    text: 'text-amber-800',
  },
  high: { 
    bg: 'bg-red-50', 
    border: 'border-red-500', 
    text: 'text-red-800',
  },
};

export const YoloHealthChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chatbotState, setChatbotState] = useState<ChatbotState>('initial');
  const [selectedTests, setSelectedTests] = useState<SelectedTest[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use conversation memory hook for context management
  const conversationMemory = useConversationMemory();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateId = (): string => `${Date.now()}-${Math.random()}`;

  const addMessage = (content: string, type: 'user' | 'bot'): void => {
    const message: Message = {
      id: generateId(),
      type,
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);

    // Also add to conversation memory
    conversationMemory.addMessage(content, type === 'bot' ? 'assistant' : 'user');
  };

  const sendSymptoms = async (symptoms: string): Promise<void> => {
    // Validate input
    if (!symptoms || !symptoms.trim()) {
      console.error(`[${ErrorCode.EMPTY_INPUT}] Attempted to send empty symptoms`);
      setError('Please describe your symptoms before sending.');
      return;
    }

    // Add user message
    addMessage(symptoms, 'user');
    setInputValue('');
    setError(null);
    setIsLoading(true);

    // Add loading message
    addMessage('Analyzing your symptoms...', 'bot');

    try {
      // Extract symptoms and track them
      const extractedSymptoms = conversationMemory.extractSymptoms(symptoms);
      const isInitialSymptoms = conversationMemory.context.accumulatedSymptoms.length === 0;
      
      conversationMemory.updateSymptoms(extractedSymptoms, isInitialSymptoms);

      // Determine if this is a follow-up
      const isFollowUp = conversationMemory.isFollowUpQuestion();

      console.log('[API_CALL] Requesting recommendations with context', {
        symptomsCount: extractedSymptoms.length,
        isFollowUp,
        sessionId: conversationMemory.context.sessionId,
      });

      // Call the context-aware API endpoint
      const response = await fetch('/api/yolo-recommend-context', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms,
          conversationHistory: conversationMemory.getConversationHistory(),
          accumulatedSymptoms: conversationMemory.context.accumulatedSymptoms,
          sessionId: conversationMemory.context.sessionId,
          isFollowUp,
        }),
      });

      if (!response.ok) {
        // Log detailed error information
        const statusCode = response.status;
        const statusText = response.statusText;
        console.error(`[${ErrorCode.API_CONNECTION_FAILED}] API request failed`, {
          status: statusCode,
          statusText,
          url: '/api/yolo-recommend-context',
        });

        throw new Error(`API error: ${statusCode} ${statusText}`);
      }

      const data: RecommendationData & { allSymptoms: string[]; contextSummary: string } =
        await response.json();

      // Validate response structure
      if (!data.recommendations || !Array.isArray(data.recommendations)) {
        console.error(`[${ErrorCode.GEMINI_API_ERROR}] Invalid API response format`, { data });
        throw new Error('Invalid response format from recommendation service');
      }

      // Check if any tests were matched
      if (data.matchedTestsCount === 0 || data.recommendations.length === 0) {
        console.warn(`[${ErrorCode.NO_MATCHING_TESTS}] No tests matched symptoms`, {
          symptoms: extractedSymptoms,
        });

        // Remove loading message
        setMessages((prev) => prev.slice(0, -1));
        addMessage(
          'No tests matched your symptoms. Please describe your symptoms differently or try again.',
          'bot'
        );
        setIsLoading(false);
        inputRef.current?.focus();
        return;
      }

      console.log('[API_SUCCESS] Recommendations received', {
        testsCount: data.matchedTestsCount,
        urgencyLevel: data.urgencyLevel,
      });

      setRecommendations(data);
      conversationMemory.storeRecommendations(data.recommendations.map((r) => r.testName));

      // Remove loading message and add success message
      setMessages((prev) => prev.slice(0, -1));
      
      // Customize message based on follow-up status
      if (isFollowUp) {
        addMessage(
          `Found ${data.matchedTestsCount} relevant tests based on all your symptoms (${data.allSymptoms.join(', ')}). Here are my recommendations:`,
          'bot'
        );
      } else {
        addMessage(
          `Found ${data.matchedTestsCount} relevant tests. Here are my recommendations:`,
          'bot'
        );
      }

      setChatbotState('selection');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get recommendations';
      
      // Log the full error with context
      console.error('[ERROR_HANDLER] Caught exception during symptom analysis', {
        errorMessage,
        errorType: err instanceof Error ? err.constructor.name : typeof err,
        stack: err instanceof Error ? err.stack : undefined,
      });

      // Determine error type and set appropriate message
      let userMessage = 'Unable to connect. Please try again.';
      
      if (errorMessage.includes('API error')) {
        setError('Connection error. Please check your internet and try again.');
      } else if (errorMessage.includes('Invalid response')) {
        setError('Service error. Please try a different symptom description.');
        userMessage = 'Unable to process your request. Please try different wording.';
      } else {
        setError('An unexpected error occurred. Please try again.');
      }

      // Remove loading message and add error message
      setMessages((prev) => prev.slice(0, -1));
      addMessage(userMessage, 'bot');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleQuickSymptom = (symptom: string): void => {
    sendSymptoms(symptom);
  };

  const handleBackToSymptoms = (): void => {
    setChatbotState('chat');
    setSelectedTests([]);
  };

  const handleTestsSelected = (tests: SelectedTest[]): void => {
    setSelectedTests(tests);
    setChatbotState('ready-for-tests');
    addMessage(
      `Selected ${tests.length} test(s). You are now ready to proceed to the test collection area.`,
      'bot'
    );
  };

  const handleStartNewAssessment = (): void => {
    setMessages([]);
    setInputValue('');
    setRecommendations(null);
    setError(null);
    setChatbotState('initial');
    setSelectedTests([]);
    conversationMemory.clearSession();
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: THEME_COLORS.bgLight }}>
      {/* Handle Test Selection State */}
      {chatbotState === 'selection' && recommendations && (
        <TestSelectionModal
          tests={recommendations.recommendations}
          urgencyLevel={recommendations.urgencyLevel}
          generalAdvice={recommendations.generalAdvice}
          onBack={handleBackToSymptoms}
          onProceed={handleTestsSelected}
        />
      )}

      {/* Handle Ready for Tests State */}
      {chatbotState === 'ready-for-tests' && selectedTests.length > 0 && (
        <div className="flex flex-col h-full" style={{ backgroundColor: THEME_COLORS.bgWhite }}>
          {/* Success Header */}
          <div 
            className="text-white px-6 py-8 shadow-md border-b-4"
            style={{ 
              backgroundColor: THEME_COLORS.secondaryGreen,
              borderColor: THEME_COLORS.successGreen
            }}
          >
            <h1 className="text-5xl font-bold">Ready for Tests</h1>
            <p className="mt-3 text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Your health assessment is ready to begin
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
            <div className="text-center">
              <div className="text-7xl mb-6 font-bold" style={{ color: THEME_COLORS.secondaryGreen }}>
                ✓
              </div>
              <h2 className="text-4xl font-bold mb-4" style={{ color: THEME_COLORS.textMain }}>
                Assessment Complete
              </h2>
              <p className="text-2xl" style={{ color: THEME_COLORS.textMuted }}>
                You have selected {selectedTests.length} test(s) and are ready to proceed.
              </p>
            </div>

            {/* Selected Tests Summary */}
            <div 
              className="border-2 rounded-xl p-8 max-w-3xl mx-auto shadow-md"
              style={{ 
                borderColor: THEME_COLORS.secondaryGreen,
                backgroundColor: THEME_COLORS.bgWhite
              }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: THEME_COLORS.primaryBlue }}>
                Your Selected Tests
              </h3>
              <div className="space-y-4">
                {selectedTests.map((test, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-4 p-4 rounded-lg border-l-4"
                    style={{ 
                      backgroundColor: THEME_COLORS.hoverBg,
                      borderColor: THEME_COLORS.primaryBlue
                    }}
                  >
                    <span 
                      className="text-3xl font-bold"
                      style={{ color: THEME_COLORS.secondaryGreen }}
                    >
                      ✓
                    </span>
                    <div className="flex-1">
                      <p className="font-bold text-xl" style={{ color: THEME_COLORS.textMain }}>
                        {test.testName}
                      </p>
                      <p className="text-lg mt-1" style={{ color: THEME_COLORS.textMuted }}>
                        Time: {test.timeToResults}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              <button
                onClick={handleStartNewAssessment}
                className="w-full h-16 px-8 text-white text-xl font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: THEME_COLORS.primaryBlue }}
              >
                Start New Assessment
              </button>
              <button
                onClick={() => {
                  console.log('[ACTION] User proceeding to test collection');
                }}
                className="w-full h-16 px-8 text-white text-xl font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: THEME_COLORS.secondaryGreen }}
              >
                Proceed to Test Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regular Chat Interface */}
      {chatbotState !== 'selection' && chatbotState !== 'ready-for-tests' && (
        <>
          {/* Compact Sticky Header */}
          <div 
            className="sticky top-0 z-50 text-white px-4 py-3 shadow-md border-b-2 backdrop-blur-sm"
            style={{ 
              backgroundColor: THEME_COLORS.primaryBlue + 'F2',
              borderColor: THEME_COLORS.medicalBlueDark
            }}
          >
            <h1 className="text-lg font-bold">YoloHealth</h1>
          </div>

          {/* Messages Container - Full Height */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="text-6xl mb-4 font-bold" style={{ color: THEME_COLORS.primaryBlue }}>
                  +
                </div>
                <h2 className="text-3xl font-bold mb-3" style={{ color: THEME_COLORS.textMain }}>
                  Welcome
                </h2>
                <p className="text-lg leading-relaxed max-w-xl" style={{ color: THEME_COLORS.textMuted }}>
                  Describe your symptoms and get personalized test recommendations.
                </p>
              </div>
            ) : (
              <>
                {/* Session Info Bar */}
                {conversationMemory.context.accumulatedSymptoms.length > 0 && (
                  <div 
                    className="border-2 rounded-lg p-3 mb-4 sticky top-12 shadow-sm"
                    style={{ 
                      backgroundColor: THEME_COLORS.bgLight,
                      borderColor: THEME_COLORS.primaryBlue
                    }}
                  >
                    <p className="text-sm font-bold mb-2" style={{ color: THEME_COLORS.primaryBlue }}>
                      Symptoms:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {conversationMemory.context.accumulatedSymptoms.map(
                        (symptom, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg font-semibold text-sm text-white"
                            style={{ backgroundColor: THEME_COLORS.primaryBlue }}
                          >
                            {symptom}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl px-6 py-4 rounded-xl text-lg leading-relaxed ${
                        message.type === 'user'
                          ? 'text-white rounded-br-none shadow-md'
                          : 'border-2 rounded-bl-none shadow-md'
                      }`}
                      style={{
                        backgroundColor: message.type === 'user' ? THEME_COLORS.primaryBlue : THEME_COLORS.bgWhite,
                        color: message.type === 'user' ? 'white' : THEME_COLORS.textMain,
                        borderColor: message.type === 'user' ? undefined : THEME_COLORS.borderLight,
                      }}
                    >
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div 
                      className="border-2 rounded-xl px-6 py-4 rounded-bl-none shadow-md flex items-center gap-4"
                      style={{ 
                        backgroundColor: THEME_COLORS.bgWhite,
                        borderColor: THEME_COLORS.borderLight
                      }}
                    >
                      <div className="flex gap-2">
                        <div 
                          className="w-3 h-3 rounded-full animate-bounce"
                          style={{ backgroundColor: THEME_COLORS.primaryBlue, animationDelay: '0ms' }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full animate-bounce"
                          style={{ backgroundColor: THEME_COLORS.primaryBlue, animationDelay: '150ms' }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full animate-bounce"
                          style={{ backgroundColor: THEME_COLORS.primaryBlue, animationDelay: '300ms' }}
                        />
                      </div>
                      <span className="text-lg font-semibold" style={{ color: THEME_COLORS.textMuted }}>
                        Analyzing your symptoms...
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Recommendations Display */}
            {recommendations && chatbotState === 'chat' && (
              <div className="mt-8 space-y-6">
                {/* Show all accumulated symptoms */}
                {(recommendations as any).allSymptoms && (
                  <div 
                    className="border-2 rounded-xl p-6 shadow-md"
                    style={{ 
                      backgroundColor: THEME_COLORS.bgLight,
                      borderColor: THEME_COLORS.primaryBlue
                    }}
                  >
                    <p className="text-lg font-bold mb-4" style={{ color: THEME_COLORS.primaryBlue }}>
                      Considering all reported symptoms:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {(recommendations as any).allSymptoms.map((symptom: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-lg font-semibold text-lg"
                          style={{ 
                            backgroundColor: THEME_COLORS.hoverBg,
                            color: THEME_COLORS.primaryBlue,
                            border: `2px solid ${THEME_COLORS.primaryBlue}`
                          }}
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Urgency Alert */}
                <div
                  className={`p-6 rounded-xl border-l-8 shadow-lg ${URGENCY_COLORS[recommendations.urgencyLevel].bg}`}
                  style={{
                    borderColor: URGENCY_COLORS[recommendations.urgencyLevel].border,
                  }}
                >
                  <div 
                    className="text-2xl font-bold mb-2"
                    style={{ color: URGENCY_COLORS[recommendations.urgencyLevel].text }}
                  >
                    Priority Level: {
                      recommendations.urgencyLevel === 'high'
                        ? 'High - Urgent Attention'
                        : recommendations.urgencyLevel === 'medium'
                        ? 'Medium - Monitor'
                        : 'Low - Routine'
                    }
                  </div>
                  <p 
                    className="text-lg"
                    style={{ color: URGENCY_COLORS[recommendations.urgencyLevel].text }}
                  >
                    {recommendations.urgencyLevel === 'high'
                      ? 'These symptoms warrant immediate medical attention. Please proceed with the recommended tests.'
                      : recommendations.urgencyLevel === 'medium'
                      ? 'We recommend monitoring these symptoms and completing the recommended tests.'
                      : 'Your symptoms suggest routine testing. Please complete the recommended tests at your convenience.'}
                  </p>
                </div>

                {/* General Advice */}
                {recommendations.generalAdvice && (
                  <div 
                    className="border-2 rounded-xl p-6 shadow-md"
                    style={{ 
                      backgroundColor: THEME_COLORS.bgWhite,
                      borderColor: THEME_COLORS.secondaryGreen
                    }}
                  >
                    <p 
                      className="text-xl font-bold mb-3"
                      style={{ color: THEME_COLORS.secondaryGreen }}
                    >
                      Medical Recommendations:
                    </p>
                    <p className="text-lg" style={{ color: THEME_COLORS.textMain }}>
                      {recommendations.generalAdvice}
                    </p>
                  </div>
                )}

                {/* Selection Prompt */}
                <div 
                  className="border-2 rounded-xl p-6 text-center shadow-md"
                  style={{ 
                    backgroundColor: THEME_COLORS.bgWhite,
                    borderColor: THEME_COLORS.primaryBlue
                  }}
                >
                  <p className="text-2xl mb-6 font-semibold" style={{ color: THEME_COLORS.textMain }}>
                    Review and select the recommended tests
                  </p>
                  <button
                    onClick={() => setChatbotState('selection')}
                    className="px-8 py-4 text-white font-bold text-xl rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: THEME_COLORS.primaryBlue }}
                  >
                    View Test Selection
                  </button>
                </div>
              </div>
            )}

            {/* Quick Symptoms */}
            {messages.length === 0 && (
              <div className="mt-4 max-w-3xl mx-auto">
                <p className="text-center font-bold mb-3 text-sm" style={{ color: THEME_COLORS.textMain }}>
                  Quick Symptoms:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {QUICK_SYMPTOMS.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => handleQuickSymptom(symptom)}
                      disabled={isLoading}
                      className="py-2 px-3 font-bold text-xs rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md border"
                      style={{
                        backgroundColor: THEME_COLORS.bgWhite,
                        color: THEME_COLORS.primaryBlue,
                        borderColor: THEME_COLORS.primaryBlue,
                      }}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* End of messages anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div 
            className="border-t-2 px-4 py-3 shadow-lg"
            style={{ 
              backgroundColor: THEME_COLORS.bgWhite,
              borderColor: THEME_COLORS.primaryBlue
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputValue.trim() && !isLoading) {
                  sendSymptoms(inputValue);
                } else if (!inputValue.trim()) {
                  console.log(`[${ErrorCode.EMPTY_INPUT}] User attempted to send empty message`);
                  setError('Please describe your symptoms before sending.');
                }
              }}
              className="space-y-3 max-w-4xl mx-auto"
            >
              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your symptoms..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-30 disabled:bg-gray-100 text-base font-medium placeholder-gray-400 transition-all"
                  style={{
                    borderColor: THEME_COLORS.borderLight,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = THEME_COLORS.primaryBlue;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${THEME_COLORS.primaryBlue}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = THEME_COLORS.borderLight;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-3 text-white font-bold text-base rounded-lg transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  style={{ backgroundColor: THEME_COLORS.primaryBlue }}
                >
                  {isLoading ? 'Analyzing...' : 'Send'}
                </button>
              </div>
              {error && (
                <div 
                  className="border-l-4 rounded p-3 flex items-start gap-2"
                  style={{ 
                    backgroundColor: 'rgba(220, 38, 38, 0.05)',
                    borderColor: THEME_COLORS.error
                  }}
                >
                  <span className="text-lg font-bold mt-0.5" style={{ color: THEME_COLORS.error }}>
                    !
                  </span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: THEME_COLORS.error }}>
                      Error
                    </p>
                    <p className="text-sm mt-1" style={{ color: THEME_COLORS.error }}>
                      {error}
                    </p>
                    <p className="text-xs mt-1" style={{ color: THEME_COLORS.textMuted }}>
                      Please try describing your symptoms again or use different wording.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default YoloHealthChatbot;
