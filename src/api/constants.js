module.exports = {
	OPEN_NOTIFY: {
		URL: 'http://api.open-notify.org/iss-now.json'
	},
	GEONAMES: {
		URL: 'http://api.geonames.org/',
		USERNAME: 'vogelino',
		ERRORS: {
			NO_COUNTRY: 'ERR:15:no country code found\r\n'
		}
	},
	RESTCOUNTRIES: {
		URL: 'https://restcountries.eu/rest/v1/name/__countryCode__?fullText=true'
	},
	FAROO: {
		URL: 'http://www.faroo.com/api?q=__countryName__&kwic=true&start=1&length=' +
			'10&l=en&src=news&f=json&key=1hvrv5VKvO@dh472ujuO@PZMKH0_'
	}
};

