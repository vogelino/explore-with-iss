const express = require('express');
const calls = require('./calls');
const { UPDATE_FREQUENCY } = require('./constants');

const sockets = [];
let updateTimeout;
let isUpdating = false;
let lastCounrtyCode = 'initial';
const { DEMO } = process.env;
const isDemo = !!DEMO;
const hiddenSockets = [];

const that = {};

that.emitToAllSockets = (eventName, data) => {
	sockets.forEach((socket) => {
		socket.emit(eventName, data);
	});
};

that.updateWithDelay = () => {
	if (isDemo || hiddenSockets.length === sockets.length) {
		return;
	}
	isUpdating = true;
	updateTimeout = setTimeout(that.updateIssPosition, UPDATE_FREQUENCY);
};

that.stopUpdate = () => {
	isUpdating = false;
	clearTimeout(updateTimeout);
};

that.updateCountryInformations = (countryCode) => {
	calls.getCountryInfo(countryCode)
		.done((data) => {
			that.emitToAllSockets('issCountryUpdate', data);

			that.updateWithDelay();
		});
};

that.updateIssPosition = () => {
	if (updateTimeout) {
		that.stopUpdate();
	}
	calls.getIssCountryCode()
		.done((countryCodeRepsonse) => {
			const { countryCode } = countryCodeRepsonse;
			const hasToFetchCounrtyInfo = that.hasToFetchCounrtyInfo(lastCounrtyCode, countryCode);
			if (hasToFetchCounrtyInfo) {
				lastCounrtyCode = countryCode;
				that.updateCountryInformations(countryCode);
			}
			that.emitToAllSockets('issPositionUpdate', countryCodeRepsonse);
			that.updateWithDelay();
		});
};

that.hasToFetchCounrtyInfo = (countryBefore, countryNow) => {
	const countryBeforeIsValid = that.isValidCountry(countryBefore);
	const countryNowIsValid = that.isValidCountry(countryNow);
	return !countryBeforeIsValid && countryNowIsValid ? true : false;
};

that.isValidCountry = country =>
	typeof country === 'string' && country.length === 2;

that.handleSockets = (io) => {
	io.sockets.on('connection', (newSocket) => {
		if (!isUpdating) {
			that.updateIssPosition();
		}
		sockets.push(newSocket);
		newSocket.on('disconnect', () => {
			sockets.splice(sockets.indexOf(newSocket), 1);
			if (sockets.length === 0) {
				that.stopUpdate();
			}
		});
		newSocket.on('windowHidden', () => {
			hiddenSockets.push(newSocket);
		});
		newSocket.on('windowShown', () => {
			hiddenSockets.splice(hiddenSockets.indexOf(newSocket), 1);
		});
	});
};

module.exports = {
	handleSockets: that.handleSockets
};
