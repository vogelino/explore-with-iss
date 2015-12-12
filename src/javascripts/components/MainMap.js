import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import L from 'leaflet'
import { Map, CircleMarker, Popup, TileLayer, GeoJson } from 'react-leaflet'

class MainMap extends Component {
	constructor(props) {
		super(props)

		this.state = {
			geoJson: false
		}
	}
	render() {
		const { iss, isTracking, country, geoJson,
			isIssPositionIdentified, isIssOverflyingCountry } = this.props
		const issPosition = isIssPositionIdentified ?
			[iss.latitude, iss.longitude] : [0, 0]

		const mapCenter = isTracking ? issPosition :
			( isIssOverflyingCountry ? country.latlng : issPosition)
		return (
			<div className="main-map">
				<Map
					center={mapCenter}
					zoom={4}
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
				</Map>
			</div>
		)
	}
	getGeoJsonLayer() {
		const { geoJson } = this.props
		if (Object.keys(geoJson).length === 0) return
		return (
			<GeoJson
				data={geoJson}
				className={this.getFeatureClass.bind(this)} />
		)
	}
	getFeatureClass(feature, layer) {
			debugger;
		const { country, isIssOverflyingCountry } = this.props
		if (!isIssOverflyingCountry || !country.name) return
		const isActive = feature.properties.ISO2.toUpperCase() === country.alphaCode2
		if (country) {
		}
		return [
			"country-borders",
			isActive ? 'active' : 'inactive'
		].join(' ')
	}
}

MainMap.propTypes = {
	country: PropTypes.object.isRequired,
	isTracking: PropTypes.bool.isRequired,
	isIssOverflyingCountry: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired,
	isIssPositionIdentified: PropTypes.bool.isRequired,
	geoJson: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
		iss: state.dataVis.iss,
		geoJson: state.dataVis.geoJson
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
