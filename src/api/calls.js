const Deferred = require('deferred-js');
const request = require('request');
const constants = require('./constants');
let GEOjson = require('./staticData/counrtyShapes.min.json');
let Pics = require('./staticData/issPics-formatted.min.json');

const calls = {};
const { NODE_ENV, DEMO } = process.env;
const isDemo = DEMO === 'true';
const isDevelopment = NODE_ENV === 'development';

const requestDeferred = (url) => {
	const dfd = new Deferred();

	request(url, (err, response, body) => {
		if (!err && response.statusCode === 200) {
			dfd.resolve(body);
		}
		if (!err && response.statusCode !== 200) {
			dfd.reject(body);
		} else {
			dfd.reject(err);
		}
	});

	return dfd.promise();
};

calls.getIssPosition = () => {
	const dfd = new Deferred();

	if (isDemo) {
		console.log('SHOWING OVERRIDEN DATA FOR DEMO:', constants.DEMO_LAT_LNG);
		const issPosition = constants.DEMO_LAT_LNG;

		return dfd.resolve({
			latitude: issPosition.latitude,
			longitude: issPosition.longitude
		}).promise();
	}

	console.log('Fetching iss position');
	requestDeferred(constants.OPEN_NOTIFY.URL)
		.done((data) => {
			/* eslint-disable camelcase */
			let issPosition = JSON.parse(data).iss_position;
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
			const url = constants.GEONAMES.URL
				.replace('__lat__', data.latitude)
				.replace('__lng__', data.longitude)
				.replace('__username__', constants.GEONAMES.USERNAME);

			console.log('Fetching the country code');
			requestDeferred(url)
				.done((response) => {
					const trimmedResponse = response.trim();
					const finalCountryCode = trimmedResponse.startsWith('ERR') ? null : trimmedResponse;
					console.log('Country code:', finalCountryCode);
					dfd.resolve({
						latitude: data.latitude,
						longitude: data.longitude,
						countryCode: finalCountryCode
					});
				})
				.fail((err) => {
					console.log('Country code error:', err);
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

	if (isDevelopment) {
		console.log('Fetching country Informations');
	}

	requestDeferred(restCtryUrl)
		.done((response) => {
			const data = JSON.parse(response)[0];
			const farooUrl = constants.FAROO.URL
				.replace('__countryName__', data.name);

			console.log('Fetching news');
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

					console.log('News successfully fetched');
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
