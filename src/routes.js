import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './client/js/containers/App';

export default (
	<Router>
		<Route path='/' component={App} />
	</Router>
);
