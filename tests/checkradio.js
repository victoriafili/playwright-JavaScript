const { chromium } = require('playwright');

(async() => {
    // Function code
    const browser = await chromium.launch({headless : false, slowMo : 300});
    const page = await browser.newPage();
    await page.goto('https://www.w3schools.com/howto/howto_css_custom_checkbox.asp');

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });

    await page.click('#accept-choices');

    // check the second checkbox
    const checks = await page.$$('#main div :nth-child(1) input[type=checkbox]')
    await checks[1].check();
    await checks[0].uncheck();

    // select the second radio button
    const radios = await page.$$('#main div :nth-child(1) input[type=radio]')
    await radios[1].check();

    await browser.close();
})();