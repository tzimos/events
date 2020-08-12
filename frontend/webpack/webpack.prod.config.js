const path = require("path");
const base = require("./webpack.base.config");
const {merge} = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");


const dotEnvPlugin = new Dotenv({
  path: path.resolve(__dirname, "../envs/.env.prod")
});

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "../src/index.html"),
});

module.exports = merge(base, {
  plugins: [
    dotEnvPlugin,
    htmlPlugin,
  ],
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "app.js"
  },
  devtool: "none"
});
