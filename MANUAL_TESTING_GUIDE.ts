/**
 * MANUAL TESTING GUIDE - YoloHealth Chatbot
 * 
 * This document provides comprehensive manual testing procedures
 * to verify error handling, API responses, and UI rendering
 */

// ============================================================================
// TEST CASE 1: SYMPTOM INPUT VALIDATION
// ============================================================================

export const TEST_CASE_1 = `
TEST: Empty Input Prevention

STEPS:
1. Open the chatbot interface
2. Leave the symptom input field empty
3. Click the "Send" button

EXPECTED RESULT:
- Button should be disabled (grayed out)
- No message is sent
- Error message appears: "Please describe your symptoms before sending."
- User can see the error clearly at the bottom of the input area
- Console logs: [EMPTY_INPUT] Attempted to send empty symptoms

TECHNICAL CHECKS:
- inputValue.trim() returns empty string
- Submit handler prevents fetch call
- Error state is set with user-friendly message
`;

// ============================================================================
// TEST CASE 2: SUCCESSFUL SYMPTOM MATCHING
// ============================================================================

export const TEST_CASE_2 = `
TEST: Valid Symptom Input and Matching

STEPS:
1. Enter "Chest Pain" as symptom
2. Click "Send"
3. Wait for AI analysis
4. Review recommendations

EXPECTED RESULTS:
Phase 1 - Input Processing:
- Message appears on right side (user message bubble)
- Input field clears
- Loading indicator shows "Analyzing your symptoms..."
- Three bouncing dots animate

Phase 2 - API Response:
- Recommendations appear within 2-5 seconds
- Message shows: "Found 3 relevant tests"
- Tests should include: 12-Lead ECG, Troponin Test, Blood Pressure Check
- Urgency level appears as RED (High Priority)

Phase 3 - Recommendation Display:
- Each test shows: name, explanation, time to results
- Category badges display correctly
- "View Test Selection" button is visible

TECHNICAL CHECKS:
- Console shows: [API_CALL] Requesting recommendations
- Response includes: recommendations[], matchedTestsCount, urgencyLevel
- All recommendations have: testName, explanation, parameters, timeToResults, category
- Console shows: [API_SUCCESS] Recommendations received
`;

// ============================================================================
// TEST CASE 3: NO MATCHING TESTS
// ============================================================================

export const TEST_CASE_3 = `
TEST: Symptom with No Matching Tests

STEPS:
1. Enter: "Purple spots on moon" (non-medical symptom)
2. Click "Send"
3. Wait for response
4. Observe error handling

EXPECTED RESULTS:
- Loading animation shows
- After 2-5 seconds, bot message appears:
  "No tests matched your symptoms. Please describe your symptoms differently or try again."
- No recommendations display
- Input field is ready for new input
- No exception errors in console

TECHNICAL CHECKS:
- matchedTestsCount equals 0
- recommendations array is empty []
- Error code: [NO_MATCHING_TESTS] appears in console
- No crash or hung state
- Can continue entering new symptoms
`;

// ============================================================================
// TEST CASE 4: API CONNECTION ERROR
// ============================================================================

export const TEST_CASE_4 = `
TEST: API Connection Failure Handling

SETUP:
- Disable internet connection OR
- Use browser dev tools to throttle network to "Offline"

STEPS:
1. Enter "Chest Pain"
2. Click "Send"
3. Observe error handling

EXPECTED RESULTS:
- Loading indicator shows "Analyzing your symptoms..."
- After timeout (usually 3-5 seconds):
  - Loading stops
  - Red error box appears at bottom
  - Message: "Connection error. Please check your internet and try again."
  - User message remains in chat
  - Bot message says: "Unable to connect. Please try again."

TECHNICAL CHECKS:
- console.error shows: [API_CONNECTION_FAILED]
- Status code visible (e.g., status: 0 or timeout)
- No data is displayed
- UI remains responsive
- User can retry after reconnecting

RECOVERY TEST:
1. Re-enable internet
2. Click "Send" again
3. Should work normally
`;

// ============================================================================
// TEST CASE 5: INVALID API RESPONSE
// ============================================================================

export const TEST_CASE_5 = `
TEST: Malformed API Response Handling

NOTE: This requires API to return invalid JSON or missing fields
(Usually caused by server errors)

STEPS:
1. Trigger API call (e.g., "Fatigue")
2. Simulate invalid response by monitoring network tab

EXPECTED RESULTS:
- Loading appears normally
- After response received:
  - Red error displays: "Service error. Please try a different symptom description."
  - User message sent successfully
  - Bot says: "Unable to process your request. Please try different wording."

TECHNICAL CHECKS:
- Error code: [GEMINI_API_ERROR] in console
- "Invalid API response format" logged with response data
- Try-catch block catches JSON parsing errors
- User can try again with different symptoms
`;

// ============================================================================
// TEST CASE 6: MEDICAL BLUE COLOR SCHEME
// ============================================================================

export const TEST_CASE_6 = `
TEST: Professional Medical Color Scheme (No Emojis)

STEPS:
1. Open the chatbot
2. Review all visual elements

EXPECTED COLOR SCHEME:
Header: Medical Blue (#3A5A8C)
- Text: White
- Border: Dark Medical Blue
- No emojis, just clean title

User Messages: Medical Blue bubbles
- Right-aligned
- White text
- Clean appearance

Bot Messages: White background
- Gray text
- Light blue border
- Clear hierarchy

Quick Symptom Buttons:
- White background
- Medical blue border
- Medical blue text
- 44px minimum height for touch

Priority Indicators:
- High: Red tone (#DC2626)
- Medium: Amber tone (#F59E0B)
- Low: Slate tone (#64748B)
- No emojis, clean typography

TECHNICAL CHECKS:
- Theme colors come from THEME_COLORS constant
- primaryBlue: #3A5A8C
- secondaryGreen: #5A8C74
- textMain: #1E293B
- textMuted: #64748B
- No emoji usage anywhere in patient-facing text
- All fonts are system fonts, professional appearance
- Touch targets minimum 64px (h-16)
`;

// ============================================================================
// TEST CASE 7: MULTI-SYMPTOM ACCUMULATION
// ============================================================================

export const TEST_CASE_7 = `
TEST: Symptom Context Tracking Across Multiple Messages

STEPS:
1. Enter: "I have chest pain"
2. Click Send, wait for response
3. Enter: "Also experiencing fatigue"
4. Click Send, wait for response
5. Enter: "And shortness of breath"
6. Click Send, wait for response

EXPECTED RESULTS:

First Response:
- Tests for cardiovascular symptoms
- Shows: ECG, Blood Pressure, etc.

Session Info Bar appears:
- Shows all accumulated symptoms
- Each symptom in blue tag: "Chest Pain"

Second Response:
- Bot message mentions: "Found tests based on: chest pain, fatigue"
- More tests added: Complete Blood Count
- Shows: [API_CALL] Context includes accumulated symptoms

Third Response:
- Bot message mentions: "Found tests based on: chest pain, fatigue, shortness of breath"
- All three symptoms visible in session bar
- High urgency due to combination

TECHNICAL CHECKS:
- accumulatedSymptoms array grows with each message
- conversationHistory tracks all exchanges
- isFollowUpQuestion() returns true after first input
- Session ID persists throughout conversation
- Console logs show context being used
`;

// ============================================================================
// TEST CASE 8: URGENT vs ROUTINE SYMPTOMS
// ============================================================================

export const TEST_CASE_8 = `
TEST: Different Urgency Levels

URGENT TEST (High Priority):
STEPS:
1. Enter: "Severe chest pain and difficulty breathing"
2. Observe urgency display

EXPECTED:
- Red priority box: "High - Urgent Attention"
- Message: "These symptoms warrant immediate medical attention..."
- Tests shown include emergency protocols
- High visibility warning

ROUTINE TEST (Low Priority):
STEPS:
1. Start new assessment
2. Enter: "Occasional tiredness"
3. Observe urgency display

EXPECTED:
- Slate/gray priority box: "Low - Routine"
- Message: "Your symptoms suggest routine testing..."
- Normal priority display
- Suggested tests for general checkup

MEDIUM PRIORITY TEST:
STEPS:
1. Start new assessment
2. Enter: "Persistent cough with mild fever"

EXPECTED:
- Amber/yellow priority box: "Medium - Monitor"
- Message: "We recommend monitoring these symptoms..."
- Balanced approach in recommendations

TECHNICAL CHECKS:
- urgencyLevel properly classified by API
- Correct color mapping applied
- Appropriate messaging for each level
`;

// ============================================================================
// TEST CASE 9: QUICK SYMPTOM BUTTONS
// ============================================================================

export const TEST_CASE_9 = `
TEST: Quick Symptom Button Functionality

STEPS:
1. Open chatbot (should see 5 quick symptom buttons)
2. Verify button labels:
   - Chest Pain
   - Fatigue
   - Dizziness
   - High Blood Pressure
   - Irregular Heartbeat
3. Click "Chest Pain" button
4. Observe behavior

EXPECTED RESULTS:
- Button click works like typing the symptom
- Message appears: "Chest Pain" (as user message)
- API call initiates
- Recommendations appear for that symptom
- Buttons disappear once first message sent
- Can click different symptom for new assessment

TECHNICAL CHECKS:
- Buttons trigger sendSymptoms() function
- handleQuickSymptom() called on click
- Button styling matches 44px minimum height
- All buttons use consistent styling
- Disabled state works during loading
`;

// ============================================================================
// TEST CASE 10: TEST SELECTION AND CONFIRMATION
// ============================================================================

export const TEST_CASE_10 = `
TEST: Test Selection Flow

STEPS:
1. Complete symptom entry with results
2. Click "View Test Selection"
3. See TestSelectionModal open
4. Select 2-3 tests
5. Click "Confirm Selection" or similar

EXPECTED RESULTS:
- Modal shows all recommended tests
- Tests have checkboxes
- Can select/deselect individually
- Confirmation button visible
- Back button available to return

AFTER SELECTION:
- Screen changes to green "Assessment Complete"
- Shows: "Ready for Tests" header
- Selected tests listed with checkmarks
- Two buttons:
  - "Start New Assessment" (goes back)
  - "Proceed to Test Collection" (advances)

TECHNICAL CHECKS:
- selectedTests array populated correctly
- chatbotState changes to 'ready-for-tests'
- Message: "Selected X test(s). Ready to proceed..."
`;

// ============================================================================
// TEST CASE 11: NEW ASSESSMENT RESTART
// ============================================================================

export const TEST_CASE_11 = `
TEST: Starting New Assessment

STEPS:
1. Complete full assessment flow
2. Click "Start New Assessment" button
3. Verify reset

EXPECTED RESULTS:
- Chat history clears
- Input field empties
- Recommendations reset to null
- Error messages cleared
- Quick symptom buttons reappear
- Welcome message shows again
- Session memory clears (new session ID)

TECHNICAL CHECKS:
- conversationMemory.clearSession() called
- All state variables reset
- messages array becomes []
- selectedTests array becomes []
- Can start new assessment immediately
`;

// ============================================================================
// TEST CASE 12: LOADING STATES AND ANIMATIONS
// ============================================================================

export const TEST_CASE_12 = `
TEST: Visual Loading Indicators

STEPS:
1. Enter a symptom
2. Click Send
3. Watch for loading animation

EXPECTED VISUAL FEEDBACK:

Immediate (< 100ms):
- Input button text changes from "Send" to "Analyzing..."
- Input field becomes disabled/grayed
- Button shows disabled state

During Load (0.5-5 seconds):
- Three bouncing dots appear in chat
- Message: "Analyzing your symptoms..."
- Dots animate smoothly (staggered bounce)
- User cannot interact with input during this time

After Response (>5 seconds):
- Loading indicator disappears
- Recommendations appear
- Input becomes enabled again
- Button shows "Send" again

TECHNICAL CHECKS:
- isLoading state controls all UI changes
- animate-bounce CSS class applied to dots
- animationDelay staggered (0ms, 150ms, 300ms)
- Button disabled prop set correctly
- Input field has disabled attribute
`;

// ============================================================================
// TEST CASE 13: ERROR MESSAGE CLARITY
// ============================================================================

export const TEST_CASE_13 = `
TEST: Error Messages Are User-Friendly

STEPS:
1. Trigger various errors
2. Read error messages

ERROR MESSAGE 1 - Empty Input:
"Please describe your symptoms before sending."
- Clear action item

ERROR MESSAGE 2 - Connection Error:
"Connection error. Please check your internet and try again."
- Identifies problem
- Suggests solution

ERROR MESSAGE 3 - No Matching Tests:
"No tests matched your symptoms. Please describe your symptoms differently or try again."
- Explains issue
- Suggests next step

ERROR MESSAGE 4 - Service Error:
"Service error. Please try a different symptom description."
- Doesn't blame user
- Suggests workaround

TECHNICAL CHECKS:
- All errors use plain language
- Actionable next steps included
- Proper spacing and formatting
- Red highlighting (color: #DC2626)
- Error display at bottom of form
- Can dismiss by entering new text
`;

// ============================================================================
// TEST CASE 14: CONSOLE LOGGING FOR DEBUGGING
// ============================================================================

export const TEST_CASE_14 = `
TEST: Verify Console Logging

STEPS:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Proceed through various chatbot actions
4. Observe console logs

EXPECTED LOGS:

Empty Input Attempt:
[EMPTY_INPUT] Attempted to send empty symptoms

API Call:
[API_CALL] Requesting recommendations with context
{ symptomsCount: 2, isFollowUp: true, sessionId: 'xxx' }

Successful Response:
[API_SUCCESS] Recommendations received
{ testsCount: 3, urgencyLevel: 'high' }

No Matching Tests:
[NO_MATCHING_TESTS] No tests matched symptoms
{ symptoms: ['xyz'], database: 20+ tests }

API Connection Error:
[API_CONNECTION_FAILED] API request failed
{ status: 0, statusText: 'Network Error', url: '/api/yolo-recommend-context' }

Invalid Response:
[GEMINI_API_ERROR] Invalid API response format
{ data: { /* response object */ } }

Error Handler:
[ERROR_HANDLER] Caught exception during symptom analysis
{ errorMessage: '...', errorType: 'Error', stack: '...' }

User Action:
[ACTION] User proceeding to test collection

TECHNICAL CHECKS:
- All major functions log their actions
- Logs include relevant context
- Error logs include full stack traces
- Session tracking throughout
- No sensitive data in logs
`;

// ============================================================================
// SUMMARY - MANUAL TEST EXECUTION ORDER
// ============================================================================

export const EXECUTION_ORDER = `
RECOMMENDED TEST EXECUTION ORDER:

1. TEST_CASE_6 (Colors) - Verify professional appearance
2. TEST_CASE_1 (Validation) - Empty input handling
3. TEST_CASE_2 (Success) - Basic flow works
4. TEST_CASE_3 (No Match) - Error case 1
5. TEST_CASE_4 (Connection) - Error case 2
6. TEST_CASE_5 (Invalid Response) - Error case 3
7. TEST_CASE_7 (Multi-symptom) - Context tracking
8. TEST_CASE_8 (Urgency) - Priority levels
9. TEST_CASE_9 (Quick Buttons) - UI shortcuts
10. TEST_CASE_10 (Selection) - Full flow
11. TEST_CASE_11 (Restart) - Reset functionality
12. TEST_CASE_12 (Loading) - Visual feedback
13. TEST_CASE_13 (Errors) - Message clarity
14. TEST_CASE_14 (Logging) - Debugging support

EXPECTED TIME: 45-60 minutes total
`;

// ============================================================================
// TESTING WITH DIFFERENT SYMPTOM INPUTS
// ============================================================================

export const SYMPTOM_TEST_MATRIX = `
COMPREHENSIVE SYMPTOM TEST MATRIX:

CARDIOVASCULAR SYMPTOMS:
- "Chest pain" → Should recommend: ECG, Troponin, Blood Pressure
- "Irregular heartbeat" → Should recommend: Holter Monitor, ECG
- "Shortness of breath" → Should recommend: ECG, Chest X-Ray
- "High blood pressure" → Should recommend: BP Check, Metabolic Panel

METABOLIC/ENDOCRINE:
- "Fatigue and weight loss" → Should recommend: Blood Work, Glucose, Thyroid
- "Frequent urination" → Should recommend: Glucose Test, Urinalysis
- "Excessive thirst" → Should recommend: Glucose, A1C, Electrolytes

GENERAL ILLNESS:
- "Persistent cough" → Should recommend: Chest X-Ray, Full Blood Count
- "Fever and chills" → Should recommend: Blood Culture, CBC, Liver Function
- "Joint pain" → Should recommend: Rheumatoid Factor, CRP, X-Ray

VALID BUT UNUSUAL:
- "Purple elephant syndrome" → Should return: No tests matched
- "Moon spots appear" → Should return: No tests matched

COMBINATION SCENARIOS:
- "Chest pain, fatigue, dizziness" → Should return: High urgency, multiple tests
- "Headache and nausea" → Should return: Medium urgency tests
- "Mild tiredness" → Should return: Low urgency routine tests

PRIORITY VERIFICATION:
High Priority: Chest pain, Difficulty breathing, Severe symptoms
Medium Priority: Persistent issues, Multiple symptoms
Low Priority: Mild symptoms, General checkup

EXPECTED VARIATIONS:
- Different symptom wordings should return similar tests
- Capitalization shouldn't matter
- Plural forms should work
- Related symptoms should trigger overlapping tests
`;

export default {
  TEST_CASE_1,
  TEST_CASE_2,
  TEST_CASE_3,
  TEST_CASE_4,
  TEST_CASE_5,
  TEST_CASE_6,
  TEST_CASE_7,
  TEST_CASE_8,
  TEST_CASE_9,
  TEST_CASE_10,
  TEST_CASE_11,
  TEST_CASE_12,
  TEST_CASE_13,
  TEST_CASE_14,
  EXECUTION_ORDER,
  SYMPTOM_TEST_MATRIX,
};
