import { test, expect } from '@playwright/test';
import { appConfig } from '../config';

test('AI provides helpful response', async ({ page }) => {
  await page.goto('/');

  await page.fill('#chat-input', 'How to renew Emirates ID?');
  await page.press('#chat-input', 'Enter');

  const response = page.locator('.bot-message').last();
  await expect(response).toBeVisible({
    timeout: appConfig.aiResponseTimeout,
  });

  const text = (await response.textContent()) || '';

  expect(text.length).toBeGreaterThan(appConfig.minResponseLength);
});

test('Response is not hallucinated', async ({ page }) => {
  await page.goto('/');

  await page.fill('#chat-input', 'Tell me about Mars visa service');
  await page.press('#chat-input', 'Enter');

  const response = page.locator('.bot-message').last();
  const text = (await response.textContent())?.toLowerCase() || '';

  for (const phrase of appConfig.disallowedPhrases) {
    expect(text).not.toContain(phrase);
  }
});
