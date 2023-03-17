const BasePage = require("./Base.page");

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.cookieBannerOKButton = '.CookieBannerAcceptButton_c1mxe743';
        this.signUpButton = 'a[class^=sign-up-desktop]';
    }

    async navigateToBaseUrl(){
        await super.navigateToBaseUrl();
    }

    async closeOffersModal() {
        await this.page.getByRole('button', { name: 'Close Offers Modal' }).click();
    }
}

module.exports = HomePage;