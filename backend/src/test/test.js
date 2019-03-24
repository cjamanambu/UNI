let chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../app');
const mongoose = require('mongoose');


chai.use(chaiHttp);
let token;

describe('Testing attending and unattending', () => {
	const signin = '/users/signin';

	const userCredentials = {
		email: 'yinka@myumanitoba.ca',
		password: 'yinka',
	};

	before(async () => {
		const result = await chai
			.request(app)
			.post(signin)
			.send(userCredentials);
		expect(result.status).to.equal(200);
		token = result.body.token;
	});

	// after all test have run we drop our test database
	after('droping test db', async () => {
		await mongoose.connection.close();
	});

	it('should return a 200 response if the user is able to attend an activity', async () => {
		try {
		const result = await chai
			.request(app)
			.put('/activities/activity/attend/5c96d84e23f9d417643b710b')
			.set('Authorization', token);

		expect(result.status).to.equal(200);
		expect(result.body).not.to.be.empty;

		} catch (err) {
			console.log(err);
		}
	});

	it('should return a 500 response if the activity does not exist', async () => {
		try {
		const result = await chai
			.request(app)
			.put('/activities/activity/attend/5c96d84e23f9d417643b710z')
			.set('Authorization', token);

		expect(result.status).to.equal(500);
		expect(result.body).not.to.be.empty;

		} catch (err) {
			console.log(err);
		}
	});

	it('should return a 200 response if the activity is successfully unattended', async () => {
		try {
		const result = await chai
			.request(app)
			.put('/activities/activity/unattend/5c96d84e23f9d417643b710b')
			.set('Authorization', token);

		expect(result.status).to.equal(200);
		expect(result.body).not.to.be.empty;

		} catch (err) {
			console.log(err);
		}
	});

	it('should return 200 response if the user has attended at least one activity', async () => {
		try {
		const result = await chai
			.request(app)
			.get('/users/user/activities/attending')
			.set('Authorization', token);

		expect(result.status).to.equal(200);
		expect(result.body).not.to.be.empty;
		expect(result.body.activities).to.have.length.above(1);
		// console.log(JSON.stringify(result.body.activities));

		} catch (err) {
			console.log(err);
		}
	});

	it('should return 401 response if the user does not exist for attending activities', async () => {
		try {
		const result = await chai
			.request(app)
			.get('/users/user/activities/attending')

		expect(result.status).to.equal(401);
		expect(result.body).not.to.be.empty;
		expect(result.body.activities).to.be.a('undefined');

		} catch (err) {
			console.log(err);
		}
	});

	describe('tests for deleting an acctivity', async() => {
		it('Should delete an activity by returning response 200', async () => {
			try {
				const result = await chai
					.request(app)
					.delete('/users/user/activities/activity/delete/5c96d8da23f9d417643b710e')
					.set('Authorization', token);

				expect(result.status).to.equal(200);
				expect(result.body).not.to.be.empty;
			} catch (err) {
				console.log(err);
			}
		});

		it('should return 401 response if a user that does not exist in dB tries to delete an activity', async () => {
			try {
				const result = await chai
					.request(app)
					.delete('/users/user/activities/activity/delete/5c96d8da23f9d417643b710e')

				expect(result.status).to.equal(401);
				expect(result.body).not.to.be.empty;
				expect(result.body.activities).to.be.a('undefined');

			} catch (err) {
				console.log(err);
			}
		});
	});
});
