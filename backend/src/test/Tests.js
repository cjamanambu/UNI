let chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../app');
const mongoose = require('mongoose');


chai.use(chaiHttp);
let token;
let id;

describe('Testing attending and unattending', () => {
	const signin = '/users/signin';

	const userCredentials = {
		email: 'yinka@myumanitoba.ca',
		password: 'yinka',
	};

	const activityToBeDeleted = {
		"attendance_list":[],
		"category":"HIP HOP",
		activity_datetime: "2019-03-24 11:11:11.334",
		max_attendance:1,
		description: "Nasir bin Jones",
		title: "GOAT talk",
		location: "Mars"
	};

	before(async () => {
		const result = await chai
			.request(app)
			.post(signin)
			.send(userCredentials);
		expect(result.status).to.equal(200);
		token = result.body.token;
	});

	// after all test have run we close our test database
	after('Close test db', async () => {
		await mongoose.connection.close();
	});

	it('should return a 200 response if the user is able to attend an activity', async () => {
		try {
		const result = await chai
			.request(app)
			.put('/activities/activity/attend/5c95786b6394943867f91cd0')
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
			.put('/activities/activity/unattend/5c97acbfc7c41320ba3ddaf5')
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
		expect(result.body.activities).to.be.a('null');

		} catch (err) {
			console.log(err);
		}
	});

	describe('tests for deleting an activity', async() => {
		// Create an activity so that we can delete it
		before(async () => {
			const result = await chai
				.request(app)
				.post('/activities/activity/create')
				.set('Authorization', token)
				.set('content-type', 'application/json')
				.send(activityToBeDeleted);
			expect(result.status).to.equal(200);
			id = result.body.activity.id

		});

		it('Should delete an activity by returning response 200', async () => {
			try {
				const result = await chai
					.request(app)
					.delete('/users/user/activities/activity/delete/' + id)
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
