import {test,expect} from '@playwright/test';
import {Login} from '../../pages/login.page';
import {Register} from '../../pages/register.page';
import fs from 'fs';

const loginData = JSON.parse(fs.readFileSync('test-data/login.json','utf-8'));
const registerData = JSON.parse(fs.readFileSync('test-data/register.json','utf-8'));

// Clear storageState for negative tests 
test.use({storageState: {cookies:[], origins:[]}});

test('NEG-LOGIN-01: Login with wrong password shows error', async ({page}) => {
  console.log('Running NEG-LOGIN-01: Login with wrong password');

  await page.goto('/parabank/index.htm');
  const loginPage = new Login(page);
  await loginPage.loginUser({userName:loginData.userName, password:'wrongPassword123'});
  const errorMsg = page.locator('.error');
  await expect(errorMsg).toBeVisible({timeout: 5000});
  const errorText = await errorMsg.textContent();
  console.log(`NEG-LOGIN-01 Result - Error message:"${errorText}"`);
});

test('NEG-LOGIN-02: Login with blank username shows error', async({page}) => {
  console.log('Running NEG-LOGIN-02: Login with blank username');
  await page.goto('/parabank/index.htm');
  const loginPage = new Login(page);
  await loginPage.loginUser({userName:'',password:loginData.password});
  const errorMsg = page.locator('.error');
  await expect(errorMsg).toBeVisible({timeout:5000});
  const errorText = await errorMsg.textContent();
  console.log(`NEG-LOGIN-02 Result - Error message:"${errorText}"`);
});



test('NEG-REG-01: Register with mismatched passwords shows error', async ({page}) => {
  console.log('Running NEG-REG-01: Register with mismatched passwords');
  await page.goto('/parabank/index.htm');
  const registerPage = new Register(page);
  await registerPage.registerBtn.click();
  await expect(page.locator('h1.title')).toHaveText('Signing up is easy!');
  const data = registerData.validData;
  await registerPage.firstName.fill(data.firstName);
  await registerPage.lastName.fill(data.lastName);
  await registerPage.address.fill(data.address);
  await registerPage.city.fill(data.city);
  await registerPage.state.fill(data.state);
  await registerPage.zipCode.fill(data.zipCode);
  await registerPage.phoneNo.fill(data.phoneNo);
  await registerPage.ssn.fill(data.ssn);
  await registerPage.userName.fill(`TestUser_${Date.now()}`);
  await registerPage.password.fill('Password123');
  await registerPage.confirm.fill('Password456'); // wrong confirm password for negative test
  await registerPage.submit.click();
  const errorMsg = page.locator('.error');
  await expect(errorMsg).toBeVisible({timeout: 5000});
  const errorText = await errorMsg.textContent();
  console.log(`NEG-REG-01 Result - Error message:"${errorText}"`);
});

test('NEG-REG-02: Register with empty first name shows error', async ({page}) => {
  console.log('Running NEG-REG-02: Register with empty first name');
  await page.goto('/parabank/index.htm');
  const registerPage = new Register(page);
  await registerPage.registerBtn.click();
  await expect(page.locator('h1.title')).toHaveText('Signing up is easy!');
  const data = registerData.validData;
  // firstname left blank for negative test
  await registerPage.lastName.fill(data.lastName);
  await registerPage.address.fill(data.address);
  await registerPage.city.fill(data.city);
  await registerPage.state.fill(data.state);
  await registerPage.zipCode.fill(data.zipCode);
  await registerPage.phoneNo.fill(data.phoneNo);
  await registerPage.ssn.fill(data.ssn);
  await registerPage.userName.fill(`TestUser_${Date.now()}`);
  await registerPage.password.fill(data.password);
  await registerPage.confirm.fill(data.password);
  await registerPage.submit.click();
  const errorMsg = page.locator('.error');
  await expect(errorMsg).toBeVisible({timeout: 5000});
  const errorText = await errorMsg.textContent();
  console.log(`NEG-REG-02 Result - Error message:"${errorText}"`);
});


