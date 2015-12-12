import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'

class RoutePlayer extends Component {
	render() {
		const trackingBtnText = this.props.isTracking ?
			'Stay at this position' : 'Catch up the iss'
		return (
			<div className="route-player">
				{this.props.isTracking ? 'Tracking' : 'Paused'}
				<button onClick={this.props.actions.toggleTracking}>{trackingBtnText}</button>
			</div>
		)
	}
}

RoutePlayer.propTypes = {
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
)(RoutePlayer)
