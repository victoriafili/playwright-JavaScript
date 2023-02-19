const { chromium } = require('playwright');

(async() => {
    // Function code
    const browser = await chromium.launch({headless:false, slowMo: 100});
    const page = await browser.newPage();

    // navigating to site
    await page.goto('http://google.com');

    // closing browser
    await browser.close();
})();