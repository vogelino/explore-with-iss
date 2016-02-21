import express from 'express';
import http from 'http';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import configureStore from './client/js/store/configureStore';
import { Provider } from 'react-redux';
import Root from './client/js/containers/Root';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './api/router';

import routes from './routes';

const app = express();

app.use(express.static(__dirname + '/../public'));

// API Middlewares
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use('/api', bodyParser.json());
app.use('/api', cors());
app.use('/api', apiRouter);

const renderFullPage = (html, title, meta, initialState) => {
	return `
	<!doctype html>
	<html>
		<head>
			${title}
			${meta}
			<link href="/bundle.css" rel="stylesheet"></link>
		</head>
		<body>
			<div id="root">${html}</div>
			<script>
				window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
			</script>
			<script src="/bundle.js" type="text/javascript"></script>
		</body>
	</html>
	`;
};

const handleRender = (req, res, props) => {
	const store = configureStore();
	const html = renderToString(
		<Root store={store}>
			<RouterContext {...props} />
		</Root>
	);
	const { title, meta } = Helmet.rewind();

	const initialState = store.getState();
	res.send(renderFullPage(html, title, meta, initialState));
};

app.use((req, res) => {
	match({ routes, location: req.url }, (err, redirectLocation, props) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (props) {
			handleRender(req, res, props);
		} else {
			res.sendStatus(404);
		}
	});
});

const server = http.createServer(app);

server.listen(3003);
server.on('listening', () => {
	console.log('Listening on 3003');
});
