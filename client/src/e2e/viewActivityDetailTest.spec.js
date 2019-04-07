// const { reloadApp } = require('detox-expo-helpers');
//
// describe('View activity detail', () => {
//     beforeAll(async () => {
//         await reloadApp();
//     });
//
//     it('should have sign in screen', async () => {
//         await expect(element(by.id('signInComponent'))).toBeVisible();
//     });
//
//     it('should have logo on screen', async () => {
//         await expect(element(by.id('logoComponent'))).toBeVisible();
//     });
//
//     it('should have email text box', async () => {
//         await expect(element(by.id('emailSignInText'))).toBeVisible();
//     });
//
//     it('should have password text box', async () => {
//         await expect(element(by.id('passwordSignInText'))).toBeVisible();
//     });
//
//     it('should have log in button', async () => {
//         await expect(element(by.id('logInButton'))).toBeVisible();
//     });
//
//     it('should have link to sign up page', async () => {
//         await expect(element(by.id('goToSignUpPageLink'))).toBeVisible();
//     });
//
//     it('should go to the current activities screen', async () => {
//         await expect(element(by.id('logInButton'))).toBeVisible();
//         await element(by.id('logInButton')).tap();
//         await expect(element(by.id('currentActivitiesScreen'))).toBeVisible();
//     });
//
//     it('should have the add button', async () => {
//         await expect(element(by.id('addButton'))).toBeVisible();
//     });
//
//     it('should have the list view', async () => {
//         await expect(element(by.id('currentActivitiesListView'))).toBeVisible();
//     });
//
//     it('should scroll', async () => {
//         await element(by.id('currentActivitiesListView')).swipe('up');
//         await element(by.id('currentActivitiesListView')).swipe('down');
//     });
//
//     it('should tap a row', async () => {
//         await element(by.id('currentActivitiesListItem')).atIndex(5).tap();
//         // await expect(element(by.id('activityDetailScreen'))).toBeVisible();
//     });
//
//     // it('should show activity details', async () => {
//     //
//     //     // await expect(element(by.id('activityDetailTitle'))).toBeVisible();
//     //     // await expect(element(by.id('activityDetailsTypePicture'))).toBeVisible();
//     //     // await expect(element(by.id('activityDetailsTime'))).toBeVisible();
//     // })
// });