const { chromium } = require('playwright');

(async() => {
    // Function code
    const browser = await chromium.launch({headless : false, slowMo : 300});
    const page = await browser.newPage();
    await page.goto('https://id.heroku.com/account/password/reset');

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });

    await page.click('#onetrust-accept-btn-handler');

    // code to type in email textbox
    // const email = await page.$('#reset_email');
    // await email.type('ixchel@email.com', {delay: 50});
    await page.locator('#reset_email').type('ixchel@email.com', {delay : 50});
    await browser.close();
})();