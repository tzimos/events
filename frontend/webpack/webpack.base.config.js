const path = require("path");
const convert = require("koa-connect");
const history = require("connect-history-api-fallback");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const babel = require("../.babelrc.js");


module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
    host: "0.0.0.0",
  },
  serve: {
    add: (app, middleware) => {
      app.use(convert(history()));
      middleware.webpack();
      middleware.content();
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "../node_modules/"),
        use: {
          loader: "babel-loader",
          options: babel,
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
          /overrides/,
        ],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "to-string-loader",
          "css-loader"
        ],
      },
      {
        test: /\.css$/,
        include: [
          /node_modules/,
          /overrides/,
        ],
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
    }),
  ]
};
