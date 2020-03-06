module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"] // when 'src' is qncountered, it requires them
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // when these files are required by html loader, we output them with hash
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "media"
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
};
