import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class MainMap extends Component {
	render() {
		if (this.props.country.name === 'Loading')
			return <div>this.props.country.name</div>

		return this.getMap.bind(this)()
	}
	getMap() {
		const issPosition = [this.props.iss.latitude, this.props.iss.longitude]
		const countryPosition = this.props.country.latlng
		const mapCenter = this.props.isTracking ? issPosition : countryPosition;
		return (
			<div className="main-map">
				<Map center={mapCenter} zoom={3}>
					<TileLayer
						url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
						attribution=''
					/>
					<Marker position={issPosition}>
						<Popup>
							<span>Iss.</span>
						</Popup>
					</Marker>
				</Map>
			</div>
		)
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
