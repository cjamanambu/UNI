const { reloadApp } = require('detox-expo-helpers');

describe('Sign up as a new user', () => {
    beforeAll(async () => {
        await reloadApp();
    });

    it('should have sign in screen', async () => {
        await expect(element(by.id('signInComponent'))).toBeVisible();
    });

    it('should have logo on screen', async () => {
        await expect(element(by.id('logoComponent'))).toBeVisible();
    });

    it('should have email text box', async () => {
        await expect(element(by.id('emailSignInText'))).toBeVisible();
    });

    it('should have password text box', async () => {
        await expect(element(by.id('passwordSignInText'))).toBeVisible();
    });

    it('should have log in button', async () => {
        await expect(element(by.id('logInButton'))).toBeVisible();
    });

    it('should go to sign up page', async () => {
        await expect(element(by.id('goToSignUpPageLink'))).toBeVisible();
        await element(by.id('goToSignUpPageLink')).tap();
    });

    it('should have password fields and Sign Up button', async () => {
        await expect(element(by.id('signUpButton'))).toBeVisible();
        await expect(element(by.id('passwordTextInput'))).toBeVisible();
        await expect(element(by.id('confirmPasswordTextInput'))).toBeVisible();
    });

    it('should fill in username field', async () => {
        await element(by.id('usernameTextInput')).tap();
        await element(by.id('usernameTextInput')).typeText('automatedTestUser');
    });

    it('should fill in email field with invalid email', async () => {
        await element(by.id('emailTextInput')).tap();
        await element(by.id('emailTextInput')).typeText('automatedTestUser@gmail.com');
        await element(by.id('passwordTextInput')).tap();
        await element(by.id('passwordTextInput')).typeText('password');
        await element(by.id('confirmPasswordTextInput')).tap();
        await element(by.id('confirmPasswordTextInput')).typeText('password');
        await element(by.id('signUpButton')).tap();
        await element(by.label('OK').and(by.type('_UIAlertControllerActionView'))).tap();
    });

    it('should fill in with missing information', async () => {
        await element(by.id('emailTextInput')).clearText();
        await element(by.id('emailTextInput')).typeText('automatedTestUser@myumanitoba.ca');
        await element(by.id('passwordTextInput')).tap();
        await element(by.id('passwordTextInput')).typeText('passworD');
        await element(by.id('confirmPasswordTextInput')).clearText();
        await element(by.id('signUpButton')).tap();
        await element(by.label('OK').and(by.type('_UIAlertControllerActionView'))).tap();
    });

    it('should fill in email field with unmatched password and confirmed password', async () => {
        await element(by.id('passwordTextInput')).tap();
        await element(by.id('passwordTextInput')).typeText('passworD');
        await element(by.id('confirmPasswordTextInput')).tap();
        await element(by.id('confirmPasswordTextInput')).typeText('password');
        await element(by.id('signUpButton')).tap();
        await element(by.label('OK').and(by.type('_UIAlertControllerActionView'))).tap();
    });

    it('should fill in with valid information', async () => {
        await element(by.id('passwordTextInput')).tap();
        await element(by.id('passwordTextInput')).typeText('password');
        await element(by.id('confirmPasswordTextInput')).tap();
        await element(by.id('confirmPasswordTextInput')).typeText('password');
        await element(by.id('confirmPasswordTextInput')).tapReturnKey();
        await element(by.id('signUpButton')).tap();
    });
});