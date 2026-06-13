import {Page,Locator} from "@playwright/test";

export class Login{
    page:Page
    userName:Locator
    password:Locator
    loginBtn:Locator

    constructor(page:Page){
        this.page=page
        this.userName=page.locator('//input[@name="username"]')
        this.password=page.locator('//input[@name="password"]')
        this.loginBtn=page.locator('//input[@value="Log In"]')
    }

    async loginUser(userData:any){
        await this.userName.fill(userData.userName)
        await this.password.fill(userData.password)
        await this.loginBtn.click()
    }
}