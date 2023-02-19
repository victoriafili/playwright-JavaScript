const { chromium } = require('playwright');

(async() => {
    // Function code
    const browser = await chromium.launch({headless:false, slowMo: 100});
    const context = await browser.newContext({
        recordVideo: {
            dir:"./recordings"
        }
    });

    const page = await context.newPage();
    // navigating to site
    await page.goto('http://the-internet.herokuapp.com/dynamic_loading/1');

    // click on button
    await page.click('button');
    await page.waitForSelector('#loading');
    await page.waitForSelector('#loading', { state: 'hidden' });

    // closing browser / context
    await context.close();
    await browser.close();
})();