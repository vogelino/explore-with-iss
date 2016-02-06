import * as actionTypes from '../constants/ActionTypes';

const initialState = {
	country: {},
	isTracking: true,
	iss: {},
	isIssOverflyingCountry: false,
	isIssPositionIdentified: false,
	countryColor: '#fff',
	selectedPicture: {}
};

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

		case actionTypes.TOGGLE_TRACKING:
			return Object.assign({}, state, { isTracking: !state.isTracking });

		case actionTypes.SET_COUNTRY_COLOR:
			return Object.assign({}, state, { countryColor: action.color });

		case actionTypes.OPEN_SLIDESHOW:
			return Object.assign({}, state, { selectedPicture: action.picture });

		case actionTypes.CLOSE_SLIDESHOW:
			return Object.assign({}, state, { selectedPicture: {} });

		default:
			return state;
	}
}
