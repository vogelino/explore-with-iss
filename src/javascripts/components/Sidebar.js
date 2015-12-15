import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import InformationList from './InformationList'
import NewsList from './NewsList'
import PicturesGallery from './PicturesGallery'
import Vibrant from 'node-vibrant'

class Sidebar extends Component {
	render() {
		const { country, isIssOverflyingCountry, isTracking } = this.props
		const contentHasToBeRendered = isIssOverflyingCountry ||
			!isTracking && Object.keys(country).length > 0
		return (
			<div className="main-sidebar">
				{contentHasToBeRendered ?
					this.getCountryInfo.bind(this)() : false}
			</div>
		)
	}
	onFlagLoaded(e) {
		const { countryColor } = this.props
		const { setCountryColor } = this.props.actions
		const vibrant = new Vibrant(e.target.getAttribute('src'))
		vibrant.getSwatches((err, swatchObj) => {
			if (err) {
				console.log('Error loading swatches. Retrieving default color.')
				return
			}
			var swatches = [];
			for (var name in swatchObj) {
				if (swatchObj.hasOwnProperty(name) && swatchObj[name]) {
					const color = swatchObj[name].getHex()
					if (name === 'Vibrant' && countryColor !== color) {
						setCountryColor(color)
					}
				}
			}
		})
	}
	getCountryInfo() {
		const { actions, country, countryColor } = this.props
		const countryCode = country.alpha2Code.toLowerCase()
		return (
			<div>
				<h1 className="country-name">
					<img
						className="flag"
						alt={`${countryCode}-flag`}
						src={`/images/flags/${countryCode}_64.png`}
						onLoad={this.onFlagLoaded.bind(this)}/>
					<div className="main-name">{country.name}&nbsp;</div>
					{country.name.toUpperCase() !== country.nativeName.toUpperCase() ?
						<span className="native-name">({country.nativeName})</span> : false}
				</h1>

				<h2 className="country-informations-title">Counrty informations</h2>
				<InformationList country={country} />

				<PicturesGallery />

				<h2 className="news-list-title">News for "{country.name}"</h2>
				{!!country.news && country.news.length > 0 ?
					<NewsList
						countryColor={countryColor}
						news={country.news} /> : false }
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
	countryColor: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
		iss: state.dataVis.iss,
		countryColor: state.dataVis.countryColor
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
