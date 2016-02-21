const express = require('express');
const routes = require('./routes');
const config = require('./config');

/* eslint-disable new-cap */
const apiRouter = express.Router();
/* eslint-enable new-cap */

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

module.exports = apiRouter;
