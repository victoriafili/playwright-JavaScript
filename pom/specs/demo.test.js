const { chromium } = require('playwright');
const HomePage = require('../models/home.page');
const LoginPage = require('../models/login.page');

describe(`Applitools demo page`, () => {
    jest.setTimeout(30000);
    let browser = null;
    let page = null;
    let context = null;

    beforeAll(async() => {
        browser = await chromium.launch({headless:false, slowMo: 100});
        context = await browser.newContext()
        page = await context.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    afterAll(async() => {
        await context.close();
        await browser.close();
    });

    it(`Should be able to login`, async() =>{
        await loginPage.login('username', 'password');
        expect(await page.title()).not.toBeNull();
    });

    it(`Should be logged as Jack Gomez`, async() =>{
        expect(await homePage.getUserName()).toBe('Jack Gomez');
    });

    it(`Should have total balance of $350`, async() =>{
        expect(await homePage.getBalance('total')).toBe('$350');
    });

    it(`Should have total balance of $17800`, async() =>{
        expect(await homePage.getBalance('credit')).toBe('$17,800');
    });

    it(`Should have total balance of $180`, async() =>{
        expect(await homePage.getBalance('due')).toBe('$180');
    });
});

