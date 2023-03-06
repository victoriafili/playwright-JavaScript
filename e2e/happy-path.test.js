const { chromium } = require('playwright');
const {expect} = require('@playwright/test');
const { faker } = require("@faker-js/faker");
const {
    BASE_URL,
    EMAIL_ADDRESS_PREFIX,
    VALID_PASSWORD_USER,
  } = require("./constants");

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
    
    it("should attempt to register without checking the checkbox for the tips", async () => {
        // Click the [Sign-up] button
        await page.click('a[href="/myoddschecker/login"]');
        // Click the Create an account url
        await page.getByText('Create an account').click();

        // Registration info
        await page.fill("#signUpUsername", flow.emailAddress);
        await page.fill("#signUpPassword", VALID_PASSWORD_USER);
        await page.fill("#signUpConfirmPassword", VALID_PASSWORD_USER);
        await page.check('label[for="terms"]');

        // Verify if the appropriate color of borders is displayed
        const emailInputParent = page.locator('div.textInput', {has: page.locator('#signUpUsername')});
        await expect(emailInputParent).toHaveClass(/textInput__valid/);

        const passwordInputParent = page.locator('div.textInput', {has: page.locator('#signUpPassword')});
        await expect(passwordInputParent).toHaveClass(/textInput__valid/);

        const confirmPasswordInputParent = page.locator('div.textInput', {has: page.locator('#signUpConfirmPassword')});
        await expect(confirmPasswordInputParent).toHaveClass(/textInput__valid/);

        // Save
        await page.click("#createAccount_button");
    });

    it('close the modal', async () => {
        await page.click("#close_button");
    });

    it("should attempt to register", async () => {
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