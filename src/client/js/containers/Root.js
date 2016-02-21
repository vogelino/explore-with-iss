import React from 'react';
import { Provider } from 'react-redux';
import App from './App';

function Root(props) {
	return (
		<Provider store={props.store}>
			{ props.children }
		</Provider>
	);
}

export default Root;
