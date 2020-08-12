const base = require("./webpack.base.config");
const {merge} = require("webpack-merge");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const definePlugin = new Dotenv({
  path: path.resolve(__dirname, "../envs/.env.dev")
});

module.exports = merge(base, {
  plugins: [
    definePlugin,
  ],
});
