const path = require("path");
const base = require("./webpack.base.config");
const {merge} = require("webpack-merge");
const Dotenv = require("dotenv-webpack");


const dotEnvPlugin = new Dotenv({
  path: "../envs/.env.prod"
});

module.exports = merge(base, {
  plugins: [
    dotEnvPlugin,
  ],
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "app.js.gz"
  },
  devtool: "none"
});
