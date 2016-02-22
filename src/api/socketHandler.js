const express = require('express');
const calls = require('./calls');
const { UPDATE_FREQUENCY } = require('./constants');

let sockets = [];
let updateTimeout;
let isUpdating = false;
const { DEMO } = process.env;
const isDemo = DEMO === 'true';
const hiddenSockets = [];

const that = {};

that.emitToAllSockets = (eventName, data) => {
	sockets.forEach((socket) => {
		socket.originalInstance.emit(eventName, data);
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
			const hasToFetchCounrtyInfo = that.hasToFetchCounrtyInfo(countryCode);
			if (hasToFetchCounrtyInfo) {
				that.updateSocketsCoutries(countryCode);
				that.updateCountryInformations(countryCode);
			} else {
				that.updateWithDelay();
			}
			that.emitToAllSockets('issPositionUpdate', countryCodeRepsonse);
		});
};

that.hasToFetchCounrtyInfo = (country) => {
	if (!that.isValidCountry(country)) {
		return false;
	}
	const allSocketsSetToThisCountry = !sockets.every(socket => {
		console.log(`Socket country: ${socket.country} vs Actual country: ${country}`);
		return socket.country === country;
	});
	return allSocketsSetToThisCountry;
};

that.updateSocketsCoutries = (countryCode) => {
	sockets = sockets.map((socket) => {
		socket.country = countryCode;
		return socket;
	});
};

that.isValidCountry = (country) => {
	const valid = typeof country === 'string' && country.length === 2;
	if (!valid) {
		console.error('Invalid country ' + country);
	}
	return valid;
};

that.handleSockets = (io) => {
	io.sockets.on('connection', (newSocket) => {
		if (!isUpdating) {
			that.updateIssPosition();
		}
		const socketObject = {
			id: sockets.length,
			country: null,
			originalInstance: newSocket
		};
		sockets.push(socketObject);
		newSocket.on('disconnect', () => {
			sockets.splice(sockets.indexOf(socketObject), 1);
			if (sockets.length === 0) {
				that.stopUpdate();
			}
		});
		newSocket.on('windowHidden', () => {
			console.log('windowHidden event triggered from client');
			hiddenSockets.push(socketObject);
			if (hiddenSockets.length === sockets.length) {
				that.stopUpdate();
			}
		});
		newSocket.on('windowShown', () => {
			console.log('windowShown event triggered from client');
			hiddenSockets.splice(hiddenSockets.indexOf(socketObject), 1);
			that.updateIssPosition();
		});
	});
};

module.exports = {
	handleSockets: that.handleSockets
};
