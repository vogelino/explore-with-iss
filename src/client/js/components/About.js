/* global window */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
const marked = require('marked');

class About extends Component {
	render() {
		const { actions, isAboutOpen, aboutContent } = this.props;
		return (
			<div className={ `about-section ${isAboutOpen ? 'open' : 'closed'}` }>
				<div className="information-window">
					<header>
						<a href="https://github.com/vogelino/explore-with-iss" target="_blank" title="Open in Github">
							Open in Github
						</a>
						<button className="about-closer" onClick={actions.closeAbout}>
							✕
						</button>
					</header>
					<div
						className="markdown-body github-content"
						dangerouslySetInnerHTML={{ __html: marked(aboutContent) }}>
					</div>
				</div>
				<button className="about-opener" onClick={actions.openAbout}>
					About this project
				</button>
			</div>
		);
	}
	toggleAbout() {
		const { actions, isAboutOpen } = this.props;
		if (isAboutOpen) {
			actions.closeAbout();
		} else {
			actions.openAbout();
		}
	}
}

About.propTypes = {
	isAboutOpen: PropTypes.bool.isRequired,
	aboutContent: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		isAboutOpen: state.dataVis.isAboutOpen,
		aboutContent: state.dataVis.aboutContent
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
)(About);
