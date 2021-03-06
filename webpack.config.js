const validate = require('webpack-validator');
const Joi = require('webpack-validator').Joi;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nib = require('nib');

const schemaExtension = Joi.object({
	stylus: Joi.object(),
});

const clientSrc = './src/client';
const clientDest = 'public';

const config = {
	entry: [
		'babel-polyfill',
		`${clientSrc}/js/client.js`,
	],
	output: {
		filename: 'bundle.js',
		path: clientDest,
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|tmp)/,
				loader: 'babel-loader',
				query: {
					plugins: ['transform-runtime'],
				},
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader'),
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				loader: 'file-loader',
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader',
			},
		],
	},
	resolve: {
		extensions: ['', '.js', '.jpg', '.png', '.gif', '.json', '.styl'],
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('bundle.css', { allChunks: true }),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"` }),
	],
	stats: {
		colors: true,
	},
	stylus: {
		use: [nib()],
	},
};

if (process.env.NODE_ENV === 'development') {
	config.devtool = 'source-map';
}
else if (process.env.NODE_ENV === 'production') {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = validate(config, { schemaExtension });
