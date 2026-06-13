import {test,expect} from '@playwright/test';
import {Register} from '../../pages/register.page';
import fs from "fs";
const userData = JSON.parse(fs.readFileSync('test-data/register.json', 'utf-8'));

// Clear storageState so the Register link is visible (not already logged in)
test.use({storageState:{cookies:[],origins:[]}});

test('has title', async ({page}) => {
  await page.goto('/parabank/index.htm');
  await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');

  // Use a unique username to avoid "This username already exists" error
  const uniqueData = {...userData.validData, userName: `Prince_${Date.now()}`};
  const registerPage = new Register(page)
  await registerPage.registerUser(uniqueData);
});