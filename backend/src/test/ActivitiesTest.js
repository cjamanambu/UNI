const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../app');

chai.use(chaiHttp);
describe('Activities Unit Tests', async () => {
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
        it('It should GET the details about an activity if the unique id is provided', async () =>  {
            const testSuccessResult = await chai
                .request(app)
                .get('/activities/activity/5c9575ad6394943867f91ccc');
            assert.equal(testSuccessResult.status, '200');
            assert.isObject(testSuccessResult.body);
            assert.hasAllKeys(testSuccessResult.body, ['success', 'info', 'activity']);
            assert.isTrue(testSuccessResult.body.success);

            const testInvalidID = await chai
                .request(app)
                .get('/activities/activity/:5c9575ad6394943867f91ccc');
            assert.equal(testInvalidID.status, '500');
            assert.isObject(testInvalidID.body);
            assert.hasAllKeys(testInvalidID.body, ['success', 'info', 'activity']);
            assert.isFalse(testInvalidID.body.success);

        });
    });

    /*describe('POST /activities/activity/create', () => {
        it('It should GET the details about an activity if the unique id is provided', async () =>  {
            const testSuccessResult = await chai
                .request(app)
                .post('/activities/activity/create');
            assert.equal(testSuccessResult.status, '200');
            assert.isObject(testSuccessResult.body);
            assert.hasAllKeys(testSuccessResult.body, ['success', 'info', 'activity']);
            assert.isTrue(testSuccessResult.body.success);

            const testInvalidID = await chai
                .request(app)
                .get('/activities/activity/create');
            assert.equal(testInvalidID.status, '400');
            assert.isObject(testInvalidID.body);
            assert.hasAllKeys(testInvalidID.body, ['success', 'info', 'activity']);
            assert.isFalse(testInvalidID.body.success);

        });
    });*/

});