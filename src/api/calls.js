const Deferred = require('deferred-js');
const request = require('request');
const d3 = require('d3');
const constants = require('./constants');
const GEOjson = JSON.parse(require('./staticData/counrtyShapes.min.json'));
const Pics = JSON.parse(require('./staticData/issPics-formatted.min.json'));

const calls = {};

const requestDeferred = (url) => {
	const dfd = new Deferred();

	request(url, (err, response, body) => {
		if (!err && response.statusCode === 200) {
			console.info('Success:', body);
			dfd.resolve(body);
		}
		if (!err && response.statusCode !== 200) {
			console.error('Error:', body);
			dfd.reject(body);
		} else {
			console.error('Error:', err);
			dfd.reject(err);
		}
	});

	return dfd.promise();
};

const constructParameters = (parameters) => {
	return Object.keys(parameters).reduce((prevKey, currentKey, index) => {
		return (index === 1 ? prevKey + '=' + parameters[prevKey] + '&' : prevKey + '&') +
			currentKey + '=' + parameters[currentKey];
	});
};

const constructUrl = (baseUrl, parameters) => {
	return baseUrl + '?' + constructParameters(parameters);
};

calls.getIssPosition = () => {
	const dfd = new Deferred();

	requestDeferred(constants.OPEN_NOTIFY.URL)
		.done((data) => {
			/* eslint-disable camelcase */
			const issPosition = JSON.parse(data).iss_position;
			/* eslint-disable camelcase */
			dfd.resolve({
				latitude: issPosition.latitude,
				longitude: issPosition.longitude
			});
		})
		.fail(dfd.reject);

	return dfd.promise();
};

calls.getIssCountry = () => {
	const dfd = new Deferred();

	calls.getIssCountryCode()
		.done((response) => {
			calls.getCountryInfo(response.countryCode)
				.done(dfd.resolve)
				.fail(dfd.reject);
		})
		.fail(dfd.reject);

	return dfd.promise();
};

calls.getIssCountryCode = () => {
	const dfd = new Deferred();

	calls.getIssPosition()
		.done((data) => {
			const url = constructUrl(
				constants.GEONAMES.URL + 'countryCode', {
					lat: data.latitude,
					lng: data.longitude,

					// Bosnia Herzegowina
					// lat: 43.8937019,
					// lng: 18.3129517,

					// Republic dominicana
					// lat: 18.6976745,
					// lng: -71.2860744,

					// Iran
					// lat: 34.6000,
					// lng: 58.3833,

					// USA
					// lat: 36.2124142,
					// lng: -113.7106819,

					// Russia
					// lat: 68.667776,
					// lng: 105.147298,

					// Brasil
					// lat: -7.364855,
					// lng: -48.432910,

					// Turkey
					// lat: 41.306946,
					// lng: 28.286867,

					// Norway
					// lat: 61.271865,
					// lng: 9.572650,

					// Sweden
					// lat: 59.878667,
					// lng: 16.801858,

					// Danemark
					// lat: 56.133199,
					// lng: 9.276590,

					username: constants.GEONAMES.USERNAME
				});

			console.log('Calling Geonames API with url: ' + url);
			requestDeferred(url)
				.done((response) => {
					console.log('GEONAMES-SUCCESS:', response);
					dfd.resolve({
						latitude: data.latitude,
						longitude: data.longitude,
						countryCode: response.trim()
					});
				})
				.fail((err) => {
					console.log('GEONAMES-ERROR:', err);
					dfd.reject(err);
				});
		})
		.fail(dfd.reject);

	return dfd.promise();
};

calls.getCountryInfo = (countryCode) => {
	const mainDfd = new Deferred();
	const farooDfd = new Deferred();

	const countryFeature = GEOjson.features.filter((feature) =>
		feature.properties.ISO2.toUpperCase() === countryCode.toUpperCase())[0];

	const pictures = Pics.filter((pic) =>
		pic.countryCode.toUpperCase() === countryCode.toUpperCase());

	const restCtryUrl = constants.RESTCOUNTRIES.URL
		.replace('__countryCode__', countryCode);
	console.log('Calling RestCountries API with url: ' + restCtryUrl);
	requestDeferred(restCtryUrl)
		.done((response) => {
			const data = JSON.parse(response)[0];
			const farooUrl = constants.FAROO.URL
				.replace('__countryName__', data.name);

			console.log('Calling Faroo API with url: ' + farooUrl);
			requestDeferred(farooUrl)
				.done((farooResponse) => {
					const news = JSON.parse(farooResponse).results;
					farooDfd.resolve(news);
				})
				.fail(() => {
					farooDfd.resolve([]);
				});

			Deferred.when(farooDfd)
				.then((farooResponse) => {
					data.geoJson = countryFeature ? countryFeature : null;
					data.news = farooResponse;
					data.issPictures = pictures ? pictures : [];

					console.log('Resolving data:', data);
					mainDfd.resolve(data);
				})
				.fail(() => {
					mainDfd.resolve(data);
				});
		})
		.fail(mainDfd.reject);

	return mainDfd.promise();
};

module.exports = calls;
