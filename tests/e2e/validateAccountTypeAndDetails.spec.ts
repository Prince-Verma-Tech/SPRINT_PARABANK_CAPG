import {test,expect,BASE_URL} from '../../fixtures/customerId.fixture';
import {CreateAccount} from '../../pages/createAccount.page';

test('Validate Account Type and Details via API', async ({page,request,customerId}) => {
  //Create account via UI and capture account ID
  await page.goto('/parabank/openaccount.htm');
  const accountPage = new CreateAccount(page);
  const newAccountId = await accountPage.createAccountUser();
  
  //Call GET /accounts/{accountId}
  const accountResponse = await request.get(`${BASE_URL}/accounts/${newAccountId}`, {headers:{Accept:'application/json'},});

  //Validate account type is CHECKING and belongs to the logged-in customer
  expect(accountResponse.status()).toBe(200);
  const account = await accountResponse.json();
  expect(account.type).toBe('CHECKING');
  expect(account.customerId).toBe(customerId);
});
