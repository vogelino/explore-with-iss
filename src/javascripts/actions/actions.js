import * as types from '../constants/ActionTypes'

export function setCountryInfos(infos) {
	return { type: types.SET_COUNTRY_INFOS, infos }
}

export function toggleTracking() {
	return { type: types.TOGGLE_TRACKING }
}

export function setIssPosition(position) {
	return { type: types.SET_ISS_POSITION, position }
}

export function defineIfIssPositionIdentified(isDefined) {
	return { type: types.DEFINE_IF_ISS_POSITION_IS_IDENTIFIED, isDefined }
}

export function defineIfIssIsOverflyingCountry(isOverflyingCountry) {
	return { type: types.DEFINE_IF_ISS_IS_OVERFLYING_COUNTRY, isOverflyingCountry }
}

export function setGeoJson(geoJson) {
	return { type: types.SET_GEO_JSON, geoJson }
}
