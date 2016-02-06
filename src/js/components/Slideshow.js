/* global Image */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';

class Slideshow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loadedImage: false
		};
	}
	componentWillReceiveProps(prevProps) {
		if (prevProps.selectedPicture !== this.props.selectedPicture) {
			this.setState({ loadedImage: false });
		}
	}
	render() {
		const { selectedPicture } = this.props;
		const { loadedImage } = this.state;
		if (Object.keys(selectedPicture).length === 0) {
			return false;
		}

		let picurl = selectedPicture.thumb.replace('thumb/', 'ESC/large/');
		if (!loadedImage) {
			this.loadImage.bind(this)(picurl,
				this.onImageLoaded.bind(this),
				this.onImageError.bind(this));
		}
		return (
			<div className={ loadedImage ? 'slideshow loaded' : 'slideshow'}>
				<div className="slideshow-content-wrapper">
					<div className="loading-icon"></div>
					<div
						className="loading-placeholder"
						style={{ backgroundImage: `url(${selectedPicture.thumb})` }}>
					</div>
					<div
						className="slideshow-content"
						style={ loadedImage ? { backgroundImage: `url(${loadedImage})` } : {}}>
					</div>
					<div
						onClick={this.closeGallery.bind(this)}
						className="close-button">
						×
					</div>
				</div>
			</div>
		);
	}
	loadImage(url, successHandler, failureHandler) {
		const image = new Image();
		image.addEventListener('load', (e) => {
			successHandler.bind(this)(e);
		}, true);
		image.addEventListener('error', (e) => {
			failureHandler.bind(this)(e);
		}, true);
		image.src = url;

		return image;
	}
	onImageLoaded(e) {
		this.setState({ loadedImage: e.target.src });
	}
	onImageError(e) {
		const url = e.target.src.replace('ESC/large/', 'ISD/lowres/');
		this.loadImage.bind(this)(url,
			this.onImageLoaded.bind(this),
			this.onTwiceLoadErrorTwice.bind(this));
	}
	onTwiceLoadErrorTwice(e) {
		this.setState({ loadedImage: false });
	}
	closeGallery() {
		const { actions } = this.props;
		actions.closeSlideshow();
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
};

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
		iss: state.dataVis.iss,
		countryColor: state.dataVis.countryColor,
		selectedPicture: state.dataVis.selectedPicture
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
)(Slideshow);
