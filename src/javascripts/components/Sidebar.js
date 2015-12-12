import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import InformationList from './InformationList'
import NewsList from './NewsList'

class Sidebar extends Component {
	render() {
		const { country, isIssOverflyingCountry, isTracking } = this.props
		const contentHasToBeRendered = isIssOverflyingCountry ||
			!isTracking && Object.keys(country).length > 0
		return (
			<div className="main-sidebar">
				{contentHasToBeRendered ?
					this.getCountryInfo.bind(this)(country) : ''}
			</div>
		)
	}
	getCountryInfo(country) {
		const countryCode = country.alpha2Code.toLowerCase()
		return (
			<div>
				<h1 className="country-name">
					<img
						className="flag"
						alt={`${countryCode}-flag`}
						src={`http://flags.fmcdn.net/data/flags/normal/${countryCode}.png`} />
					<div className="main-name">{country.name}</div>
					{country.name.toUpperCase() !== country.nativeName.toUpperCase() ?
						<span className="native-name">({country.nativeName})</span> : ''}
				</h1>
				<h2 className="country-informations-title">Counrty informations</h2>
				<InformationList country={country} />

				<h2 className="news-list-title">News for "{country.name}"</h2>
				{!!country.news && country.news.length > 0 ?
					<NewsList news={country.news} /> : '' }
			</div>
		)
	}
}

Sidebar.propTypes = {
	country: PropTypes.object.isRequired,
	isTracking: PropTypes.bool.isRequired,
	isIssOverflyingCountry: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired,
	isIssPositionIdentified: PropTypes.bool.isRequired,
	geoJson: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
		iss: state.dataVis.iss,
		geoJson: state.dataVis.geoJson
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
