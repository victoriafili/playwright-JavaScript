const { chromium } = require('playwright');

(async() => {
    // Function code
    const browser = await chromium.launch({headless : false, slowMo : 300});
    const page = await browser.newPage();
    await page.goto('https://www.demoqa.com/frames'); // site is not found

    // logic to handle the iframes
    const frame1 = await page.frame({url: /\/sample/});
    const heading1 = await frame1.$('h1');
    console.log(await heading1.innerText());

    await browser.close();
})();