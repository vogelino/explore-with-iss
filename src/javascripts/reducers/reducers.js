import * as actionTypes from '../constants/ActionTypes'

const initialState = {
	country: {},
	isTracking: false,
	iss: {},
	isIssOverflyingCountry: false,
	isIssPositionIdentified: false
}

export default function dataVis(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_COUNTRY_INFOS:
			return Object.assign({}, state, { country: action.infos })

		case actionTypes.SET_ISS_POSITION:
			return Object.assign({}, state, { iss: action.position })

		case actionTypes.DEFINE_IF_ISS_POSITION_IS_IDENTIFIED:
			return Object.assign({}, state,
				{ isIssPositionIdentified: action.isDefined })

		case actionTypes.DEFINE_IF_ISS_IS_OVERFLYING_COUNTRY:
			return Object.assign({}, state,
				{ isIssOverflyingCountry: action.isOverflyingCountry })

		case actionTypes.TOGGLE_TRACKING:
			return Object.assign({}, state, { isTracking: !state.isTracking })

		default:
			return state
	}
}