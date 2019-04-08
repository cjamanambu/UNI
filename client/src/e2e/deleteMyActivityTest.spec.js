const { reloadApp } = require('detox-expo-helpers');

describe('Delete one of my activities', () => {
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

    it('should go to my activities tab', async () => {
        await expect(element(by.id('myActivitiesTabButton'))).toBeVisible();
        await element(by.id('myActivitiesTabButton')).tap();
    });

    it('should click on the last item', async () => {
        await expect(element(by.id('myActivityListView'))).toBeVisible();
        await element(by.id('myActivityListItem')).atIndex(0).tap();
    });

    it('should check for the visibility of information and the delete button', async () => {
        await expect(element(by.id('activityAttendantListView'))).toBeVisible();
        await expect(element(by.id('deleteButton'))).toBeVisible();
    });

    it('should click on delete button', async () => {
        await element(by.id('deleteButton')).tap();
        await element(by.label('OK').and(by.type('_UIAlertControllerActionView'))).tap();

    });

});