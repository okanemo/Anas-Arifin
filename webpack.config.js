const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "cheap-module-source-map",
	entry: path.resolve(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js",
	},
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.s?[ac]ss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							implementation: require("node-sass"),
						},
					},
				],
			},
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
				},
			},
			{
				test: /\.(jpe?g|png|gif|eot|svg|ttf|woff|woff2)$/i,
				loader: "file-loader",
				options: {
					name: "[path][name].[ext]",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src", "index.html") }),
		new ErrorOverlayPlugin(),
		// new WorkboxPlugin.GenerateSW({
		// 	// these options encourage the ServiceWorkers to get in there fast
		// 	// and not allow any straggling "old" SWs to hang around
		// 	clientsClaim: true,
		// 	skipWaiting: true,
		// 	maximumFileSizeToCacheInBytes: 10000000,
		// }),
	],
};
