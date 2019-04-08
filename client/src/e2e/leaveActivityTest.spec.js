const { reloadApp } = require('detox-expo-helpers');

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

    it('should go to joined activities tab', async () => {
        await expect(element(by.id('joinedActivitiesTabButton'))).toBeVisible();
        await element(by.id('joinedActivitiesTabButton')).tap();
    });

    it('should click on the last item', async () => {
        await expect(element(by.id('joinedActivityListView'))).toBeVisible();
        await element(by.id('joinedActivityListItem')).atIndex(0).tap();
    });

    it('should check for the visibility of information and the leave button', async () => {
        await expect(element(by.id('leaveActivityButton'))).toBeVisible();
    });

    it('should click on leave button', async () => {
        await element(by.id('leaveActivityButton')).tap();
    });

});