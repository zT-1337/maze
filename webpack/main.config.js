const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/ui/electron/main/main.ts',
  target: 'electron-main',
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
    filename: 'main.js',
    path: path.resolve(__dirname, '../build')
  }
}
