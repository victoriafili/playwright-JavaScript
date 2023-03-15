const { chromium } = require('playwright');
const {expect} = require('@playwright/test');
const { faker } = require("@faker-js/faker");
const {
    BASE_URL,
    EMAIL_ADDRESS_PREFIX,
    VALID_PASSWORD_USER,
    CONFIRM_PASSWORD_USER,
  } = require("../../constants");

const flow = {
    emailAddress: EMAIL_ADDRESS_PREFIX + faker.internet.email()
}

describe(`Test`, () => {
    let browser, context, page

    beforeAll(async() => {
        browser = await chromium.launch({headless:false});
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterAll(async() => {
        await page.close();
        return browser.close();
    });

    it("should navigate to base URL", async () => {
        await page.goto(BASE_URL);
    });

    it("should accept the cookies", async() => {
        await page.click(".CookieBannerAcceptButton_c1mxe743");
    });

    it("should close the advertisement modal", async() => {
        await page.getByRole('button', { name: 'Close Offers Modal' }).click();
    });

    it("should open the sign up modal", async () => {
        // Click the [Sign-up] button
        await page.click('a[href="/myoddschecker/login"]');
        // Click the Create an account url
        await page.getByText('Create an account').click();
        //await expect(page.getByTitle('Sign up')).toHaveText('Sign up');

        // Check if the sign-up modal is displayed
        await expect(page.locator("#signUpUsername")).toBeVisible();
    });

    it("should type a different password in the confirm field and verify error message", async () => {
        // Registration info
        await page.fill("#signUpUsername", flow.emailAddress);
        await page.fill("#signUpPassword", VALID_PASSWORD_USER);
        await page.fill("#signUpConfirmPassword", CONFIRM_PASSWORD_USER);
        await page.check("label[for=marketing]");

        await page.click("#createAccount_button");

        // Verify error message
        await expect(page.locator("#errorMessage")).toHaveText("Passwords do not match");

        // Verify if the appropriate color of borders is displayed
        const passwordInputParent = page.locator('div.textInput', {has: page.locator('#signUpPassword')});
        await expect(passwordInputParent).toHaveClass(/textInput__valid/);

        const confirmPasswordInputParent = page.locator('div.textInput', {has: page.locator('#signUpConfirmPassword')});
        await expect(confirmPasswordInputParent).toHaveClass(/textInput__invalid/);
    });

    it("should attempt to register without checking the checkbox for the terms", async () => {
        // Registration info
        await page.fill("#signUpUsername", flow.emailAddress);
        await page.fill("#signUpPassword", VALID_PASSWORD_USER);
        await page.fill("#signUpConfirmPassword", VALID_PASSWORD_USER);
        await page.check('label[for="marketing"]');

        // Save
        await page.click("#createAccount_button");

        // Verify the warning message
        await expect(page.locator("#tAndCsErrorMessage")).toHaveText("Please accept the T&Cs and Privacy Policy");
    });

    it('close the modal', async () => {
        await page.click("#close_button");
    });
});