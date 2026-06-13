import {expect,Page,Locator} from "@playwright/test";

export class Register {
    page: Page;
    registerBtn: Locator;
    firstName: Locator;
    lastName: Locator;
    address: Locator;
    city: Locator;
    state: Locator;
    zipCode: Locator;
    phoneNo: Locator;
    ssn: Locator;
    userName: Locator;
    password: Locator;
    confirm: Locator;
    submit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerBtn = page.getByRole('link',{name:'Register'});
        this.firstName =page.locator('#customer\\.firstName');
        this.lastName = page.locator('#customer\\.lastName');
        this.address = page.locator('#customer\\.address\\.street');
        this.city =page.locator('#customer\\.address\\.city');
        this.state = page.locator('#customer\\.address\\.state');
        this.zipCode = page.locator('#customer\\.address\\.zipCode');
        this.phoneNo = page.locator('#customer\\.phoneNumber');
        this.ssn = page.locator('#customer\\.ssn');
        this.userName = page.locator('#customer\\.username');
        this.password = page.locator('#customer\\.password');
        this.confirm = page.locator('#repeatedPassword');
        this.submit = page.locator('//input[@value="Register"]');
    }

    async registerUser(userData: any) {
        await this.registerBtn.click();
        await expect(this.page.locator("h1.title")).toHaveText("Signing up is easy!")
        await this.firstName.fill(userData.firstName);
        await this.lastName.fill(userData.lastName);
        await this.address.fill(userData.address);
        await this.city.fill(userData.city);
        await this.state.fill(userData.state);
        await this.zipCode.fill(userData.zipCode);
        await this.phoneNo.fill(userData.phoneNo);
        await this.ssn.fill(userData.ssn);
        await this.userName.fill(userData.userName);
        await this.password.fill(userData.password);
        await this.confirm.fill(userData.password);
        await this.submit.click();

    }
}