const { chromium } = require('playwright');

(async() => {
    // Function code
    const browser = await chromium.launch({headless:false, slowMo: 300});
    const page = await browser.newPage();
    await page.goto('http://paint.js.org/');

    await page.mouse.move(200, 200);
    await page.mouse.down();
    await page.mouse.move(400, 200);
    await page.mouse.move(400, 400);
    await page.mouse.move(200, 400);
    await page.mouse.move(200, 200);
    await page.mouse.up();

    // closing browser
    await browser.close();
})();