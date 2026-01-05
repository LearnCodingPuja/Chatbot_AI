#Overview:

This project is an end-to-end AI/ML QA automation framework designed to validate the U-Ask – UAE Government chatbot, a generative AI-powered assistant supporting public service queries in English (LTR) and Arabic (RTL).

#This project implements end-to-end automated testing for U-Ask using Playwright, focusing on:

Chatbot UI behavior
AI/LLM response validation
Multilingual support (English LTR & Arabic RTL)
Security & prompt-injection handling
Reliability of AI responses under real-world conditions

#Objectives:

The automation framework validates:
Chat widget functionality on desktop & mobile
AI response clarity, relevance, and consistency
Prevention of hallucinated or unsafe responses
Proper handling of malicious inputs
Clean UI rendering and accessibility behavior

#Chatbot UI Behaviour

Chat widget loads correctly on desktop browsers
User can enter and send messages
AI responses render in the conversation panel
Input field clears after sending a message
Scroll and visibility behavior work correctly
English content follows LTR
Arabic content follows RTL

#AI / GPT-Powered Response Validation

AI provides clear and relevant responses to public service queries
Responses are validated using keywords and intent matching
No hallucinated or fabricated answers
Responses remain consistent across languages for the same intent
Proper handling of:
Loading states
Fallback messages (e.g., “Sorry, please try again”)
Broken or malformed responses


#Security & Prompt Injection Handling
User input is sanitized (e.g., <script> tags are neutralized)
AI does not comply with malicious or instruction-override prompts
No execution of injected scripts
Safe rendering of special characters

#Install Pre-requisites
brew install node
node -v
npm -v

#Configure langugae:
LANG=ar npx playwright tests

#Reports
npx playwright show-report

#Project Struture:

uask-ai-qa/
│
├── tests/
│   ├── test_ui_chatbot.spec.ts       # UI behavior tests
│   ├── test_ai_responses.spec.ts     # AI response validation
│   ├── test_security.spec.ts         # Injection & security tests
│
├── test-data.json               # Test prompts & expected behavior [EN /AR]
├── config.ts                    # AI rules,timeouts,languages,security payloads
├── playwright.config.ts         # Environment / URL configuration
├── README.md                    # Project documentation
└── package.json                 # Reusable helpers configuration


#Reusable helpers:
Language switch
Send message
Wait for response
Validate intent

 
Note:** separated Playwright framework configuration from AI and application because it allows me to manage AI timeouts, hallucination checks, multilingual behavior, and security payloads centrally, which is essential for testing non-deterministic LLM systems **.

#This project uses GitHub Actions to automatically run Playwright UI, API, and AI validation tests on every push and pull request.



#How to Run Tests: U-Ask Chatbot
1. Prerequisites
• Node.js
• npm
• Supported OS: macOS / Linux / Windows

Check versions:
node -v
npm -v

2. One-Time Setup
Navigate to project root:
cd uask-ai-qa

Install dependencies:
npm ci

Install Playwright browsers:
npx playwright install
3. Environment Configuration
Create a .env file in the project root:

BASE_URL=https://uask.gov.ae
AI_TIMEOUT=15000

Ensure dotenv is loaded via playwright.config.ts.
4. Running Tests
Run all tests:
npm test

Run specific suites:
npm run test:ui
npm run test:ai
npm run test:api
npm run test:security

#How to configure test language

The U-Ask chatbot supports multilingual interactions, primarily:

English – Left-to-Right (LTR)
Arabic – Right-to-Left (RTL)

This Playwright automation framework is designed to validate UI behavior, AI responses, and layout direction for both languages without duplicating test code.

Language selection is handled in playwright.config.ts

projects: [
  {
    name: 'Desktop-EN',
    use: {
      locale: 'en-US',
    },
  },
  {
    name: 'Desktop-AR',
    use: {
      locale: 'ar-AE',
    },
  }
]

O/P:What it does:
Executes the same test suite multiple times
Once in English
Once in Arabic
Ensures consistent validation of:
UI rendering
AI responses
Language direction (LTR / RTL)

if Run only English tests:
npx playwright test --project=Desktop-EN

if Run only Arabic tests:
npx playwright test --project=Desktop-AR


o	Optional: Screenshots or logs for failed cases

configured to capture screenshots automatically when a test fails.
Configuration (playwright.config.ts)
use: {
  screenshot: 'only-on-failure',
}
O/p: Captured:
Current browser state at failure
UI layout issues
Missing elements or broken rendering


For UI-related or flaky failures, video recordings are enabled.
Configuration
use: {
  video: 'retain-on-failure',
}

Console Logs for AI & UI Debugging 
Tests can optionally log:
AI responses
API payloads
Error messages

page.on('console', msg => {
  console.log(msg.text());
});


#Test Report: Summary of All Test Scenarios

1. Test Report Overview
This section summarizes the results of end-to-end automated testing performed on the U-Ask AI-powered chatbot using Playwright. The testing validates UI behavior, AI response quality, multilingual support, security, and API-level functionality.
2. Test Execution Summary
Chatbot UI Behavior: Total 12 | Passed 11 | Failed 1 | Blocked 0
AI Response Validation: Total 10 | Passed 9 | Failed 1 | Blocked 0
Multilingual (EN / AR): Total 6 | Passed 6 | Failed 0 | Blocked 0
Security & Injection: Total 6 | Passed 6 | Failed 0 | Blocked 0
API-Level Validation: Total 5 | Passed 5 | Failed 0 | Blocked 0
Overall: Total 39 | Passed 37 | Failed 2 | Blocked 0
3. Chatbot UI Behavior Results
All core UI flows worked correctly across desktop and mobile devices. One minor mobile auto-scroll issue was observed during long AI responses.
4. AI Response Validation Results
AI responses were relevant and accurate for common government queries. One edge case showed slightly vague phrasing for an uncommon query.
5. Multilingual Testing Results
English (LTR) and Arabic (RTL) layouts rendered correctly. AI response intent remained consistent across languages.
6. Security & Injection Handling
XSS and prompt injection attempts were successfully blocked. The AI followed policy-based refusals.
7. API-Level Validation
All chatbot APIs returned valid responses with correct schemas and aligned with UI output.
8. Test Artifacts
Screenshots, videos, execution traces, Playwright HTML reports, and Allure reports were generated and reviewed.

Thanks
Puja Singh
