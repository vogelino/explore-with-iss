import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'

class Slideshow extends Component {
	render() {
		const { selectedPicture } = this.props;
		if (Object.keys(selectedPicture).length === 0) return false

		const picurl = selectedPicture.thumb.replace('thumb/', 'ESC/large/')
		return (
			<div className="slideshow">
				<div className="slideshow-content-wrapper">
					<div className="loading-icon"></div>
					<div
						className="slideshow-content"
						style={{ backgroundImage: `url(${picurl})` }}>
					</div>
					<div
						onClick={this.closeGallery.bind(this)}
						className="close-button">
						×
					</div>
				</div>
			</div>
		)
	}
	closeGallery() {
		const { actions } = this.props
		actions.closeSlideshow()
	}
}

Slideshow.propTypes = {
	country: PropTypes.object.isRequired,
	isTracking: PropTypes.bool.isRequired,
	isIssOverflyingCountry: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired,
	isIssPositionIdentified: PropTypes.bool.isRequired,
	countryColor: PropTypes.string.isRequired,
	selectedPicture: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
		iss: state.dataVis.iss,
		countryColor: state.dataVis.countryColor,
		selectedPicture: state.dataVis.selectedPicture
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
)(Slideshow)
