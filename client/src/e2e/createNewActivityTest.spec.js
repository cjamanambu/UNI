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
    });

    it('should add activity title', async () => {
        await expect(element(by.id('newActivityName'))).toBeVisible();
        await element(by.id('newActivityName')).tap();
        await element(by.id('newActivityName')).typeText('Added by TEST');
    });

    it('should add activity location', async () => {
        await element(by.id('newActivityLocation')).tap();
        await element(by.id('newActivityLocation')).typeText('University Centre');
    });

    it('should select a type for the activity', async () => {
        await expect(element(by.id('newActivityTypeDropdownView'))).toBeVisible();
        await expect(element(by.id('newActivityTypeDropdown'))).toBeVisible();
        await element(by.id('newActivityTypeDropdown')).tap();
        await element(by.id('newActivityTypeDropdown')).tap();
        await element(by.id('newActivityTypeDropdown')).tap();
    });

    it('should choose a time for the activity', async () => {
        await expect(element(by.id('datePicker'))).toBeVisible();
        await element(by.id('datePicker')).tap();
        await expect(element(by.type('UIDatePicker'))).toBeVisible();
        await element(by.type('UIDatePicker')).setDatePickerDate('2019-04-15T05:10:00-08:00', "yyyy-MM-dd'T'HH:mm:ssZZZZZ");
        await element(by.type('UIDatePicker')).tapAtPoint({x: 330, y: -4});
    });

    it('should try to create a new activity with missing information', async () => {
        await element(by.id('createNewActivityButton')).tap();
        await element(by.label('OK').and(by.type('_UIAlertControllerActionView'))).tap();
    });

    it('should set a maximum number of attendants', async () => {
        await expect(element(by.id('maxAttendantsDropdownView'))).toBeVisible();
        await expect(element(by.id('maxAttendantsDropdown'))).toBeVisible();
        await element(by.id('maxAttendantsDropdown')).tap();
        await element(by.id('maxAttendantsDropdown')).tap();
    });

    it('should add activity description', async () => {
        await element(by.id('newActivityDescriptionView')).tap();
        await element(by.id('newActivityDescriptionView')).typeText('This is a very long description for this activity, the reason is this is a test activity, so the team just want to make it long so it looks real and see if it works.');
        await element(by.id('newActivityDescriptionView')).tapReturnKey();
    });

    it('should click the create new activity button', async () => {
        await element(by.id('createNewActivityButton')).tap();
    });
});