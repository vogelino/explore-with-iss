import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import MainMap from '../components/MainMap'
import Sidebar from '../components/Sidebar'
import RoutePlayer from '../components/RoutePlayer'

class App extends Component {
	render() {
		const { country, isTracking, iss, actions } = this.props;
		return (
			<div className="app">
				<MainMap />
				<Sidebar />
				<RoutePlayer />
			</div>
		)
	}
	componentDidMount() {
		this.updateIssPosition(this.onFetchPositionDone.bind(this))
		this.updateIssCountry(this.onFetchCountryDone.bind(this))
		this.startTracking()
	}
	updateIssPosition(cb) {
		return fetch('http://localhost:8080/api/iss-country-code')
			.then((response) => {
				response.json()
					.then(cb)
			})
	}
	updateIssCountry(cb) {
		return fetch('http://localhost:8080/api/iss-country')
			.then((response) => {
				response.json()
					.then(cb)
			})
	}
	onFetchPositionDone(data) {
		this.props.actions.updateIss(data)
		return data
	}
	onFetchCountryDone(data) {
		this.props.actions.setCountry(data)
		return data
	}
	isIssPositionResponse(data) {
		return data.latitude && data.longitude && data.countryCode
	}
	trackIss() {
		this.updateIssPosition(this.checkAndUpdate.bind(this))
	}
	checkAndUpdate(data) {
		this.onFetchPositionDone.bind(this)(data)
		if (this.props.country.alpha2Code !== this.props.iss.countryCode)
			this.updateIssCountry(this.onFetchCountryDone.bind(this))
	}
	startTracking() {
		this.stopTracking()
		this.setState({
			issInterval: window.setInterval(this.trackIss.bind(this), 2000)
		})
	}
	stopTracking() {
		if (this.state && this.state.issInterval)
			this.state.issInterval = window.clearInterval(this.state.issInterval)
	}
}

App.propTypes = {
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
)(App)
