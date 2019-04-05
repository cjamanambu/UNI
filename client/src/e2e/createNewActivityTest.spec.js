const { reloadApp } = require('detox-expo-helpers');

describe.only('View activity detail', () => {
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

    it('should have the add button', async () => {
        await expect(element(by.id('addButton'))).toBeVisible();
    });

    it('should have the list view', async () => {
        await expect(element(by.id('currentActivitiesListView'))).toBeVisible();
    });

    it('should click on the add button', async () => {
        await element(by.id('addButton')).tap();
    });

    it('should show the new activity form', async () => {
        await expect(element(by.id('newActivityView'))).toBeVisible();
        await expect(element(by.id('createActivityTitle'))).toBeVisible();
        await expect(element(by.id('newActivityName'))).toBeVisible();
        await element(by.id('newActivityName')).tap();
        await element(by.id('newActivityName')).typeText('john@example.com');
        // await element(by.id('newActivityName')).typeText('Added by TEST');
    })
});