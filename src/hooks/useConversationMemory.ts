'use client';

import { useState, useCallback } from 'react';

export interface ConversationMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isFollowUp?: boolean;
}

export interface ConversationContext {
  sessionId: string;
  initialSymptoms: string[];
  accumulatedSymptoms: string[];
  messageHistory: ConversationMessage[];
  previousRecommendations?: string[];
}

/**
 * useConversationMemory Hook
 * 
 * Manages conversation history and context for the chatbot.
 * Maintains session-based memory that accumulates symptoms
 * and provides context for follow-up questions.
 */
export const useConversationMemory = () => {
  const [context, setContext] = useState<ConversationContext>({
    sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    initialSymptoms: [],
    accumulatedSymptoms: [],
    messageHistory: [],
    previousRecommendations: [],
  });

  /**
   * Add a message to conversation history
   */
  const addMessage = useCallback(
    (content: string, type: 'user' | 'assistant', isFollowUp = false) => {
      const message: ConversationMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        content,
        timestamp: new Date(),
        isFollowUp,
      };

      setContext((prev) => ({
        ...prev,
        messageHistory: [...prev.messageHistory, message],
      }));

      return message;
    },
    []
  );

  /**
   * Extract symptoms from user message
   * Simple keyword-based extraction
   */
  const extractSymptoms = useCallback((userMessage: string): string[] => {
    const symptomKeywords = [
      'chest pain',
      'chest discomfort',
      'shortness of breath',
      'breathlessness',
      'fatigue',
      'tired',
      'dizziness',
      'dizzy',
      'vertigo',
      'headache',
      'high blood pressure',
      'hypertension',
      'irregular heartbeat',
      'palpitations',
      'heart palpitations',
      'nausea',
      'vomiting',
      'sweating',
      'weakness',
      'numbness',
      'tingling',
      'joint pain',
      'muscle pain',
      'fever',
      'cough',
      'sore throat',
      'congestion',
      'difficulty breathing',
      'fainting',
      'syncope',
      'blurred vision',
      'vision problems',
    ];

    const lowerMessage = userMessage.toLowerCase();
    const foundSymptoms: string[] = [];

    for (const keyword of symptomKeywords) {
      if (lowerMessage.includes(keyword)) {
        foundSymptoms.push(keyword);
      }
    }

    return foundSymptoms;
  }, []);

  /**
   * Update accumulated symptoms and track initial symptoms
   */
  const updateSymptoms = useCallback((newSymptoms: string[], isInitial = false) => {
    setContext((prev) => {
      const cleanedNewSymptoms = newSymptoms.filter(
        (s) => !prev.accumulatedSymptoms.includes(s)
      );

      return {
        ...prev,
        initialSymptoms: isInitial ? newSymptoms : prev.initialSymptoms,
        accumulatedSymptoms: [...prev.accumulatedSymptoms, ...cleanedNewSymptoms],
      };
    });
  }, []);

  /**
   * Get formatted conversation history for API context
   */
  const getConversationHistory = useCallback((): ConversationMessage[] => {
    return context.messageHistory;
  }, [context.messageHistory]);

  /**
   * Get conversation summary for system prompt
   */
  const getContextSummary = useCallback((): string => {
    const { initialSymptoms, accumulatedSymptoms, messageHistory } = context;

    if (accumulatedSymptoms.length === 0) {
      return '';
    }

    const summary = [
      'Previous conversation context:',
      `Initial symptoms reported: ${initialSymptoms.join(', ')}`,
      `All symptoms reported so far: ${accumulatedSymptoms.join(', ')}`,
      `Number of messages in this session: ${messageHistory.length}`,
    ];

    if (messageHistory.length > 1) {
      summary.push(
        'Note: Patient may be asking follow-up questions or providing additional symptoms.'
      );
    }

    return summary.join('\n');
  }, [context]);

  /**
   * Detect if this is a follow-up question
   */
  const isFollowUpQuestion = useCallback((): boolean => {
    return context.messageHistory.length > 0;
  }, [context.messageHistory]);

  /**
   * Clear session (for new patient)
   */
  const clearSession = useCallback(() => {
    setContext({
      sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      initialSymptoms: [],
      accumulatedSymptoms: [],
      messageHistory: [],
      previousRecommendations: [],
    });
  }, []);

  /**
   * Get session info
   */
  const getSessionInfo = useCallback(() => {
    return {
      sessionId: context.sessionId,
      messageCount: context.messageHistory.length,
      symptomsCount: context.accumulatedSymptoms.length,
      symptoms: context.accumulatedSymptoms,
    };
  }, [context]);

  /**
   * Store recommendations for reference
   */
  const storeRecommendations = useCallback((recommendations: string[]) => {
    setContext((prev) => ({
      ...prev,
      previousRecommendations: recommendations,
    }));
  }, []);

  return {
    context,
    addMessage,
    extractSymptoms,
    updateSymptoms,
    getConversationHistory,
    getContextSummary,
    isFollowUpQuestion,
    clearSession,
    getSessionInfo,
    storeRecommendations,
  };
};

export default useConversationMemory;
