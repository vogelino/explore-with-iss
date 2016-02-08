/* eslint-disable brace-style */
const calls = require('./calls');
const routes = {};

routes.default = (req, res) => {
	res.json({ message: 'Api connection successfully established' });
};

routes.getIssPosition = (req, res) => {
	calls.getIssPosition()
		.done((data) => { res.json(data); })
		.fail((error) => { res.send(error); });
};

routes.getIssCountry = (req, res) => {
	calls.getIssCountry()
		.done((data) => { res.json(data); })
		.fail((error) => { res.send(error); });
};

routes.getIssCountryCode = (req, res) => {
	calls.getIssCountryCode()
		.done((data) => { res.json(data); })
		.fail((error) => { res.send(error); });
};

routes.getCountryInfo = (req, res) => {
	calls.getCountryInfo(req.params.country_code)
		.done((data) => { res.json(data); })
		.fail((error) => { res.send(error); });
};

module.exports = routes;
