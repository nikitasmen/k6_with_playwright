import type {  Locator , Page } from "@playwright/test";
import { expect } from "@playwright/test"; 
export class StartPage{
    readonly page: Page;
    readonly pageTittle: Locator;
    readonly accountButton: Locator;
    readonly signupButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTittle = page.locator('h1');
        this.accountButton = page.locator('#menuItem16');
        this.signupButton = page.locator('#menuItem_1638551161296_4211');
        this.logoutButton = page.getByRole('link', { name: 'SIGN OUT' })
    }
    
    async assertStartPage() {
        await expect(this.page).toHaveURL('https://niktest.dev-newui.eu-w1.learnworlds.com/start');
        
    }

    async logout() {
        await this.accountButton.click();
        await this.logoutButton.click();
    }

}