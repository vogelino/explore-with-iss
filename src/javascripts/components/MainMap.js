import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import d3 from 'd3'
import L from 'leaflet'
import { Map, CircleMarker, Popup, TileLayer, GeoJson } from 'react-leaflet'

let geoJsonLayerKey = 0
class MainMap extends Component {
	componentWillReceiveProps(prevProps) {
		if (!prevProps.country.name || !this.props.country.name) return
		if (prevProps.country.name !== this.props.country.name) {
			geoJsonLayerKey++
        }
	}
	render() {
		const zoomScale = d3.scale.linear()
			.domain([1000, 17075200])
			.range([6, 4])
		const { iss, isTracking, country, geoJson,
			isIssPositionIdentified, isIssOverflyingCountry, countryColor } = this.props
		const issPosition = isIssPositionIdentified ?
			[iss.latitude, iss.longitude] : [0, 0]

		const mapCenter = isTracking ? issPosition :
			( isIssOverflyingCountry ? country.latlng : issPosition)

		const pathStyles = `
			.leaflet-popup-content-wrapper {
				border: 1px solid ${countryColor};
			}
			.leaflet-popup-tip {
				background: ${countryColor};
			}
			.leaflet-container a.leaflet-popup-close-button {
				color: ${countryColor};
			}
			path.picture-position,
			path.country-borders {
				fill: ${countryColor};
				stroke: ${countryColor};
			}
		`
		return (
			<div className="main-map">
				<style>{pathStyles}</style>
				<Map
					center={country && country.latlng ? country.latlng : mapCenter}
					// center={mapCenter}
					zoom={country && country.latlng ? Math.floor(zoomScale(country.area)) : 4}
					dragging={false}
					scrollWheelZoom={false}
					zoomControl={false} >
					<TileLayer
						url='http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
						subdomains="abcd"
						maxZoom={19}
						attribution={false}
					/>
					{isIssPositionIdentified ?
						<CircleMarker
							className="iss-marker"
							center={issPosition}
							radius={5}>
						</CircleMarker> : false}
					{isIssOverflyingCountry && country.issPictures ?
						country.issPictures.map((pic) => {
							if (!!pic.lat || !!pic.lng) {
								return (
									<CircleMarker
										key={pic.id}
										className="picture-position"
										center={[pic.lat, pic.lng]}
										radius={3}>
										<Popup>
											<a
												href={pic.url}
												target="_blank"
												title={pic.id} >
												<img
													src={pic.thumb}
													alt={pic.id} />
											</a>
										</Popup>
									</CircleMarker>
								)
							}
						}) : false}
					{this.getGeoJsonLayer.bind(this)()}
				</Map>
			</div>
		)
	}
	getGeoJsonLayer() {
		const { country } = this.props
		const { geoJson } = country
		if (!geoJson || Object.keys(geoJson).length === 0) return false
		return (
			<GeoJson
				key={geoJsonLayerKey}
				data={geoJson}
				className="country-borders" />
		)
	}
}

MainMap.propTypes = {
	country: PropTypes.object.isRequired,
	isTracking: PropTypes.bool.isRequired,
	isIssOverflyingCountry: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired,
	isIssPositionIdentified: PropTypes.bool.isRequired,
	countryColor: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
		iss: state.dataVis.iss,
		countryColor: state.dataVis.countryColor
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
