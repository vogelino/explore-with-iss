/* global fetch */
/* global window */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import MainMap from '../components/MainMap';
import Sidebar from '../components/Sidebar';
import Slideshow from '../components/Slideshow';
import Helmet from 'react-helmet';

class App extends Component {
	render() {
		const { isIssOverflyingCountry } = this.props;

		return (
			<div className={ isIssOverflyingCountry ? 'app has-country' : 'app'}>
				<Helmet
					title="Live position"
					titleTemplate="Explore with ISS - %s"
					meta={[
						{
							name: 'description',
							content: `A live data visualization to explore and discover` +
								`countries by following ISS in its route ` +
								`| © ${new Date().getFullYear()} vogelino.com`
						},
						{
							property: 'og:type',
							content: 'singlepage-webapp'
						}
					]}
				/>
				<MainMap />
				<Sidebar />
				<Slideshow />
			</div>
		);
	}
	componentDidMount() {
		if (typeof window !== 'undefined') {
			this.updateIssPosition(this.onFetchPositionDone.bind(this));
			this.updateIssCountry(this.onFetchCountryDone.bind(this));
			this.startTracking();
		}
	}
	updateIssPosition(cb) {
		return fetch(`/api/iss-country-code`)
			.then((response) => {
				response.json()
					.then(cb);
			})
			.catch(this.onFetchPositionFail.bind(this));
	}
	updateIssCountry(cb) {
		return fetch(`/api/iss-country`)
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
	onFetchPositionFail(error) {
		const { actions } = this.props;
		actions.defineIfIssPositionIdentified(false);
		actions.setIssPosition({});
		throw error;
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
	onFetchCountryFail(error) {
		const { actions } = this.props;
		actions.setCountryColor('#fff');
		actions.defineIfIssIsOverflyingCountry(false);
		actions.setCountryInfos({});
		actions.closeSlideshow();
		throw error;
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
