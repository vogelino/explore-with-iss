import { SET_COUNTRY, UPDATE_ISS, TOGGLE_TRACKING } from '../constants/ActionTypes'

const initialState = {
	country: {
		name: 'Loading Country',
		capital: 'Loading',
		population: 18006407,
		latlng: [-30, -71],
		area: 756102,
		gini: 52.1,
		timezones: [],
		borders: [],
		nativeName: 'Loading',
		alpha2Code: '...',
		currencies: ['...', '...'],
		languages: ['...'],
		geoJson: false
	},
	isTracking: false,
	iss: {
		latitude: 0,
		longitude: 0
	}
}

export default function dataVis(state = initialState, action) {
	switch (action.type) {
		case SET_COUNTRY:
			return Object.assign({}, state, { country: action.country })

		case UPDATE_ISS:
			return Object.assign({}, state, { iss: action.iss })

		case TOGGLE_TRACKING:
			return Object.assign({}, state, { isTracking: !state.isTracking })

		default:
			return state
	}
}