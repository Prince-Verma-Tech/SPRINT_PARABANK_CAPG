import {test as setup, expect} from "@playwright/test";
import {Register} from "../pages/register.page";
import {Login} from "../pages/login.page";
import * as fs from "fs";

const userData = JSON.parse(fs.readFileSync("test-data/register.json", "utf-8"),);
const {userName, password} = userData.validData;

setup("authenticate user", async ({page}) => {
  await page.goto("/parabank/index.htm");
  const loginPage = new Login(page);
  await loginPage.loginUser({userName, password});

  //Wait up to 10s for login to redirect to overview
  const loginSucceeded = await page.waitForURL(/overview\.htm/, { timeout: 10000 }).then(() => true).catch(() => false);

  if(!loginSucceeded){
    //Login failed - register the user (may already exist; ignore error and navigate manually)
    await page.goto("/parabank/index.htm");
    const registerPage = new Register(page);
    await registerPage.registerUser(userData.validData);

    //After registration ParaBank stays on /register.htm — navigate manually to overview
    await page.goto("/parabank/overview.htm");
  }

  // Confirm we are on the overview page
  await expect(page).toHaveURL(/overview\.htm/,{timeout: 10000});

  // Save auth state
  await page.context().storageState({path: ".auth/user.json"});

  // Keep login.json in sync so the customerId fixture always has valid credentials
  fs.writeFileSync("test-data/login.json",JSON.stringify({userName, password}, null, 4),);
});
