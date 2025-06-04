const { watchFile } = require('fs');
const path = require('path');
const { library, DefinePlugin } = require('webpack');


module.exports = (env, argv) => {
    const isDev = (argv.mode === 'development');

    return {
        mode: isDev ? 'development' : 'production',
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
        plugins: isDev ? [
            new DefinePlugin({
                __DEV_DEBUG_TESTS__: JSON.stringify(true), // true - skip over assert errors
            })
        ] : [
            new DefinePlugin({
                __DEV_DEBUG_TESTS__: JSON.stringify(false), // true - skip over assert errors
            })
        ],
    };
};