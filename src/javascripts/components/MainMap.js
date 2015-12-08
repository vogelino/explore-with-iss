import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import L from 'leaflet'
import { Map, Marker, Popup, TileLayer, GeoJson } from 'react-leaflet'

class MainMap extends Component {
	constructor(props) {
		super(props)

		this.state = {
			zoom: 3,
			center: this.props.country.latlng
		}
	}
	render() {
		if (this.props.country.name === 'Loading')
			return <div>this.props.country.name</div>

		return this.getMap.bind(this)()
	}
	getMap() {
		const { zoom, center } = this.state
		const { iss, isTracking, country } = this.props

		const IssIcon = L.Icon.extend({
			iconSize: [60, 32],
			iconAnchor: [30, 16]
		})
		const issPosition = [iss.latitude, iss.longitude]
		const mapCenter = isTracking ? issPosition : center
		const geoJsonData = country.geoJson
		return (
			<div className="main-map">
				<Map
					center={mapCenter}
					zoom={this.state.zoom}
					minZoom={2}
					onLeafletDragend={this.handleDragend.bind(this)}
					onLeafletZoomend={this.handleZoomend.bind(this)} >
					<TileLayer
						url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
						attribution=''
					/>
					<Marker
						position={issPosition}
						icon={new IssIcon({
							iconUrl: 'https://www.calsky.com/observer/icons/icon-iss3.png'
						})}>
					</Marker>
					{ !!geoJsonData ? <GeoJson data={geoJsonData} className="country-borders"/> : '' }
				</Map>
			</div>
		)
	}
	handleZoomend(e) {
		this.setState({
			zoom: e.target._zoom
		})
	}
	handleDragend(e) {
		const { isTracking, actions } = this.props
		if (isTracking)
			actions.toggleTracking()

		const map = e.target
		const centerPoint = map._getMapPanePos()
		const latLng = map.containerPointToLatLng(centerPoint)
		this.setState({
			center: [latLng.lat, latLng.lng]
		})
	}
}

MainMap.propTypes = {
	country: PropTypes.object.isRequired,
	isTracking: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
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
