import { test, expect } from '@playwright/test';

test('Chatbot API returns valid response', async ({ request }) => {
  const response = await request.post('/api/chat', {
    data: {
      message: 'How to renew Emirates ID?',
      language: 'en'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty('reply');
  expect(body.reply.length).toBeGreaterThan(20);
});
