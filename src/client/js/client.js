/* global window */
/* global document */
import React from 'react';
import { render } from 'react-dom';
import '../styles/index.styl';
import Root from './containers/Root';
import App from './containers/App';
import configureStore from './store/configureStore';

/* eslint-disable no-underscore-dangle */
const store = configureStore(window.__INITIAL_STATE__);
/* eslint-enable no-underscore-dangle */
const dest = document.getElementById('root');
const component = (
	<Root store={store}>
		<App />
	</Root>
);

render(component, dest);
