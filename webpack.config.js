var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nib = require('nib');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function(x) {
		return [ '.bin' ].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

var rootDir = __dirname;
var clientSrc = './src/client';
var clientDest = './dest/client';
var apiSrc = './src/api';
var apiDest = './dest/api';

module.exports = [
	{
		context: rootDir,
		entry: [
			'babel-polyfill',
			clientSrc + '/js/client.js'
		],
		output: {
			filename: 'client.js',
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
					test: /\.css$/,
					loader: 'style-loader!css-loader'
				},
				{
					test: /\.styl$/,
					loader: 'style-loader!css-loader!stylus-loader'
				},
				{
					test: /\.(jpg|png|gif|svg)$/,
					loader: 'file-loader'
				},
				{
					test: /\.js$/,
					loader: 'eslint-loader',
					exclude: /node_modules/
				},
				{
					test: /\.json$/,
					loader: 'raw-loader'
				}
			]
		},
		stylus: {
			use: [ nib() ]
		},
		resolve: {
			extensions: [ '', '.js', '.css', '.styl', '.jpg', '.png', '.gif', '.json' ]
		},
		plugins: [
			new webpack.NoErrorsPlugin(),
			new HtmlWebpackPlugin({
				title: 'Explore with the International Space Station',
				template: clientSrc + '/html/index.html',
				inject: 'body'
			}),
			new CopyWebpackPlugin([
				{
					from: clientSrc + '/images',
					to: 'images'
				}
			])
		],
		stats: {
			colors: true
		},
		devtool: 'source-map'
	},
	{
		context: rootDir,
		entry: apiSrc + '/index.js',
		target: 'node',
		output: {
			filename: 'index.js',
			path: apiDest
		},
		externals: nodeModules,
		module: {
			loaders: [
				{
					test: /\.js?$/,
					exclude: /(node_modules|tmp)/,
					loader: 'babel-loader',
					query: { plugins: [ 'transform-runtime' ] }
				},
				{
					test: /\.js$/,
					loader: 'eslint-loader',
					exclude: /node_modules/
				},
				{
					test: /\.json$/,
					loader: 'raw-loader'
				}
			]
		},
		resolve: {
			extensions: [ '', '.js', '.json' ]
		},
		plugins: [
			new webpack.NoErrorsPlugin()
		],
		stats: { colors: true },
		devtool: 'source-map'
	}
];
