const BasePage = require('./Base.page');

class SignUpPage extends BasePage {
    constructor(page) {
        super(page);
        this.signUpEmailAddressInput = '#signUpUsername';
        this.signUpPasswordInput = '#signUpPassword';
        this.signUpConfirmPasswordInput = '#signUpConfirmPassword';
        this.termsAndConditionsCheckbox = 'label[for="terms"]';
        this.exclusiveTipsAndOffers = 'label[for="marketing"]';
        this.emailInputParent = page.locator('div.textInput', {has: this.page.locator('#signUpUsername')});
        this.passwordInputParent = page.locator('div.textInput', {has: this.page.locator('#signUpPassword')});
        this.confirmPasswordInputParent = page.locator('div.textInput', {has: this.page.locator('#signUpConfirmPassword')});
        this.signUpCreateAccountButton = '#createAccount_button';
        this.signUpCloseButton = '#close_button';
        this.emailAddressErrorMessage = page.locator('#signUpUsername');
        this.errorMessage = page.locator('#errorMessage');
        this.tAndCsErrorMessage = page.locator('#tAndCsErrorMessage');
    }
}

module.exports = SignUpPage;