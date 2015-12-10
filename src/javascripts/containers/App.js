import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import MainMap from '../components/MainMap'
import Sidebar from '../components/Sidebar'
import RoutePlayer from '../components/RoutePlayer'

class App extends Component {
	render() {
		const { isIssOverflyingCountry } = this.props;

		return (
			<div className={ isIssOverflyingCountry ? "app has-country" : "app"}>
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
		const { actions } = this.props
		if (data.status) {
			actions.defineIfIssPositionIdentified(false)
			actions.setIssPosition({})
		}
		else {
			actions.setIssPosition(data)
			actions.defineIfIssPositionIdentified(true)
		}
		return data
	}
	onFetchCountryDone(data) {
		const { actions } = this.props
		if (data.status) {
			actions.defineIfIssIsOverflyingCountry(false)
			actions.setCountryInfos({})
		}
		else {
			actions.setCountryInfos(data)
			actions.defineIfIssIsOverflyingCountry(true)
		}
		return data
	}
	trackIss() {
		this.updateIssPosition(this.checkAndUpdate.bind(this))
	}
	checkAndUpdate(data) {
		if (data.status) return
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
	isIssOverflyingCountry: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired,
	isIssPositionIdentified: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
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
