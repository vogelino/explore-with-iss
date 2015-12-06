import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'

class Sidebar extends Component {
	render() {
		const country = this.props.country
		return (
			<div className="main-sidebar">
				<h1>
					{country.name}
					<span>({country.nativeName})</span>
				</h1>
				<h2>Counrty informations</h2>
				<ul>
					<li>
						<label>Capital</label>
						{country.capital}
					</li>
					<li>
						<label>Population</label>
						{country.population}
					</li>
					<li>
						<label>Area</label>
						{country.area} Km<sup>2</sup>
					</li>
				</ul>
			</div>
		)
	}
}

Sidebar.propTypes = {
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
)(Sidebar)
