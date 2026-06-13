import {Page} from '@playwright/test';

export class AccountOverview {
    page: Page;

    constructor(page:Page) {
        this.page = page;
    }
    
    async getFirstAccountBalance():Promise<string>{
        const firstAccountRow = this.page.locator('#accountTable tbody tr td a').first();
        await firstAccountRow.waitFor({state:'visible',timeout: 30000});
        const balanceText = await this.page.locator('#accountTable tbody tr').first().locator('td').nth(1).textContent();
        return balanceText?.trim()??'';
    }

    async getFirstAccountId():Promise<string>{
        const firstAccountLink = this.page.locator('#accountTable tbody tr td a').first();
        await firstAccountLink.waitFor({state:'visible',timeout: 30000});
        const href = await firstAccountLink.getAttribute('href');
        const id = href?.split('id=')[1]??'';
        return id;
    }
}
