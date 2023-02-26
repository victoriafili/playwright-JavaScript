const { chromium } = require('playwright');
const { ClassicRunner, Eyes, Target, RectangleSize } = require('@applitools/eyes-playwright');

describe(`UI tests for dynamic content using playwright and applitools`, () => {
    jest.setTimeout(30000);
    let browser = null;
    let page = null;
    let context = null;
    const eyes = new Eyes(new ClassicRunner());

    beforeAll(async() => {
        browser = await chromium.launch({headless:false, slowMo: 100});
        context = await browser.newContext()
        page = await context.newPage();
        // navigating to site
        await page.goto('https://the-internet.herokuapp.com/dynamic_content');
    });

    afterAll(async() => {
        await browser.close()
    });

    it(`Should look okay`, async() =>{
        await page.waitForSelector('h3', { state: 'attached'});
        await eyes.open(page, 'The internet', 'Dynamic content', new RectangleSize(800, 600));
        await eyes.check(Target.window().fully());
        await eyes.close();
    });
});