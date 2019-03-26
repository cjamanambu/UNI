const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../app');

chai.use(chaiHttp);
describe('Activities Unit Tests', async () => {

    let token;
    let createdId;
    const signin = '/users/signin';

    const userCredentials = {
        email: 'runTests@myumanitoba.ca',
        password: 'runTests',
    };

    before(async () => {
        const result = await chai
            .request(app)
            .post(signin)
            .send(userCredentials);
        assert.equal(result.status, '200');
        token = result.body.token;
    });
    /*
      * Test the /GET route
      */
    describe('GET /activities', () => {
        it('It should GET all the activities for which the date/time of the event has not passed', async () =>  {
            const result = await chai
                .request(app)
                .get('/activities');
            assert.equal(result.status, '200');
            assert.isObject(result.body);
            assert.hasAllKeys(result.body, ['success', 'info', 'activities']);
        });
    });

    describe('GET /activities/activity:id', () => {
        it('It should GET the details about an activity specified by the Id successfully', async () => {
            const testSuccessResult = await chai
                .request(app)
                .get('/activities/activity/5c9575ad6394943867f91ccc');
            assert.equal(testSuccessResult.status, '200');
            assert.isObject(testSuccessResult.body);
            assert.hasAllKeys(testSuccessResult.body, ['success', 'info', 'activity']);
            assert.isTrue(testSuccessResult.body.success);
        });

        it('It should give a 500 response since the id provided is invalid', async () => {

            const testInvalidID = await chai
                .request(app)
                .get('/activities/activity/:5c9575ad6394943867f91ccc');
            assert.equal(testInvalidID.status, '500');
            assert.isObject(testInvalidID.body);
            assert.hasAllKeys(testInvalidID.body, ['success', 'info', 'activity']);
            assert.isFalse(testInvalidID.body.success);
        });

        it('It should give a 404 response since no activity in the database has the specified id', async () => {

            const testNonExistingId = await chai.request(app).get('/activities/activity/5c97ce54c7c41320ba3ddb01');
            assert.equal(testNonExistingId.status, '404');
            assert.isObject(testNonExistingId.body);
            assert.hasAllKeys(testNonExistingId.body, ['success', 'info', 'activity']);
            assert.isTrue(testNonExistingId.body.success);
        });

    });


    describe('POST /activities/activity/create', () => {
        it('It should POST the details about an activity and create an Id successfully', async () => {
            const newActivity = {activity_datetime: new Date("2019-05-01 02:04:19.694"),
                                 category: "SPORTS",
                                 description: "Testing creation",
                                 max_attendance: 10,
                                 title: "testRun",
                                 location: "Um Centre"};
            const testSuccessResult = await chai
                .request(app)
                .post('/activities/activity/create')
                .set('Authorization', token)
                .send(newActivity);
            assert.equal(testSuccessResult.status, '200');
            assert.isObject(testSuccessResult.body);
            assert.hasAllKeys(testSuccessResult.body, ['success', 'info', 'activity']);
            assert.isTrue(testSuccessResult.body.success);
        });

        it('It should give a 400 response since the payload provided is missing important fields', async () => {
            const newActivity = {activity_datetime: new Date("2019-05-01 02:04:19.694"),
                                 category: "SPORTS"};
            const testInvalidPayload = await chai
                .request(app)
                .post('/activities/activity/create')
                .set('Authorization', token)
                .send(newActivity);
            assert.equal(testInvalidPayload.status, '400');
            assert.isObject(testInvalidPayload.body);
            assert.hasAllKeys(testInvalidPayload.body, ['success', 'info', 'activity']);
            assert.isNull(testInvalidPayload.body.activity);
            assert.isFalse(testInvalidPayload.body.success);
        });

    });

    describe('GET /activities/activity/sortBy/:category', () => {
        it('It should GET the activities that have the category specified', async () => {
            const testSuccessResult = await chai
                .request(app)
                .get('/activities/activity/sortBy/sports');
            assert.equal(testSuccessResult.status, '200');
            assert.isObject(testSuccessResult.body);
            assert.hasAllKeys(testSuccessResult.body, ['success', 'info', 'activities']);
            assert.isTrue(testSuccessResult.body.success);
            let returnedActivities = testSuccessResult.body.activities;
            let i;
            for (i=0; i<returnedActivities.length; i++){
                assert.equal(returnedActivities[i].category, 'SPORTS');
            }
        });
    });

    describe('GET /users/user/activities/attending', () => {
        it('It should GET the activities that the user is attending', async () => {
            const testSuccessResult = await chai
                .request(app)
                .get('/users/user/activities/attending')
                .set('Authorization', token);
            assert.equal(testSuccessResult.status, '200');
            assert.isObject(testSuccessResult.body);
            assert.hasAllKeys(testSuccessResult.body, ['success', 'info', 'activities']);
            assert.isTrue(testSuccessResult.body.success);
            assert.equal(testSuccessResult.body.activities.length, '0');
        });
    });
});