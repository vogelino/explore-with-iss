import React, { Component, PropTypes } from 'react'

class PicturesGallery extends Component {
	render() {
		const { pictures } = this.props
		return (
			<div className="country-pictures">
				<div className="pictures-wrapper">
					{pictures.map((pic, index) => (
						<div
							className="picture"
							key={index}
							style={{
								backgroundImage: `url('http://eol.jsc.nasa.gov/DatabaseImages/ESC/small/STS126/${pic}.JPG')`
							}} />
					))}
				</div>
			</div>
		)
	}
}

PicturesGallery.propTypes = {
	pictures: PropTypes.array.isRequired,
}

export default PicturesGallery