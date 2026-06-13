import {test,expect,BASE_URL} from '../../fixtures/customerId.fixture';

test('TC-API-03: Get accounts list via API', async ({ request, customerId }) => {
  const response = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {headers: {Accept:'application/json'},});

  expect(response.status()).toBe(200);
  const accounts = await response.json();
  expect(Array.isArray(accounts)).toBeTruthy();
  expect(accounts.length).toBeGreaterThan(0);

  for (const account of accounts) {
    expect(account).toHaveProperty('id');
    expect(account).toHaveProperty('type');
    expect(account).toHaveProperty('balance');
  }
});