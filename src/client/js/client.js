/* global window */
/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';

const initApp = () => {
	const store = configureStore();
	const dest = document.getElementById('root');
	const component = (
		<Provider store={store}>
			<App />
		</Provider>
	);

	render(component, dest);
};

window.document.addEventListener('DOMContentLoaded', initApp);
