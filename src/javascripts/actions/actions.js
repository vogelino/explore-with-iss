import * as types from '../constants/ActionTypes'

export function setCity(country) {
	return { type: types.SET_COUNTRY, country }
}

export function toggleTracking() {
	return { type: types.TOGGLE_TRACKING }
}
