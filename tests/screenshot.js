const { chromium } = require('playwright');

(async() => {
    // Function code
    const browser = await chromium.launch({headless:false, slowMo: 100});
    const page = await browser.newPage();

    // navigating to site
    await page.goto('http://applitools.com/');

    // take screenshot code
    await page.screenshot({path: 'screenshot.png'});
    await page.locator('.logo').screenshot({path: 'logo.png'});
    await page.screenshot({path: 'fullpage.png', fullPage: true});

    // closing browser
    await browser.close();
})();