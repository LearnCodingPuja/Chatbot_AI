import { Page, expect } from '@playwright/test';

export async function sendMessage(page: Page, message: string) {
  await page.fill('#chat-input', message);
  await page.press('#chat-input', 'Enter');
}

export async function waitForBotResponse(page: Page) {
  const response = page.locator('.bot-message').last();
  await expect(response).toBeVisible({ timeout: 15000 });
  return response;
}
