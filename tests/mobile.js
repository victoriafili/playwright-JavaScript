const { chromium, devices } = require('playwright');
iPhone = devices['iPhone 11'];

(async() => {
    // Function code
    const browser = await chromium.launch({headless:false, slowMo: 300});
    const context = await browser.newContext({
        ...iPhone,
        permissions: ['geolocation'],
        geolocation: { latitude: 19.432608, longitude: -99.133209 },
        locale: 'fr-FR'
    });

    const page = await context.newPage();
    // navigating to site
    await page.goto('http://google.com/maps');
    
    //await page.waitForTimeout(5000);

    await context.close();
    // closing browser
    await browser.close();
})();