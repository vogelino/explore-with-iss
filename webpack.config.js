var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var rootDir = __dirname;
var clientSrc = './src/client';
var clientDest = './public';

module.exports = {
	context: rootDir,
	entry: [
		'babel-polyfill',
		clientSrc + '/js/client.js'
	],
	output: {
		filename: 'bundle.js',
		path: clientDest
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|tmp)/,
				loader: 'babel-loader',
				query: {
					plugins: [ 'transform-runtime' ]
				}
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				loader: 'file-loader'
			}
		]
	},
	resolve: {
		extensions: [ '', '.js', '.jpg', '.png', '.gif', '.json' ]
	},
	plugins: [
		new webpack.NoErrorsPlugin()
	],
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
