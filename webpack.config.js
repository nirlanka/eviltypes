const path = require('path');
const { library } = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        'typebase': './src/index.js',
        'typebase.tests': './tests/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        pathinfo: true,

        filename: '[name].bundle.js',

        library: "typebase",
    },
};