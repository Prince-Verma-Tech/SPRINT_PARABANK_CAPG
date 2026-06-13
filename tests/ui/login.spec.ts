import {test,expect} from '@playwright/test';
import {Login} from '../../pages/login.page';
import fs from "fs";
const userData = JSON.parse(fs.readFileSync('test-data/login.json','utf-8'));

// Clear storageState so the login form is visible (not already logged in)
test.use({storageState: {cookies:[], origins:[]}});

test('has title', async({page}) => {
  await page.goto('/parabank/index.htm');
  await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
  const loginPage = new Login(page)
  await loginPage.loginUser(userData);
});

