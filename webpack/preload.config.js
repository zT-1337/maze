const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/ui/electron/main/preload.ts',
  target: 'electron-preload',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'preload.js',
    path: path.resolve(__dirname, '../build/electron')
  }
}
