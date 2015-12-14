import React, { Component, PropTypes } from 'react'

class PicturesGallery extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstPictureIndex: 0,
			picturesByPage: 4
		}
	}
	componentWillReceiveProps(prevProps) {
		if (prevProps.pictures !== this.props.pictures) {
			this.setState({ firstPictureIndex: 0 })
		}
	}
	render() {
		const { pictures, countryName } = this.props
		const { firstPictureIndex } = this.state
		return (
			<div className="pictures-gallery">
				<h2 className="country-pictures-title">
					Iss pictures of {countryName}
					{this.displayControls.bind(this)()}
				</h2>
				<div className="country-pictures">
					<div
						style={{
							transform: `translateX(${(firstPictureIndex * 91 * -1)}px)`
						}}
						className="pictures-wrapper">
						{pictures.map((pic) => {
							const album = pic.id.split('-')[0]
							return (
								<a
									href={pic.url}
									target="_blank"
									className="picture"
									key={pic.id}
									style={{
										backgroundImage: `url(${pic.thumb})`
									}} />
							)
						}
						)}
					</div>
				</div>
			</div>
		)
	}
	displayControls() {
		const { pictures, countryColor } = this.props
		const { firstPictureIndex, picturesByPage } = this.state
		const linkStyle = { color: countryColor }
		const nextLink = (<a style={linkStyle} onClick={this.showNextPic.bind(this)}>{'>'}</a>)
		const prevLink = (<a style={linkStyle} onClick={this.showPrevPic.bind(this)}>{'<'}</a>)
		return (
			<nav className="controls">
				{ firstPictureIndex > 0 ?
					prevLink : (<a className="disabled">{'<'}</a>) }
				{ firstPictureIndex < (pictures.length - picturesByPage) ?
					nextLink : (<a className="disabled">{'>'}</a>) }
			</nav>
		)
	}
	showPrevPic() {
		const { pictures } = this.props
		const { firstPictureIndex } = this.state
		this.setState({ firstPictureIndex: firstPictureIndex - 1 })
	}
	showNextPic() {
		const { pictures } = this.props
		const { firstPictureIndex } = this.state
		this.setState({ firstPictureIndex: firstPictureIndex + 1 })
	}
}

PicturesGallery.propTypes = {
	pictures: PropTypes.array.isRequired,
	countryColor: PropTypes.string.isRequired,
	countryName: PropTypes.string.isRequired
}

export default PicturesGallery