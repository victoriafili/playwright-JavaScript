const { chromium } = require('playwright');
const expect = require("expect");
const faker = require('faker');
const {
    BASE_URL,
    EMAIL_ADDRESS_PREFIX,
    VALID_PASSWORD_USER,
    CONFIRM_VALID_PASSWORD_USER,
  } = require("../constants");

describe(`Test`, () => {
    beforeAll(async() => {
        global.flow = {};
    });

    it("should navigate to base URL", async () => {
        await page.goto(BASE_URL);
        await page.waitForTimeout(5000);
    });
    
    it("should register a new referral user", async () => {
        // Click the [Sign-up] button
        await page.click(".sign-up-mobile-tablet sign-up ToolsMenuItemLink_tx5e124");

        // Registration info
        flow.emailAddress = EMAIL_ADDRESS_PREFIX + faker.internet.email();
        await page.fill("#signUpUsername", flow.emailAddress);
        await page.fill("#signUpPassword", VALID_PASSWORD_USER);
        await page.fill("#signUpConfirmPassword", VALID_CONFIRM_PASSWORD_USER);
        await page.check(".negative");

        // Save
        await page.click("#createAccount_button");
    });
});