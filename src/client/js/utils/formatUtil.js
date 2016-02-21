import languages from '../constants/Languages';
const formatter = {};

const escapeRegExp = (str) => {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
};
const replaceAll = (str, find, replace) => {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

const formatNumber = (number) => {
	number = number.toFixed(2) + '';
	var x = number.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};


const formatTimezone = (timezone) => {
	let isPos = true;
	let timezonePure = replaceAll(timezone, '0', '')
		.replace('UTC', '')
		.replace(':', '');

	if (timezonePure.indexOf('−') >= 0) {
		isPos = false;
	}

	timezonePure = timezonePure
		.replace('+', '')
		.replace('−', '');

	timezonePure = parseInt(timezonePure, 10);

	return isPos ? timezonePure : timezonePure * -1;
};


const formatLanguage = (code) => {
	return languages[code] || code;
};

module.exports = { formatNumber, formatTimezone, formatLanguage };
