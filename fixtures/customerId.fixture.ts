import {test as base,expect} from '@playwright/test';
import * as fs from 'fs';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
const loginData = JSON.parse(fs.readFileSync('test-data/login.json','utf-8'));

export const test = base.extend<{ customerId: number }>({
  customerId: async ({ request }, use) => {
    const { userName, password } = loginData;
    const res = await request.get(`${BASE_URL}/login/${userName}/${password}`, {headers:{Accept:'application/json'},});
    expect(res.status()).toBe(200);
    const customer = await res.json();
    await use(customer.id);
  },
});

export{expect,BASE_URL};