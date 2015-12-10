import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import L from 'leaflet'
import { Map, CircleMarker, Popup, TileLayer, GeoJson } from 'react-leaflet'

class MainMap extends Component {
	render() {
		const { iss, isTracking, country,
			isIssPositionIdentified, isIssOverflyingCountry } = this.props
		const issPosition = isIssPositionIdentified ?
			[iss.latitude, iss.longitude] : [0, 0]

		const doesCountryHaveGeoData = !!country.geoJson
		const mapCenter = isTracking ? issPosition :
			( isIssOverflyingCountry ? country.latlng : issPosition)
		return (
			<div className="main-map">
				<Map
					center={mapCenter}
					zoom={5}
					dragging={false}
					scrollWheelZoom={false}
					zoomControl={false} >
					<TileLayer
						url='http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
						subdomains="abcd"
						attribution={false}
					/>
					{isIssPositionIdentified ?
						<CircleMarker
							className="iss-marker"
							center={issPosition}
							radius={5}>
						</CircleMarker> : ''}
					{ isIssOverflyingCountry && doesCountryHaveGeoData ?
						<GeoJson data={country.geoJson} className="country-borders"/> : '' }
				</Map>
			</div>
		)
	}
}

MainMap.propTypes = {
	country: PropTypes.object.isRequired,
	isTracking: PropTypes.bool.isRequired,
	isIssOverflyingCountry: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired,
	isIssPositionIdentified: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
		iss: state.dataVis.iss
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainMap)
