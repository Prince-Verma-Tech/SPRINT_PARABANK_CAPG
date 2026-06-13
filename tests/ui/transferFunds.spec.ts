import {test,expect} from '../../fixtures/customerId.fixture';
import {CreateAccount} from '../../pages/createAccount.page';
import {TransferFunds} from '../../pages/transferFunds.page';

test('TC-UI-01: Transfer Funds between accounts', async ({page}) => {
  //Open a new account to use as the destination
  await page.goto('/parabank/openaccount.htm');
  const accountPage = new CreateAccount(page);
  await accountPage.createAccountUser();

  //Go to Transfer Funds page and transfer $10
  await page.goto('/parabank/transfer.htm');
  const transferPage = new TransferFunds(page);
  await transferPage.transferFunds('10');

  //Validate success message
  await expect(page.getByRole('heading',{name:'Transfer Complete!'})).toBeVisible({timeout: 10000});
});
