const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./static/tsx/index.tsx",
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.join(__dirname, "/out"),
    filename: "bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/html/index.html",
    }),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
  },
};
