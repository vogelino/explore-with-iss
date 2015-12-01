import { SET_COUNTRY, TOGGLE_TRACKING } from '../constants/ActionTypes'

const initialState = {
	country: {
		name: 'germany',
		code: 'DE',
		lat: 52.5167,
		lon: 13.3833,
		infos: [
			{ 'Capital': 'Berlin' },
			{ 'Official languages': ['German'] },
			{ 'Population': '81,083,600' },
			{ 'Area': '357,168 km2' },
			{ 'GDP': '$3.842 trillion' },
			{ 'Currency': 'Euro (€)(EUR)' },
			{ 'Timezone': 'CET (UTC+1)' }
		],
		nextPass: 1449000576,
		issPhotos: [
			{
				title: 'Moon',
				url: 'https://c1.staticflickr.com/1/292/20228269321_acc50f8c29_b.jpg'
			}
		],
		news: [
			{
				title: 'German astronaut calls for \'peace and tolerance\'',
				url: 'http://www.thelocal.de/20151120/german-astronaut-calls-for-peace-and-tolerance'
			}
		]
	},
	isTracking: false,
	iss: {
		lat: 0,
		lon: 0
	}
}

export default function dataVis(state = initialState, action) {
	switch (action.type) {
		case SET_COUNTRY:
			return Object.assign({}, state, { country: action.country })

		case TOGGLE_TRACKING:
			return Object.assign({}, state, { isTracking: !state.isTracking })

		default:
			return state
	}
}