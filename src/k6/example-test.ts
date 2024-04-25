import { check } from 'k6';
import { browser } from 'k6/experimental/browser';
// import { SignInPage } from '@pages/SignInPage';
// import { HomePage } from '@pages/HomePage';
// import { StartPage } from '@pages/StartPage';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
}


export default async function () {
  
  const page = browser.newPage();
    
    try {
      await page.goto('https://niktest.dev-newui.eu-w1.learnworlds.com'); 
      await page.waitForLoadState('domcontentloaded'); 
        // await home.visit(); 
        // await signIn.clickSignInButton(); 
        // await signIn.login('test_email@example.com', "Qwerty1!"); 
        // await startPage.assertStartPage(); 
      while(await page.locator('#menuItem5').isVisible()!==true){
        await page.locator('#menuItem5').click(); 
      }
      await page.locator('.-email-input').fill('test_email@example.com'); 
      await page.locator('.-pass-input').fill('Qwerty1!');
      const submitButton = page.locator('#submitLogin');

      await Promise.all([
        page.waitForNavigation(), 
        submitButton.click()
      ]);

      check(page, {
        'header': p => p.locator('h2').textContent() == 'Hi, test_account',
      });
        check(page, {
          'url is correct': () => page.url() === 'https://niktest.dev-newui.eu-w1.learnworlds.com/start'
        });
        // await startPage.logout();
        // await home.assertHomePage(); 
        await page.locator('#menuItem16').click();
        await page.locator('link', {
          name: 'SIGN OUT'
        }).click();
        check(page, {
          'url is correct': () => page.url() === 'https://niktest.dev-newui.eu-w1.learnworlds.com/' 
        });
    } finally {
        await page.close();
        // await browser.close();
    }
};