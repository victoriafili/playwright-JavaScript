const { chromium } = require('playwright');
const {expect} = require('@playwright/test');
const { faker } = require("@faker-js/faker");

const {
    EMAIL_ADDRESS_PREFIX,
    VALID_PASSWORD_USER,
    CONFIRM_PASSWORD_USER,
  } = require("../../constants");

const SignUpPage = require('../../pageObjects/SignUp.page');
const HomePage = require('../../pageObjects/Home.page');

const flow = {
    emailAddress: EMAIL_ADDRESS_PREFIX + faker.internet.email()
}

describe(`Test`, () => {
    let browser, context, page;
    let signUpPage = null;
    let homePage = null;

    beforeAll(async() => {
        browser = await chromium.launch({
            headless:false, 
            logger: {
                isEnabled: (name, severity) => true,
                log: (name, severity, message, args) => console.log(`${name} ${message}`)
            }
        });
        context = await browser.newContext();
        page = await context.newPage();
        signUpPage = new SignUpPage(page);
        homePage = new HomePage(page);
    });

    afterAll(async() => {
        await page.close();
        return browser.close();
    });

    it("should open the sign up modal", async () => {
        await homePage.navigateToBaseUrl();
        await page.click(homePage.cookieBannerOKButton);
        await homePage.closeOffersModal();

        // Click the [Sign-up] button
        await page.click(homePage.signUpButton);

        // Check if the sign-up modal is displayed
        await expect(signUpPage.emailAddressErrorMessage).toBeVisible();
    });

    it("should type a different password in the confirm field and verify error message", async () => {
        // Registration info
        await page.fill(signUpPage.signUpEmailAddressInput, flow.emailAddress);
        await page.fill(signUpPage.signUpPasswordInput, VALID_PASSWORD_USER);
        await page.fill(signUpPage.signUpConfirmPasswordInput, CONFIRM_PASSWORD_USER);
        await page.check(signUpPage.exclusiveTipsAndOffers);

        // Create the account
        await page.click(signUpPage.signUpCreateAccountButton);

        // Verify error message
        await expect(signUpPage.errorMessage).toHaveText(/Passwords do not match/);

        // Verify if the appropriate color of borders is displayed
        await expect(signUpPage.passwordInputParent).toHaveClass(/textInput__valid/);
        await expect(signUpPage.confirmPasswordInputParent).toHaveClass(/textInput__invalid/);
    });

    it("should attempt to register without checking the checkbox for the terms", async () => {
        // Registration info
        await page.fill(signUpPage.signUpEmailAddressInput, flow.emailAddress);
        await page.fill(signUpPage.signUpPasswordInput, VALID_PASSWORD_USER);
        await page.fill(signUpPage.signUpConfirmPasswordInput, VALID_PASSWORD_USER);
        await page.check(signUpPage.exclusiveTipsAndOffers);

        // Create the account
        await page.click(signUpPage.signUpCreateAccountButton);

        // Verify the warning message
        await expect(signUpPage.tAndCsErrorMessage).toHaveText("Please accept the T&Cs and Privacy Policy");

        // Close
        await page.click(signUpPage.signUpCloseButton);
    });
});