const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
	// mode: process.env.environment == "production" ? "production" : "development",
	mode: "production",
	plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
		template: path.resolve(__dirname, "src", "index.html")
	})],
	module: {
		rules: [
			{
				test: /\.(s[ac]|c)ss$/i,
				//test: path.resolve(__dirname, "src/scss/*"),
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader"],
			},{
				test: /\.png$/i,
				type: "asset"
			}
		]
	},
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							["optipng", { optimizationLevel: 7 }]
						]
					}
				}
			})
		]
	},
	devtool: "source-map",
	devServer: {
		static: "./dist"
	}
}
