import React, { Component, PropTypes } from 'react'
import { formatNumber, formatLanguage, formatTimezone } from '../utils/formatUtil'

class InformationList extends Component {
	render() {
		const { country } = this.props
		return (
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
		)
	}
}

InformationList.propTypes = {
	country: PropTypes.object.isRequired,
}

export default InformationList