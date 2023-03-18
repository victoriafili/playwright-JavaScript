const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
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

    it("should attempt to register without checking the tips checkbox", async () => {
        await homePage.navigateToBaseUrl();
        await page.click(homePage.cookieBannerOKButton);
        await homePage.closeOffersModal();

        // Click the [Sign-up] button
        await page.click(homePage.signUpButton);

        // Registration info
        await page.fill(signUpPage.signUpEmailAddressInput, flow.emailAddress);
        await page.fill(signUpPage.signUpPasswordInput, VALID_PASSWORD_USER);
        await page.fill(signUpPage.signUpConfirmPasswordInput, VALID_PASSWORD_USER);
        await page.check(signUpPage.termsAndConditionsCheckbox);

        // Verify if the appropriate color of borders is displayed
        await expect(signUpPage.emailInputParent).toHaveClass(/textInput__valid/);
        await expect(signUpPage.passwordInputParent).toHaveClass(/textInput__valid/);
        await expect(signUpPage.confirmPasswordInputParent).toHaveClass(/textInput__valid/);

        // Save and close
        await page.click(signUpPage.signUpCreateAccountButton);
        await page.click(signUpPage.signUpCloseButton);
    });

    it("should attempt to register", async () => {
        // Click the [Sign-up] button
        await page.click(homePage.signUpButton);

        // Registration info
        await page.fill(signUpPage.signUpEmailAddressInput, flow.emailAddress);
        await page.fill(signUpPage.signUpPasswordInput, VALID_PASSWORD_USER);
        await page.fill(signUpPage.signUpConfirmPasswordInput, VALID_PASSWORD_USER);
        await page.check(signUpPage.termsAndConditionsCheckbox);
        await page.check(signUpPage.exclusiveTipsAndOffers);

        // Save
        await page.click(signUpPage.signUpCreateAccountButton);
    });
});