import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import { formatNumber, formatLanguage, formatTimezone } from '../utils/formatUtil'

class Sidebar extends Component {
	render() {
		const { country, isIssOverflyingCountry } = this.props
		return (
			<div className="main-sidebar">
				{isIssOverflyingCountry ? this.getCountryInfo.bind(this)(country) : ''}
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
				<ul className="country-information-list">
					<li className="country-information-list-element country-capital">
						<label>Capital</label>
						<div className="value">{country.capital}</div>
					</li>
					<li className="country-information-list-element country-population">
						<label>Population</label>
						<div className="value">{formatNumber(country.population)}</div>
					</li>
					<li className="country-information-list-element country-area">
						<label>Area</label>
						<div className="value">{formatNumber(country.area)} Km<sup>2</sup></div>
					</li>
					<li className="country-information-list-element country-language">
						<label>{country.languages.length === 1 ?
							'Official language' : 'Official languages'}</label>
						<div className="value">
							{country.languages.map((language, index) => (
								<span key={index}>
									{index === 0 ? '' : ', '}
									{formatLanguage(language)}
								</span>
							))}
						</div>
					</li>
					<li className="country-information-list-element country-gini">
						<label>Gini index</label>
						<div className="value">{country.gini}</div>
					</li>
					<li className="country-information-list-element country-currencies">
						<label>{country.currencies.length === 1 ?
							'Currency' : 'Currencies'}</label>
						<div className="value">
							{country.currencies.join(', ')}
						</div>
					</li>
					<li className="country-information-list-element country-timezones">
						<label>{country.timezones.length === 1 ?
							'Timezone' : 'Timezones'}</label>
						<div className="value">
							<span className="example-text">UTC </span>
							{country.timezones.map((timezone, index) => (
								<span key={index}>
									{index === 0 ? '' : ', '}
									{formatTimezone(timezone)}
								</span>
							))}
						</div>
					</li>
					<li className="country-information-list-element country-calling-code">
						<label>{country.callingCodes.length === 1 ?
							'Calling prefix' : 'Calling prefixes'}</label>
						<div className="value">
							{country.callingCodes.map((prefix, index) => (
								<span key={index}>
									{index === 0 ? '' : (<br />)}
									{`+ ${prefix} `} <span className="example-text">123 4567 8910</span>
								</span>
							))}
						</div>
					</li>
					<li className="country-information-list-element country-top-level-domain">
						<label>{country.topLevelDomain.length === 1 ?
							'Top level domain' : 'Top level domains'}</label>
						<div className="value">
							{country.topLevelDomain.map((topLvlDomain, index) => (
								<span key={index}>
									{index === 0 ? '' : (<br />)}
									<span className="example-text">www.example</span>{topLvlDomain}
								</span>
							))}
						</div>
					</li>
				</ul>
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
