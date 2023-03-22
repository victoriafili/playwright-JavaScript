const { expect, test } = require('@playwright/test');
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

test.describe.serial("Successful Sign Up Scenarios", () => {
    let page;
    let signUpPage = null;
    let homePage = null;

    test.beforeAll(async({ browser }) => {
        page = await browser.newPage();
        await browserContext.addCookies([
            {name: 'hideCountryBanner', value: 'true', path: '/', domain: '.oddschecker.com'}
        ]);
        signUpPage = new SignUpPage(page);
        homePage = new HomePage(page);
    });

    test("should attempt to register without checking the tips checkbox", async () => {
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

    test("should attempt to register", async () => {
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