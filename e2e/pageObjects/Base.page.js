const { BASE_URL } = require("../constants");

class BasePage{
    constructor(page) {
        this.page = page;
    }

    async navigateToBaseUrl(){
        await this.page.goto(BASE_URL)
    }
}

module.exports = BasePage;