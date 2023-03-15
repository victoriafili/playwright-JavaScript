const BasePage = require('./Base.page');

class SignUpPage extends BasePage {
    constructor(page) {
        super(page);
        this.signUpButton = 'a[class^=sign-up-desktop]';
        this.signUpEmailAddressInput = '#signUpUsername';
        this.signUpPasswordInput = '#signUpPassword';
        this.signUpConfirmPasswordInput = '#signUpConfirmPassword';
        this.termsAndConditionsCheckbox = 'label[for="terms"]';
    }

}

module.exports = SignUpPage;