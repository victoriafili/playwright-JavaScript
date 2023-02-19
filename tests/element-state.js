const { chromium } = require('playwright');

(async() => {
    // Function code
    const browser = await chromium.launch({headless:false, slowMo: 400});
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/automation-practice-form');

    // print the element state
    const firstName = await page.$('#firstName');
    const sportsCheck = await page.$('#hobbies-checkbox-1');
    const submitBtn = await page.$('#submit');

    console.log(await firstName.isDisabled()); // all the above return T/F
    console.log(await firstName.isEnabled());
    console.log(await firstName.isEditable());
    console.log(await sportsCheck.isChecked());
    console.log(await sportsCheck.isVisible());
    console.log(await submitBtn.isHidden());
    console.log(await submitBtn.isVisible());

    await browser.close();
})();