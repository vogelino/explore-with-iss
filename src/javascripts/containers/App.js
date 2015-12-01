import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions/todos'

class App extends Component {
	render() {
		const { todos, actions } = this.props;
		return (
			<div className="app">
				<h1>Hello World</h1>
			</div>
		)
	}
}

App.propTypes = {
	todos: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(TodoActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
