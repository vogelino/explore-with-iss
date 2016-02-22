import express from 'express';
import http from 'http';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import configureStore from './client/js/store/configureStore';
import initialState from './client/js/reducers/initialState';
import { Provider } from 'react-redux';
import Root from './client/js/containers/Root';
import { handleSockets } from './api/socketHandler';
import request from 'request';
import fs from 'fs';

import routes from './routes';

const app = express();

app.use(express.static(__dirname + '/../public'));

const renderFullPage = (html, title, meta, link, state) => {
	return `
	<!doctype html>
	<html itemscope itemtype="http://schema.org/Article">
		<head>
			${title}
			${meta}
			${link}
			<link href="/bundle.css" rel="stylesheet"></link>
		</head>
		<body>
			<div id="root">${html}</div>
			<script>
				window.__INITIAL_STATE__ = ${JSON.stringify(state)}
			</script>
			<script src="https://cdn.socket.io/socket.io-1.3.5.js"></script>
			<script src="/bundle.js" type="text/javascript"></script>
			<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

				ga('create', '${process.env.GOOGLE_API_KEY}', 'auto');
				ga('send', 'pageview');

			</script>
		</body>
	</html>
	`;
};

const handleRender = (req, res, props) => {
	fs.readFile(__dirname + '/../readme.md', (err, fileContent) => {
		if (!err) {
			console.log(fileContent.toString());
			initialState.aboutContent = fileContent.toString();
		} else {
			console.log('ERR:', err);
		}
		const store = configureStore(initialState);
		const html = renderToString(
			<Root store={store}>
				<RouterContext {...props} />
			</Root>
		);
		const { title, meta, link } = Helmet.rewind();

		const finalState = store.getState();
		res.send(renderFullPage(html, title, meta, link, finalState));
	});
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

const port = process.env.PORT || 3003;
server.listen(port);
server.on('listening', () => {
	console.log(`Listening on ${port}`);
});

const io = require('socket.io')(server);
handleSockets(io);
