const { reloadApp } = require('detox-expo-helpers');

describe.only('confirm joined activity length by leaving', () => {
    beforeAll(async () => {
        await reloadApp();
    });

    it('should have sign in screen', async () => {
        await expect(element(by.id('signInComponent'))).toBeVisible();// i need this
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

    it('should go to the joined activities screen', async () => {
        await expect(element(by.id('logInButton'))).toBeVisible();
        await element(by.id('logInButton')).tap();
        await element(by.id('joinedActivitiesTabButton')).tap();
    });

    it('should have the list view', async () => {
        await expect(element(by.id('joinedActivityListView'))).toBeVisible();
    });

    it('should scroll', async () => {
        await element(by.id('joinedActivityListView')).swipe('up');
        await element(by.id('joinedActivityListView')).swipe('down');
    });

    it('should tap on the first row', async () => {
        await element(by.id('joinedActivityListItem')).atIndex(1).tap();
    });

    it('should have activity type', async () => {
        await expect(element(by.id('activityTypeTest'))).toBeVisible();
    });

    it('should have logo', async () => {
        await expect(element(by.id('detailLogo'))).toBeVisible();
    });

    it('should have time', async () => {
        await expect(element(by.id('timeTest'))).toBeVisible();
    });

    it('should have location', async () => {
        await expect(element(by.id('activityLocationText'))).toBeVisible();
    });

    it('should have location', async () => {
        await expect(element(by.id('descriptionTest'))).toBeVisible();
    });

    it('should have the leave button', async () => {
        await expect(element(by.id('descriptionTest'))).toBeVisible();
    });


});