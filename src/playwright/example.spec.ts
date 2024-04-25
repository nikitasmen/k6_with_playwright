import { test } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';
import { StartPage } from '../pages/StartPage';


test('LogIn/Logout test', async ({ page }) => {
  let signInPage: SignInPage;
  let startPage: StartPage;
  signInPage = new SignInPage(page);
  //go to the page
  await signInPage.visit();
  //click on the signup form and then on the sign in form
  await signInPage.clickSignInButton();
  startPage = new StartPage(page);
    //fill the email and password fields with correct credentials and submit 
    await signInPage.login('test_email@example.com', 'Qwerty1!'); 
    //assert that the user is logged in and the correct page is displayed
    await startPage.assertStartPage();
    //logout
    await startPage.logout();
    //assert url is correct
    await signInPage.assertHomePage();
});