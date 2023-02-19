const { chromium } = require('playwright');

(async() => {
    // Function code
    const browser = await chromium.launch({headless:false, slowMo: 100});
    const page = await browser.newPage();
    await page.goto('http://the-internet.herokuapp.com/key_presses');

    //await page.click('input');
    await page.click('#target');
    await page.keyboard.type('one does not simply exit vim');
    await page.keyboard.down('Shift');

    const str = 'exit vim'
    for(let i = 0; i < str.length; i++) {
        await page.keyboard.press('ArrowLeft');
    }

    await browser.close();
})();