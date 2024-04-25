import type { Locator , Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('#menuItem5');
    }
    
    async visit() {
        await this.page.goto('https://niktest.dev-newui.eu-w1.learnworlds.com');
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async assertHomePage() {
        await expect(this.page).toHaveURL('https://niktest.dev-newui.eu-w1.learnworlds.com');
        await expect(this.signInButton).toBeVisible();
    }

}
