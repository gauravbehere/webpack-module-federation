const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = webpack.container;

module.exports = {
  entry: "./index.js",
  mode: "development",
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
		new ModuleFederationPlugin({
			remotes: {
				remote: `remote@http://localhost:5000/remoteEntry.js`,
			},
			shared: [
				{
					react: { singleton: true, eager: true },
					"react-dom": { singleton: true, eager: true },
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		})
  ]
};
