import { SET_COUNTRY, UPDATE_ISS, TOGGLE_TRACKING } from '../constants/ActionTypes'

const initialState = {
	country: {
		name: 'loading country',
		code: '-',
		lat: 0,
		lon: 0,
		infos: [
			{ 'Capital': '-' },
			{ 'Official languages': ['-'] },
			{ 'Population': '-' },
			{ 'Area': '-' },
			{ 'GDP': '-' },
			{ 'Currency': '-' },
			{ 'Timezone': '-' }
		],
		nextPass: 0,
		issPhotos: [
			{
				title: 'loading photos',
				url: '-'
			}
		],
		news: [
			{
				title: 'loading news',
				url: '-'
			}
		]
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