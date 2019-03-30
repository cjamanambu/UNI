const { reloadApp } = require('detox-expo-helpers');

describe('View activity detail', () => {
  beforeAll(async () => {
    // await device.reloadReactNative();
    await reloadApp();
  });

  it('should have sign in screen', async () => {
    await expect(element(by.id('SignInComponent'))).toBeVisible();
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

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });
  //
  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});