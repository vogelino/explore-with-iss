import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'

class Sidebar extends Component {
	render() {
		const { country } = this.props
		return (
			<div className="main-sidebar">
				<h1 className="country-name">
					{country.name}
					{country.name.toUpperCase() !== country.nativeName.toUpperCase() ?
						<span className="country-native-name">({country.nativeName})</span> : ''}
				</h1>
				<h2 className="country-informations-title">Counrty informations</h2>
				<ul className="country-information-list">
					<li className="country-information-list-element country-capital">
						<label>Capital</label>
						{country.capital}
					</li>
					<li className="country-information-list-element country-population">
						<label>Population</label>
						{country.population}
					</li>
					<li className="country-information-list-element country-area">
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
