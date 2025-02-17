const webpack = require('webpack');

module.exports = function override(config) {
    // Add fallbacks for node modules
    config.resolve = {
        ...config.resolve,
        fallback: {
            ...config.resolve.fallback,
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "os": require.resolve("os-browserify"),
            "url": require.resolve("url"),
            "zlib": require.resolve("browserify-zlib"),
            "process": false,
            "buffer": require.resolve("buffer")
        },
        alias: {
            ...config.resolve.alias,
            'process/browser': require.resolve('process/browser.js')
        }
    };

    // Add plugins
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
            Buffer: ['buffer', 'Buffer']
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ];

    return config;
}; 