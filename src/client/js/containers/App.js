/* global fetch */
/* global window */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import MainMap from '../components/MainMap';
import Sidebar from '../components/Sidebar';
import Slideshow from '../components/Slideshow';
import MetaTags from '../components/MetaTags';

class App extends Component {
	render() {
		const { isIssOverflyingCountry } = this.props;

		return (
			<div className={ isIssOverflyingCountry ? 'app has-country' : 'app'}>
				<MetaTags />
				<MainMap />
				<Sidebar />
				<Slideshow />
			</div>
		);
	}
	componentDidMount() {
		if (typeof window !== 'undefined') {
			const { actions } = this.props;
			const socket = window.io();
			socket.on('issPositionUpdate', (positionResponse) => {
				const { latitude, longitude, countryCode } = positionResponse;

				if (!!latitude && !!longitude) {
					actions.setIssPosition({ latitude, longitude });
					actions.defineIfIssPositionIdentified(true);
				} else {
					actions.setIssPosition({});
					actions.closeSlideshow();
					actions.defineIfIssPositionIdentified(false);
				}

				if (countryCode === null) {
					actions.setCountryInfos({});
					actions.closeSlideshow();
					actions.setCountryColor('#000');
					actions.defineIfIssIsOverflyingCountry(false);
				}
			});
			socket.on('issCountryUpdate', (data) => {
				actions.setCountryInfos(data);
				actions.defineIfIssIsOverflyingCountry(true);
			});
		}
	}
}

App.propTypes = {
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
)(App);
