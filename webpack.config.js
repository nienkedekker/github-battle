const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// CommonJS
module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/',
	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './app/index.html',
		}),
		new CopyPlugin({ patterns: [{ from: '_redirects' }] })
	],
	devServer: {
		historyApiFallback: true,
	}
};
