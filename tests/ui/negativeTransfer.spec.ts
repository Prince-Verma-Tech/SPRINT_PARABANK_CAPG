import {test,expect} from '@playwright/test';

//Clear auth state for checking unauthenticated access
test.use({storageState:{cookies:[],origins:[]}});

test('NEG-TRANSFER-01: Transfer page is not accessible without login', async ({page}) => {
  console.log('Running NEG-TRANSFER-01: Accessing transfer page without auth');

  await page.goto('/parabank/transfer.htm');
  const currentUrl = page.url();
  console.log(`NEG-TRANSFER-01 Result - URL after unauthenticated access: "${currentUrl}"`);

  //The transfer form must NOT be visible when not logged in
  const amountField = page.locator('#amount');
  await expect(amountField).not.toBeVisible({timeout: 5000});
  console.log('NEG-TRANSFER-01 Result - Transfer form not visible');
});

