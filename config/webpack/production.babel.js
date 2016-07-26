import { isArray, mergeWith } from 'lodash';
import webpack from 'webpack';

import base from './base';

process.env.NODE_ENV || (process.env.NODE_ENV='production');
export default mergeWith(base, {
    devtool: '#source-map',

    output: {
        path: './public',
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ],
}, function(a, b) {
    if (isArray(a)) {
        return a.concat(b);
    }
});
