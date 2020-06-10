const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require('zlib');

module.exports = {
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
            new CompressionPlugin({
                filename: '[path].br[query]',
                algorithm: 'brotliCompress',
                test: /\.(js|css|html|svg)$/,
                compressionOptions: {
                    level: 11,
                },
                threshold: 10240,
                minRatio: 0.8,
            }),
        ]
    },

    pluginOptions: {
        i18n: {
            locale: 'ar',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
};
