import { test, expect } from '@playwright/test';
import { appConfig } from '../config';

test('Arabic responses are RTL', async ({ page }) => {
  await page.goto('/');
  await page.click('#language-ar');

  await page.fill('#chat-input', 'مرحبا');
  await page.press('#chat-input', 'Enter');

  const response = page.locator('.bot-message').last();
  await expect(response).toHaveAttribute(
    'dir',
    appConfig.languages.AR.direction
  );
});
