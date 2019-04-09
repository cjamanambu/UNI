const {reloadApp} = require('detox-expo-helpers');

describe('Leave an activity', () => {
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

    it('should have link to sign up page', async () => {
        await expect(element(by.id('goToSignUpPageLink'))).toBeVisible();
    });

    it('should go to the current activities screen', async () => {
        await expect(element(by.id('logInButton'))).toBeVisible();
        await element(by.id('logInButton')).tap();
        await expect(element(by.id('currentActivitiesScreen'))).toBeVisible();
    });

    it('should have the list view', async () => {
        await expect(element(by.id('currentActivitiesListView'))).toBeVisible();
    });

    it('should go to my profile tab', async () => {
        await expect(element(by.id('myProfileTabButton'))).toBeVisible();
        await element(by.id('myProfileTabButton')).tap();
    });

    it('should have user information', async () => {
        await expect(element(by.id('profileScreen'))).toBeVisible();
        await expect(element(by.id('profilePicture'))).toBeVisible();
        await expect(element(by.id('userEmail'))).toBeVisible();
    });

    it('should tap on log out button', async () => {
        await expect(element(by.id('logOutButton'))).toBeVisible();
        await element(by.id('logOutButton')).tap();
        await element(by.label('OK').and(by.type('_UIAlertControllerActionView'))).tap();
    });

    it('should be on log in page', async () => {
        await expect(element(by.id('signInComponent'))).toBeVisible();
    })
});