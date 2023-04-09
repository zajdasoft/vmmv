const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    usedExports: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  ignoreWarnings: [
    // This option prevents often transpile warnings. These warnings are generated as the transpiler drops
    // information about types. ForkTsCheckerWebpackPlugin checks for type errors in a separate process.
    {
      message: /export .* was not found in/
    }
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
};
