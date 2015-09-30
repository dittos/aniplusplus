module.exports = {
    entry: {
        'index.ios': ['./main.js']
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    }
};
