const { chromium } = require('playwright');

describe(`UI tests for bookstore using playwright`, () => {
    jest.setTimeout(30000);
    let browser = null;
    let page = null;
    let context = null;
    let firstRowCells = null;

    beforeAll(async() => {
        browser = await chromium.launch({headless:false, slowMo: 100});
        context = await browser.newContext()
        page = await context.newPage();
        // navigating to site
        await page.goto('http://demoqa.com/books');
    });

    afterAll(async() => {
        await browser.close()
    });

    it(`Should load page`, async() =>{
        expect(page).not.toBeNull();
        expect(await page.title()).not.toBeNull();
    });

    it(`Should be able to search for eloquent javascript`, async() =>{
        await page.fill('#searchBox', 'eloquent');
    });

    it(`Should check if book image is okay`, async() =>{
        firstRowCells = await page.$$('.ReactTable .rt-tr-group:nth-child(1) .rt-td');
        let imgUrl = await firstRowCells[0].$('img');
        expect(await imgUrl.getAttribute('src')).not.toBeNull();
    });

    it(`Should check if title is okay`, async() =>{
        expect(await firstRowCells[1].innerText()).toBe('Eloquent JavaScript, Second Edition');
    });

    it(`Should check if author is okay`, async() =>{
        expect(await firstRowCells[2].innerText()).toBe('Marijn Haverbeke');
    });

    it(`Should check if publisher is okay`, async() =>{
        expect(await firstRowCells[3].innerText()).toBe('No Starch Press');
    });
})