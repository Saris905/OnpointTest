const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',

    devtool: 'cheap-module-eval-source-map',
    devServer: { // настройка dev сервера
        contentBase: baseWebpackConfig.externals.paths.dist, // где будет открываться webpack
        port: 8081, // хорошая практика, когда работаешь со 2м сервером
        overlay: {
            warnings: true,
            errors: true
        } // вывод ошибок в окне браузера
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }) // карта сайта
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})

