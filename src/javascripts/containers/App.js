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
		if (isTracking) {
			this.startTracking.bind(this)()
		}
		else {
			this.stopTracking.bind(this)()
		}
		return (
			<div className="app">
				<MainMap />
				<Sidebar />
				<RoutePlayer />
			</div>
		)
	}
	componentDidMount() {
		this.updateIssPosition.bind(this)()
		this.updateIssCountry.bind(this)()
	}
	updateIssPosition() {
		fetch('http://localhost:8080/api/iss-position')
			.then(this.parseResponse.bind(this))
	}
	updateIssCountry() {
		fetch('http://localhost:8080/api/iss-country')
			.then(this.parseResponse.bind(this))
	}
	parseResponse(response) {
		response.json()
			.then(this.onFetchDone.bind(this))
	}
	onFetchDone(json) {
		if (json.latitude && json.longitude)
			this.props.actions.updateIss(json)
		else
			this.props.actions.setCountry(json)
	}
	startTracking() {
		this.stopTracking.bind(this)()
		this.state.tracking = window.setInterval(this.updateIssPosition.bind(this), 2000)
	}
	stopTracking() {
		if (this.state && this.state.tracking)
			this.state.tracking = window.clearInterval(this.state.tracking)
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
