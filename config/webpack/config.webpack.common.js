/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(__dirname, "../..", "src", "index.tsx"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../..", "dist"),
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.js$/,
        // Transpiling node_modules is bad for the perfomance reasons
        // But some libraries can contain non-es5 code
        // So es5-check is used after production build to make sure no new libraries contain non-es5 code
        exclude: [
          new RegExp(
            "node_modules\\" +
              path.sep +
              "(?!await-lock|react-youtube|socket.io-client)"
          ),
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === "development",
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              localsConvention: "camelCaseOnly",
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Application",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ["npm run intl:generate-json"],
        blocking: true,
        parallel: false,
      },
    }),
    new Dotenv({
      path: process.env.DOTENV || "./.env",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    alias: {
      src: path.resolve(__dirname, "../../src/"),
      debug: "debug-es5",
    },
  },
};
