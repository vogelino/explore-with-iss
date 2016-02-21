const Deferred = require('deferred-js');
const request = require('request');
const constants = require('./constants');
let GEOjson = require('./staticData/counrtyShapes.min.json');
let Pics = require('./staticData/issPics-formatted.min.json');

const calls = {};
const demo = false;

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
			let issPosition = JSON.parse(data).iss_position;
			/* eslint-disable camelcase */
			if (demo === true) {
				console.log('SHOWING OVERRIDEN DATA FOR DEMO:', constants.DEMO_LAT_LNG);
				issPosition = constants.DEMO_LAT_LNG;
			}
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
					username: constants.GEONAMES.USERNAME
				});

			console.log('Calling Geonames API with url: ' + url);
			requestDeferred(url)
				.done((response) => {
					console.log('GEONAMES-SUCCESS:', response);
					const trimmedResponse = response.trim();
					const finalCountryCode = trimmedResponse.startsWith('ERR') ? null : trimmedResponse;
					dfd.resolve({
						latitude: data.latitude,
						longitude: data.longitude,
						countryCode: finalCountryCode
					});
				})
				.fail((err) => {
					console.log('GEONAMES-ERROR:', err);
					dfd.resolve({
						latitude: data.latitude,
						longitude: data.longitude,
						countryCode: null
					});
				});
		})
		.fail(dfd.reject);

	return dfd.promise();
};

calls.getCountryInfo = (countryCode) => {
	const mainDfd = new Deferred();
	const farooDfd = new Deferred();

	if (!countryCode) {
		return mainDfd.reject().promise();
	}

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
