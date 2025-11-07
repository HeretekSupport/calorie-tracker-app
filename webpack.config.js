//Uses JS syntax
//Default is src/index.js as entry but should add it here as good practice
/* IF YOU ET Module parse failed: 'import' and 'export' may appear only with 'sourceType: module' (3:0) ERROR

- Change the sourceType in the package.json file. CommonJS does not support import/export by default
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path'); //NodeJS path module

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //__dirname resolves to curr dir. Starts at cur.dir and goes to 2nd arg (or end of array)
    filename: 'bundle.js', //default is main.js, using bundle.js for this tutorial; change this in index.html
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      //this is where our loaders go
      {
        test: /\.css$/, //where do you want this loader to apply. Everything that ENDS($) with .css (\.css) - regex format
        use: [MiniCssExtractPlugin.loader, 'css-loader'], //ORDER MATTERS; LAST TO FIRST is how the loaders are run
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: './src/index.html',
      minify: true,
    }),
    new MiniCssExtractPlugin(),
  ],
};
