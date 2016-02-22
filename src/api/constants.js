module.exports = {
	OPEN_NOTIFY: {
		URL: 'http://api.open-notify.org/iss-now.json'
	},
	GEONAMES: {
		URL: 'http://api.geonames.org/',
		USERNAME: process.env.GEONAME_USER
	},
	RESTCOUNTRIES: {
		URL: 'https://restcountries.eu/rest/v1/name/__countryCode__?fullText=true'
	},
	FAROO: {
		URL: `http://www.faroo.com/api?q=__countryName__&kwic=true&start=1&length=' +
			'10&l=en&src=news&f=json&key=${process.env.FAROO_KEY}`
	},
	UPDATE_FREQUENCY: 1500,
	DEMO_LAT_LNG: { latitude: -7.364855, longitude: -48.432910 } // Brasil
};

