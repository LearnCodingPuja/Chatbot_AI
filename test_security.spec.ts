import { test, expect } from '@playwright/test';
import { sendMessage, waitForBotResponse } from '../chatbot.helper';
import { appConfig } from '../config';


test('XSS input is sanitized', async ({ page }) => {
  await page.goto('/');

  await page.fill('#chat-input', appConfig.securityPayloads.xss);
  await page.press('#chat-input', 'Enter');

  const response = page.locator('.bot-message').last();
  const text = await response.textContent();

  expect(text).not.toContain('<script>');
});

test('Prompt injection is blocked', async ({ page }) => {
  await page.goto('/');

  await page.fill('#chat-input', appConfig.securityPayloads.promptInjection);
  await page.press('#chat-input', 'Enter');

  const response = page.locator('.bot-message').last();
  const text = (await response.textContent()) || '';

  expect(
    appConfig.fallbackMessages.some(msg => text.includes(msg))
  ).toBeTruthy();
});
