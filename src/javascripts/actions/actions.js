import * as types from '../constants/ActionTypes'

export function setCountry(country) {
	return { type: types.SET_COUNTRY, country }
}

export function toggleTracking() {
	return { type: types.TOGGLE_TRACKING }
}

export function updateIss(iss) {
	return { type: types.UPDATE_ISS, iss }
}
