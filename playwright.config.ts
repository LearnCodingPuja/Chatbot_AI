import { defineConfig, devices } from '@playwright/test';
import allurePlaywright from 'allure-playwright';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  timeout: 60 * 1000,

  expect: {
    timeout: 15 * 1000,
  },

  retries: 1,

  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'https://uask.gov.ae',
    headless: true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    actionTimeout: 15 * 1000,
  },

  projects: [
    {
      name: 'Desktop-EN',
      use: { ...devices['Desktop Chrome'], locale: 'en-US' },
    },
    {
      name: 'Desktop-AR',
      use: { ...devices['Desktop Chrome'], locale: 'ar-AE' },
    }
  ],
});
