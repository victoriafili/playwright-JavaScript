const { expect, test } = require('@playwright/test');
const { faker } = require("@faker-js/faker");

const {
    EMAIL_ADDRESS_PREFIX,
    VALID_PASSWORD_USER,
    CONFIRM_PASSWORD_USER,
  } = require("../../constants");

const SignUpPage = require('../../pageObjects/SignUp.page');
const HomePage = require('../../pageObjects/Home.page');
const dataModel = require('../../utils/dataModel');

const flow = {
    emailAddress: EMAIL_ADDRESS_PREFIX + faker.internet.email()
}

test.describe.serial("Unsuccessful Sign Up", () => {
    let page;
    let signUpPage = null;
    let homePage = null;

    test.beforeAll(async({ browser }) => {
        page = await browser.newPage();
        signUpPage = new SignUpPage(page);
        homePage = new HomePage(page);
    });

    test("should open the sign up modal and verify password validation error message", async () => {
        await homePage.navigateToBaseUrl();
        await page.click(homePage.cookieBannerOKButton);
        await homePage.closeOffersModal();

        // Click the [Sign-up] button
        await page.click(homePage.signUpButton);

        // Check if the sign-up modal is displayed
        await expect(signUpPage.emailAddress).toBeVisible();

        // Registration info
        await page.fill(signUpPage.signUpEmailAddressInput, flow.emailAddress);
        await page.fill(signUpPage.signUpPasswordInput, VALID_PASSWORD_USER);
        await page.fill(signUpPage.signUpConfirmPasswordInput, CONFIRM_PASSWORD_USER);
        await page.check(signUpPage.exclusiveTipsAndOffers);

        // Create the account
        await page.click(signUpPage.signUpCreateAccountButton);

        // Verify password error message
        await expect(signUpPage.errorMsg).toHaveText(dataModel.passwordErrorMsg);

        // Verify if the appropriate color of borders is displayed
        await expect(signUpPage.passwordInputParent).toHaveClass(/textInput__valid/);
        await expect(signUpPage.confirmPasswordInputParent).toHaveClass(/textInput__invalid/);
    });

    test("should attempt to register without checking the terms checkbox and verify that page has no logs", async () => {
        const logs = []
        page.on("console", (message) => {
            logs.push({ message, type: message.type() })
        });

        // Registration info
        await page.fill(signUpPage.signUpEmailAddressInput, flow.emailAddress);
        await page.fill(signUpPage.signUpPasswordInput, VALID_PASSWORD_USER);
        await page.fill(signUpPage.signUpConfirmPasswordInput, VALID_PASSWORD_USER);
        await page.check(signUpPage.exclusiveTipsAndOffers);

        // Create the account
        await page.click(signUpPage.signUpCreateAccountButton);

        // Verify the warning message
        await expect(signUpPage.tAndCsErrorMsg).toHaveText(dataModel.acceptTCsErrorMsg);

        // Verify that there are no logs
        expect(logs.length).toBe(0);

        // Close
        await page.click(signUpPage.signUpCloseButton);
    });     
});