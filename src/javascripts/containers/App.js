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
