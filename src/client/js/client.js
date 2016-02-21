/* global window */
/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './containers/Root';
import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);
const dest = document.getElementById('root');
const component = (
	<Root store={store}>
		<App />
	</Root>
);

render(component, dest);
