const config = require('config');

module.exports = {
	OPEN_NOTIFY: {
		URL: 'http://api.open-notify.org/iss-now.json',
	},
	GEONAMES: {
		URL: 'http://api.geonames.org/countryCode?lat=__lat__&lng=__lng__&username=__username__',
		USERNAME: process.env.GEONAME_USER || config.get('apiCredentials.geoNames.user'),
	},
	RESTCOUNTRIES: {
		URL: 'https://restcountries.eu/rest/v1/name/__countryCode__?fullText=true',
	},
	FAROO: {
		URL: 'http://www.faroo.com/api?q=__countryName__&kwic=true&start=1&length=' +
			`10&l=en&src=news&f=json&key=${process.env.FAROO_KEY || config.get('apiCredentials.faroo.key')}`,
	},
	UPDATE_FREQUENCY: 1500,
	DEMO_LAT_LNG: {
		latitude: process.env.DEMO_LAT || -7.364855,
		longitude: process.env.DEMO_LNG || -48.432910,
	}, // Brasil
};

