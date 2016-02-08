const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('./config');
const auth = require('./auth');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;

// taken from here
// https://github.com/passport/express-3.x-http-basic-example
passport.use(new Strategy(
	function(username, password, cb) {
		auth.findByUsername(username, function(err, user) {
			if (err) {
				return cb(err);
			}
			if (!user) {
				return cb(null, false);
			}
			if (user.password !== password) {
				return cb(null, false);
			}
			return cb(null, user);
		});
	}));

const api = express();
const apiPort = config.api.port || 8080;
/* eslint-disable new-cap */
const apiRouter = express.Router();
/* eslint-enable new-cap */

// API Middlewares
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(cors());

// API routes
apiRouter.get('/', routes.default);
apiRouter.route('/iss-position')
	.get(routes.getIssPosition);
apiRouter.route('/iss-country-code')
	.get(routes.getIssCountryCode);
apiRouter.route('/iss-country')
	.get(routes.getIssCountry);
apiRouter.route('/iss-country/:country_code')
	.get(routes.getCountryInfo);

// Assigning router to Api
api.use('/', apiRouter);

// Starting the Api server
api.listen(apiPort);
console.log(`App server started listening on port ${apiPort}`);

module.exports = api;
