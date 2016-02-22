import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import * as constants from '../constants/MapConstants';
import d3 from 'd3';

let geoJsonLayerKey = 0;
class MainMap extends Component {
	componentWillReceiveProps(prevProps) {
		if (!prevProps.country.name || !this.props.country.name) {
			return;
		}
		if (prevProps.country.name !== this.props.country.name) {
			geoJsonLayerKey++;
		}
	}
	render() {
		if (typeof window !== 'undefined') {
			return this.getMap.bind(this)();
		}
		return <div className="loading-indicator"></div>;
	}
	getMap() {
		const L = require('leaflet');
		const { Map, CircleMarker, Popup, TileLayer, GeoJson } = require('react-leaflet');
		const zoomScale = this.getZoomScale();
		const { iss, country, geoJson,
			isIssPositionIdentified, isIssOverflyingCountry, countryColor } = this.props;
		const issPosition = isIssPositionIdentified ?
			[ iss.latitude, iss.longitude ] : [ 0, 0 ];

		return (
			<div className="main-map">
				<style>{this.getPathStyles(countryColor)}</style>
				<Map
					center={country && country.latlng ? country.latlng : issPosition}
					zoom={country && country.latlng ? Math.floor(zoomScale(country.area)) : 4}
					dragging={constants.MAP_DRAGGING}
					scrollWheelZoom={constants.MAP_SCROLL_WHEEL_ZOOM}
					zoomControl={constants.MAP_ZOOM_CONTROL} >
					<TileLayer
						url='http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
						subdomains="abcd"
						maxZoom={constants.MAP_MAX_ZOOM}
						attribution={constants.MAP_ATTRIBUTION}
					/>
					{isIssPositionIdentified ?
						<CircleMarker
							className="iss-marker"
							center={issPosition}
							radius={constants.ISS_MARKER_RADIUS}>
						</CircleMarker> : false}
					{isIssOverflyingCountry && country.issPictures ?
						country.issPictures.map((pic) => {
							if (!!pic.lat || !!pic.lng) {
								this.getPicMarker(pic, CircleMarker, Popup);
							}
						}) : false}
					{this.getGeoJsonLayer.bind(this)(GeoJson)}
				</Map>
			</div>
		);
	}
	getZoomScale() {
		return d3.scale.linear()
			.domain(constants.MAP_SCALE_DOMAIN)
			.range(constants.MAP_SCALE_RANGE);
	}
	getPathStyles(color) {
		return `
			.leaflet-popup-content-wrapper {
				border: 1px solid ${color};
			}
			.leaflet-popup-tip {
				background: ${color};
			}
			.leaflet-container a.leaflet-popup-close-button,
			.slideshow .close-button {
				color: ${color};
			}
			path.picture-position,
			path.country-borders {
				fill: ${color};
				stroke: ${color};
			}
			.picture.active {
				box-shadow: inset 0 0 0 2px ${color};
			}
		`;
	}
	getPicMarker(pic, CircleMarker, Popup) {
		return (
			<CircleMarker
				key={pic.id}
				className="picture-position"
				center={[ pic.lat, pic.lng ]}
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
		);
	}
	getGeoJsonLayer(GeoJson) {
		const { country } = this.props;
		const { geoJson } = country;
		if (!geoJson || Object.keys(geoJson).length === 0) {
			return false;
		}
		return (
			<GeoJson
				key={geoJsonLayerKey}
				data={geoJson}
				className="country-borders" />
		);
	}
}

MainMap.propTypes = {
	country: PropTypes.object.isRequired,
	isIssOverflyingCountry: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired,
	isIssPositionIdentified: PropTypes.bool.isRequired,
	countryColor: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
		iss: state.dataVis.iss,
		countryColor: state.dataVis.countryColor
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainMap);
