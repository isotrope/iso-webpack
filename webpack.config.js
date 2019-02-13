const webpack = require( 'webpack' );
const path = require( 'path' );

const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

// https://github.com/webpack-contrib/mini-css-extract-plugin/
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

// https://github.com/Turbo87/webpack-notifier#readme
const WebpackNotifierPlugin = require( 'webpack-notifier' );


module.exports = {
	entry   : {
		app : [ './src/app.js', './src/style.scss' ]
	},
	output  : {
		path     : path.resolve( __dirname, 'dist' ),
		filename : 'js/[name].js'
	},
	stats   : {
		children : false
	},
	module  : {
		rules : [
			{
				test    : /\.jsx?$/,
				exclude : /node_modules/,
				use     : {
					loader : "babel-loader"
				}
			},
			{
				test : /\.(sa|sc|c)ss$/,
				use  : [
					MiniCssExtractPlugin.loader,
					{
						loader : 'css-loader',
						options : {
						// 	importLoaders : 1,
							sourceMap     : true,
						// 	url           : false,
						// 	minimize      : true,
						}
					},
					{
						loader  : 'postcss-loader',
						options : {
							plugins   : () => [

								// https://github.com/postcss/autoprefixer
								require( 'autoprefixer' )( {
									'browsers' : [ '> 1%', 'last 2 versions' ]
								} ),

								// https://github.com/hail2u/node-css-mqpacker
								require( 'css-mqpacker' ),

								// https://github.com/cssnano/cssnano
								require( 'cssnano' )( {
									preset : 'default',
								} ),
							],
							sourceMap : true
						}
					},
					{
						loader  : 'sass-loader',
						options : {
							sourceMap : true
						}
					},
				]
			}
		]
	},
	devtool: 'source-map',
	plugins : [
		new WebpackNotifierPlugin( {
			contentImage : path.join( __dirname, 'logo.png' ),
			alwaysNotify : true
		} ),
		new CleanWebpackPlugin( [ 'dist' ] ),
		new MiniCssExtractPlugin( {
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename : 'css/style.css',
		} )
	],
	devServer: {
		// Display only errors to reduce the amount of output.
		stats: "errors-only",

		// Parse host and port from env to allow customization.
		//
		// If you use Docker, Vagrant or Cloud9, set
		// host: options.host || "0.0.0.0";
		//
		// 0.0.0.0 is available to all network devices
		// unlike default `localhost`.
		host: process.env.HOST, // Defaults to `localhost`
		port: process.env.PORT, // Defaults to 8080
		open: true, // Open the page in browser
		writeToDisk: true,
	},


};
