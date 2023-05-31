const webpack = require('webpack');

module.exports = {

  plugins: [
    new webpack.DefinePlugin({
      'process.env.BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL)
    })
  ]
};
