import {test,expect,BASE_URL} from '../../fixtures/customerId.fixture';
import {AccountOverview} from '../../pages/accountOverview.page';
import {CreateAccount} from '../../pages/createAccount.page';
import {TransferFunds} from '../../pages/transferFunds.page';

const TRANSFER_AMOUNT = '200';

test('TC-E2E-01: Validate balance update after fund transfer via UI and API', async ({page,request,customerId}) => {

  //Go to Account Overview and read UI balance
  await page.goto('/parabank/overview.htm');
  const overviewPage = new AccountOverview(page);
  const sourceAccountId = await overviewPage.getFirstAccountId();
  const uiBalanceBefore = await overviewPage.getFirstAccountBalance();
  console.log(`Source Account ID: ${sourceAccountId}`);
  console.log(`UI Balance (before): ${uiBalanceBefore}`);

  //Create a new account
  await page.goto('/parabank/openaccount.htm');
  const accountPage = new CreateAccount(page);
  const newAccountId = await accountPage.createAccountUser();
  console.log(`New Account ID:${newAccountId}`);
  expect(newAccountId).toMatch(/^\d+$/);

  //Transfer funds to the new account
  await page.goto('/parabank/transfer.htm');
  const transferPage = new TransferFunds(page);
  await transferPage.transferFunds(TRANSFER_AMOUNT,newAccountId);
  await expect(page.locator('#showResult h1')).toHaveText('Transfer Complete!', {timeout: 10000});
  console.log(`Transferred $${TRANSFER_AMOUNT} to account ${newAccountId}`);

  // Fetch source account balance after transfer via API
  const sourceRes = await request.get(`${BASE_URL}/accounts/${sourceAccountId}`,{headers:{Accept:'application/json'},});
  expect(sourceRes.status()).toBe(200);
  const sourceAccount = await sourceRes.json();
  console.log(`\nSender Account (${sourceAccountId})`);
  console.log(`Balance BEFORE transfer: ${uiBalanceBefore}`);
  console.log(`Balance AFTER  transfer: $${sourceAccount.balance}`);

  //Validate new account balance via API
  const apiRes = await request.get(`${BASE_URL}/accounts/${newAccountId}`,{headers:{Accept:'application/json'},});
  expect(apiRes.status()).toBe(200);
  const account = await apiRes.json();
  console.log(`API Balance (new account): ${account.balance}`);
  console.log(`Customer ID (from fixture): ${customerId}`);

  //  As we know, the new account starts with $100 min deposit + $200 transfer = $300
  expect(account.id.toString()).toBe(newAccountId);
  expect(account.customerId).toBe(customerId);
  expect(account.balance).toBeGreaterThanOrEqual(Number(TRANSFER_AMOUNT));
  console.log(`UI balance before transfer was: ${uiBalanceBefore}`);
});
