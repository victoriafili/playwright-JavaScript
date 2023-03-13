const { chromium } = require('playwright');
const {expect} = require('@playwright/test');
const { faker } = require("@faker-js/faker");
const {
    EMAIL_ADDRESS_PREFIX,
    VALID_PASSWORD_USER,
  } = require("../../constants");
const SignUpPage = require('../../pageObjects/SignUp.page');
const HomePage = require('../../pageObjects/Home.page');

const flow = {
    emailAddress: EMAIL_ADDRESS_PREFIX + faker.internet.email()
}

describe(`Successful Sign Up Scenarios`, () => {
    let browser, context, page;
    let signUpPage = null;
    let homePage = null;

    beforeAll(async() => {
        browser = await chromium.launch({headless:false});
        context = await browser.newContext();
        page = await context.newPage();
        signUpPage = new SignUpPage(page);
        homePage = new HomePage(page);
    });

    afterAll(async() => {
        await page.close();
        return browser.close();
    });

    it("should attempt to register without checking the checkbox for the tips", async () => {
        await homePage.navigateToBaseUrl();
        await page.click(homePage.cookieBannerOKButton);
        await homePage.closeOffersModal();

        // Click the [Sign-up] button
        await page.click(signUpPage.signUpButton);

        // Registration info
        await page.fill(signUpPage.signUpEmailAddressInput, flow.emailAddress);
        await page.fill(signUpPage.signUpPasswordInput, VALID_PASSWORD_USER);
        await page.fill(signUpPage.signUpConfirmPasswordInput, VALID_PASSWORD_USER);
        await page.check(signUpPage.termsAndConditionsCheckbox);

        // Verify if the appropriate color of borders is displayed
        const emailInputParent = page.locator('div.textInput', {has: page.locator('#signUpUsername')});
        await expect(emailInputParent).toHaveClass(/textInput__valid/);

        const passwordInputParent = page.locator('div.textInput', {has: page.locator('#signUpPassword')});
        await expect(passwordInputParent).toHaveClass(/textInput__valid/);

        const confirmPasswordInputParent = page.locator('div.textInput', {has: page.locator('#signUpConfirmPassword')});
        await expect(confirmPasswordInputParent).toHaveClass(/textInput__valid/);

        await page.click("#createAccount_button");
        await page.click("#close_button");
    });

    it.skip("should attempt to register by checking also the optional checkboxes", async () => {
        // Click the [Sign-up] button
        await page.click('a[href="/myoddschecker/login"]');

        // Registration info
        await page.fill("#signUpUsername", flow.emailAddress);
        await page.fill("#signUpPassword", VALID_PASSWORD_USER);
        await page.fill("#signUpConfirmPassword", VALID_PASSWORD_USER);
        await page.check('label[for="terms"]');
        await page.check('label[for="marketing"]');

        // Save
        await page.click("#createAccount_button");
    });
});