const { watchFile } = require('fs');
const path = require('path');
const { library } = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        'eviltypes': './src/index.js',
        'eviltypes.tests': './tests/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        pathinfo: true,

        filename: '[name].bundle.js',

        library: "eviltypes",
    },
    devServer: {
        static: [
            { directory: path.resolve(__dirname, 'dist'), },
            { directory: path.resolve(__dirname, 'tests/page'), },
        ],
        watchFiles: ['src/**/*', 'tests/**/*'],
        compress: true,
        port: 3000,
        open: { // open browser
            target: ['index.html'],
        },
        hot: true, // hot module replacement
        liveReload: true, // fallback - live reload if HMR not supported
    },
};