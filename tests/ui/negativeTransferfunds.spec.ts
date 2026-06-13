import {test,expect} from '@playwright/test';
import {TransferFunds} from '../../pages/transferFunds.page';

test.fixme('NEG-TRANSFER-02: Transfer fails with insufficient balance', async ({page}) => {
  console.log('Running TC-UI-FR5-02: Transfer with insufficient balance');

  await page.goto('/parabank/transfer.htm');
  const transferPage = new TransferFunds(page);
  await transferPage.transferFunds('1000000');

  //Expect error message for insufficient funds
  const errorMsg = page.locator('#showError');
  await expect(errorMsg).toBeVisible({timeout: 5000});
  const errorText = await errorMsg.textContent();
  expect(errorText).toContain('insufficient funds');
  console.log(`TC-UI-FR5-02 Result - Error message: "${errorText}"`);
});

test.fixme('NEG-TRANSFER-03: Transfer fails with blank amount', async ({page}) => {
  console.log('Running TC-UI-FR5-03: Transfer with blank amount');

  await page.goto('/parabank/transfer.htm');
  const transferPage = new TransferFunds(page);
  await transferPage.transferFunds(' ');

  //Expect validation error — transfer should NOT succeed
  const successHeading = page.locator('#showResult h1');
  await expect(successHeading).not.toBeVisible({timeout: 5000});
  console.log('TC-UI-FR5-03 Result - Transfer was not processed for blank amount');
});
