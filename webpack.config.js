const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',

  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Очистка папки dist перед сборкой
  },

  devtool: 'source-map',

  module: {
    rules: [
      // JS — Babel
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      },

      // CSS
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      // SCSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      // Шрифты
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },

      // Картинки
      {
        test: /\.(svg|png|jpg|jpeg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name][ext]'
        }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack 5 Starter',
      template: './src/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      }
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: './src/img', to: 'img' }
      ]
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    watchFiles: ['src/**/*'],
    client: {
      overlay: true,
    },
  },
};
