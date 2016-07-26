import { merge } from 'lodash';

import base from './base';

process.env.NODE_ENV || (process.env.NODE_ENV='development');
export default merge(base, {
    devServer: {
        contentBase: './source',
        stats: {
            colors: true,
        },
    },

    devtool: '#eval-source-map',
});
