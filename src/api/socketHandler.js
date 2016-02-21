const express = require('express');
const calls = require('./calls');
const { UPDATE_FREQUENCY } = require('./constants');

const sockets = [];
let updateTimeout;
let isUpdating = false;
let lastCounrtyCode;

const that = {};

that.emitToAllSockets = (eventName, data) => {
	sockets.forEach((socket) => {
		socket.emit(eventName, data);
	});
};

that.updateWithDelay = () => {
	isUpdating = true;
	updateTimeout = setTimeout(that.updateIssPosition, UPDATE_FREQUENCY);
};

that.stopUpdate = () => {
	isUpdating = false;
	clearTimeout(updateTimeout);
};

that.updateCountryInformations = (countryCodeRepsonse) => {
	const { latitude, longitude, countryCode } = countryCodeRepsonse;
	calls.getCountryInfo(countryCode)
		.done((data) => {
			that.emitToAllSockets('issPositionUpdate', { latitude, longitude });
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
			if (countryCode !== null && countryCode !== lastCounrtyCode) {
				lastCounrtyCode = countryCode;
				that.updateCountryInformations(countryCodeRepsonse);
			} else {
				that.emitToAllSockets('issPositionUpdate', countryCodeRepsonse);
				that.updateWithDelay();
			}
		});
};

that.handleSockets = (io) => {
	io.on('connection', (newSocket) => {
		if (!isUpdating) {
			that.updateIssPosition();
		}
		sockets.push(newSocket);
		io.on('disconnect', () => {
			sockets.splice(newSocket);
			if (sockets.length === 0) {
				that.stopUpdate();
			}
		});
	});
};

module.exports = {
	handleSockets: that.handleSockets
};
