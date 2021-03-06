import * as actionTypes from '../constants/ActionTypes';
import initialState from './initialState';

export default function dataVis(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_COUNTRY_INFOS:
			return Object.assign({}, state, { country: action.infos });

		case actionTypes.SET_ISS_POSITION:
			return Object.assign({}, state, { iss: action.position });

		case actionTypes.DEFINE_IF_ISS_POSITION_IS_IDENTIFIED:
			return Object.assign({}, state,
				{ isIssPositionIdentified: action.isDefined });

		case actionTypes.DEFINE_IF_ISS_IS_OVERFLYING_COUNTRY:
			return Object.assign({}, state,
				{ isIssOverflyingCountry: action.isOverflyingCountry });

		case actionTypes.SET_COUNTRY_COLOR:
			return Object.assign({}, state, { countryColor: action.color });

		case actionTypes.OPEN_SLIDESHOW:
			return Object.assign({}, state, { selectedPicture: action.picture });

		case actionTypes.CLOSE_SLIDESHOW:
			return Object.assign({}, state, { selectedPicture: {} });

		case actionTypes.OPEN_ABOUT:
			return Object.assign({}, state, { isAboutOpen: true });

		case actionTypes.CLOSE_ABOUT:
			return Object.assign({}, state, { isAboutOpen: false });

		default:
			return state;
	}
}
