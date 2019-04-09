# Mocha with Chai

#### To run the tests for the backend which were written in Mocha and Chai:

Navigate into /backend/src

Run the following command in backend/src to install the modules

`npm i --save-dev mocha chai chai-http nyc cross-env`

Do an npm install to install any dependencies:

`npm install`

To run the integration tests as well as unit tests, run the command

`NODE_ENV=testing npm run test`

NODE_ENV=testing is necessary to ensure that it uses the testing database to run the tests

## Documentation
More information can be found on
1. [Mocha](https://mochajs.org/)

2. [Chai](https://www.chaijs.com/)

