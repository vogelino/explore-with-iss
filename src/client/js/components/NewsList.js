import React, { Component, PropTypes } from 'react';

class NewsElement extends Component {
	render() {
		const { author, title, url, kwic, domain, countryColor } = this.props;
		return (
			<div>
				<h4 className="title">
					<a
						style={{ color: countryColor }}
						href={url}
						target="_blank"
						title={title}>
						{title}
					</a>
					<span className="author">{author}</span>
				</h4>
				{!!kwic && kwic.length > 0 ?
					<p className="kwic">{kwic}</p> : ''}
				<span className="domain">{domain}</span>
			</div>
		);
	}
}

NewsElement.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	domain: PropTypes.string.isRequired,
	countryColor: PropTypes.string.isRequired,
	kwic: PropTypes.string
};

class NewsList extends Component {
	render() {
		const { news, countryColor } = this.props;
		return (
			<div className="news-list">
				<ul>
					{news.map((newsEl, index) => (
						<li key={index}>
							<NewsElement {...newsEl} countryColor={countryColor} />
						</li>
					))}
				</ul>
				<div className="gradient-overlay"></div>
			</div>
		);
	}
}

NewsList.propTypes = {
	news: PropTypes.array.isRequired,
	countryColor: PropTypes.string.isRequired
};

export default NewsList;
