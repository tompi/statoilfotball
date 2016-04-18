module.exports = {
  webpack: {
    // webpack options
    entry: "./client-react/app.js",
    output: {
        path: "build/client/",
        filename: "bundle.js",
    },

    stats: {
        // Configure the console output
        colors: false,
        modules: true,
        reasons: true
    },
    module: {
        loaders: [
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }
  }
};
