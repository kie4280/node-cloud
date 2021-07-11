const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./static/tsx/index.tsx",
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i, // Only .css files
        use: ["style-loader", "css-loader"], // Run both loaders
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
    "react-router-dom":"ReactRouterDOM",
    firebase: "firebase",
    firebaseui: "firebaseui",
  },

  watchOptions: {
    ignored: ["**/node_modules"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/index.html' },
      ],
    },
    watchOptions: {
      ignored: ["**/node_modules"],
    },
  },
};
