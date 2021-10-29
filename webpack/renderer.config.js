const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/ui/electron/renderer/renderer.ts',
  target: 'electron-renderer',
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
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser']
  },
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, '../build')
  }
}
