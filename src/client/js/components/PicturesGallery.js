import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';

class PicturesGallery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstPictureIndex: 0,
			picturesByPage: 4
		};
	}
	componentWillReceiveProps(prevProps) {
		if (prevProps.pictures !== this.props.pictures) {
			this.setState({ firstPictureIndex: 0 });
		}
	}
	render() {
		const { country } = this.props;
		const { issPictures, name } = country;
		const { firstPictureIndex } = this.state;
		return (
			<div className="pictures-gallery">
				<h2 className="country-pictures-title">
					Iss pictures of {name}
					{this.displayControls.bind(this)()}
				</h2>
				{issPictures.length >= 1 ? this.getPicturesGallery.bind(this)() :
					<div className="no-pictures-placeholder">No pictures for this country</div>}
			</div>
		);
	}
	getPicturesGallery() {
		const { country, selectedPicture } = this.props;
		const { firstPictureIndex } = this.state;
		return (
			<div className="country-pictures">
				<div
					style={{
						transform: `translateX(${(firstPictureIndex * 91 * -1)}px)`
					}}
					className="pictures-wrapper">
					{country.issPictures.map((pic) => {
						const album = pic.id.split('-')[0];
						return (
							<a
								onClick={this.openGallery.bind(this)}
								className={pic.id === selectedPicture.id ? 'picture active' : 'picture'}
								key={pic.id}
								id={pic.id}
								style={{
									backgroundImage: `url(${pic.thumb})`
								}} />
						);
					}
					)}
				</div>
			</div>
		);
	}
	displayControls() {
		const { country, countryColor } = this.props;
		const { firstPictureIndex, picturesByPage } = this.state;
		const linkStyle = { color: countryColor };
		const nextLink = (<a style={linkStyle} onClick={this.showNextPic.bind(this)}>{'>'}</a>);
		const prevLink = (<a style={linkStyle} onClick={this.showPrevPic.bind(this)}>{'<'}</a>);
		return (
			<nav className="controls">
				{ firstPictureIndex > 0 ?
					prevLink : (<a className="disabled">{'<'}</a>) }
				{ firstPictureIndex < (country.issPictures.length - picturesByPage) ?
					nextLink : (<a className="disabled">{'>'}</a>) }
			</nav>
		);
	}
	showPrevPic() {
		const { firstPictureIndex } = this.state;
		this.setState({ firstPictureIndex: firstPictureIndex - 1 });
	}
	showNextPic() {
		const { firstPictureIndex } = this.state;
		this.setState({ firstPictureIndex: firstPictureIndex + 1 });
	}
	openGallery(e) {
		const { actions, country } = this.props;
		const { id } = e.target;
		const picture = country.issPictures.find(pic =>
			pic.id === id);
		actions.openSlideshow(picture);
	}
}

PicturesGallery.propTypes = {
	country: PropTypes.object.isRequired,
	isTracking: PropTypes.bool.isRequired,
	isIssOverflyingCountry: PropTypes.bool.isRequired,
	iss: PropTypes.object.isRequired,
	isIssPositionIdentified: PropTypes.bool.isRequired,
	countryColor: PropTypes.string.isRequired,
	selectedPicture: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		country: state.dataVis.country,
		isTracking: state.dataVis.isTracking,
		isIssOverflyingCountry: state.dataVis.isIssOverflyingCountry,
		isIssPositionIdentified: state.dataVis.isIssPositionIdentified,
		iss: state.dataVis.iss,
		countryColor: state.dataVis.countryColor,
		selectedPicture: state.dataVis.selectedPicture
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PicturesGallery);
