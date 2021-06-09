const path = require("path");
// const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: { main: ["./controller.js", "./src/main.scss"] },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/assets/icons", to: "./assets/icons/" }],
    }),
    // new FaviconsWebpackPlugin("./src/assets/logo.png"),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "img",
          },
        },
      },
    ],
  },
};
