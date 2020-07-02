const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: './app/index.html',
		}),
	],
	devServer: {
		historyApiFallback: true,
	}
};
