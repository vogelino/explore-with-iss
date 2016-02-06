/* global fetch */
/* global window */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import MainMap from '../components/MainMap';
import Sidebar from '../components/Sidebar';
import Slideshow from '../components/Slideshow';

const user = 'vogelino';
const psw = 'KRzj34YNxAVwKuoSfs6Z5Z3H3BYWu4OgzCjajLXp';
const host = 'interface.fh-potsdam.de';
const port = 'interface.fh-potsdam.de';
const API_URL = `https://${user}:${psw}@${host}:${port}/explore-with-iss-api`;

class App extends Component {
	render() {
		const { isIssOverflyingCountry } = this.props;

		return (
			<div className={ isIssOverflyingCountry ? 'app has-country' : 'app'}>
				<MainMap />
				<Sidebar />
				<Slideshow />
			</div>
		);
	}
	componentDidMount() {
		this.updateIssPosition(this.onFetchPositionDone.bind(this));
		this.updateIssCountry(this.onFetchCountryDone.bind(this));
		this.startTracking();
	}
	updateIssPosition(cb) {
		return fetch(`${API_URL}/api/iss-country-code`)
			.then((response) => {
				response.json()
					.then(cb);
			})
			.catch(this.onFetchPositionFail.bind(this));
	}
	updateIssCountry(cb) {
		return fetch(`${API_URL}/api/iss-country`)
			.then((response) => {
				response.json()
					.then(cb);
			})
			.catch(this.onFetchCountryFail.bind(this));
	}
	onFetchPositionDone(data) {
		const { actions } = this.props;
		if (data.status) {
			this.onFetchPositionFail.bind(this)();
		} else {
			actions.setIssPosition(data);
			actions.defineIfIssPositionIdentified(true);
		}
		return data;
	}
	onFetchPositionFail() {
		const { actions } = this.props;
		actions.defineIfIssPositionIdentified(false);
		actions.setIssPosition({});
	}
	onFetchCountryDone(data) {
		const { actions } = this.props;
		if (data.status) {
			this.onFetchCountryFail.bind(this)();
		} else {
			actions.setCountryInfos(data);
			actions.defineIfIssIsOverflyingCountry(true);
		}
		return data;
	}
	onFetchCountryFail() {
		const { actions } = this.props;
		actions.setCountryColor('#fff');
		actions.defineIfIssIsOverflyingCountry(false);
		actions.setCountryInfos({});
		actions.closeSlideshow();
	}
	trackIss() {
		this.updateIssPosition(this.checkAndUpdate.bind(this));
	}
	checkAndUpdate(data) {
		if (data.status) {
			return;
		}
		this.onFetchPositionDone.bind(this)(data);
		if (this.props.country.alpha2Code !== this.props.iss.countryCode) {
			this.updateIssCountry(this.onFetchCountryDone.bind(this));
		}
	}
	startTracking() {
		this.stopTracking();
		this.setState({
			issInterval: window.setInterval(this.trackIss.bind(this), 2000)
		});
	}
	stopTracking() {
		if (this.state && this.state.issInterval) {
			this.state.issInterval = window.clearInterval(this.state.issInterval);
		}
	}
}

App.propTypes = {
	country: PropTypes.object.isRequired,
	isTracking: PropTypes.bool.isRequired,
	isIssOverflyingCountry: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired,
	isIssPositionIdentified: PropTypes.bool.isRequired,
	countryColor: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
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
