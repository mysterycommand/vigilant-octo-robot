import webpack from 'webpack';

export default {
    entry: {
        main: './source/main.js',
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015'],
            },
        }],
    },

    output: {
        filename: '[name].js',
        publicPath: '',
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
    ],
};
