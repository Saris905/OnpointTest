const path = require('path') // используется и задается для корректного поиска т. выхода от корня
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
} // используется для создания гибкой структуры древа

module.exports = {

    externals: { // необх. для доступа к PATHS из других конфигов
        paths: PATHS
    },
    entry: { // точка входа
        app: PATHS.src,
        // lk: `${PATHS.src}/lk.js` // пример подключения еще 1 т.вх.(например для отдельного эл-та проекта)
    },
    output: { // точка выхода
        filename: `${PATHS.assets}js/[name].[hash].js`, // [name] - имя берется из ярлыка входа(необходимо при неск.т.входа
        path: PATHS.dist,
        publicPath: '/' // для dev сервера
    },
    optimization: { // разделяем app(наш код) и vendors(библиотеки)
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [ { // каждое правило это объект
            test: /\.js$/,
            loader: 'babel-loader', // обрабатывать все js файлы через babel
            exclude: '/node_modules/' // исключить из обр. все нод-модули
        },
        //     { //
        //     test: /\.vue$/,
        //     loader: 'vue-loader',
        //     options: {
        //         loader: {
        //             scss: 'vue-style-loader!css-loader!sass-loader'
        //         }
        //     }
        // },
         {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        },
        //     {
        //     test: /\.scss$/, // нужен другой? пишем .sass .less .styl тут + в назв. лоадера
        //     use: [
        //         'style-loader',
        //         MiniCssExtractPlugin.loader,
        //         {
        //             loader:'css-loader',
        //             options: { sourceMap: true }
        //         }, {
        //             loader:'postcss-loader',
        //             options: { sourceMap: true, config: { path: `./postcss.config.js`}  }
        //         }, {
        //             loader:'sass-loader',
        //             options: { sourceMap: true }
        //         }
        //
        //     ]
        // },
            {
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader:'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader:'postcss-loader',
                    options: { sourceMap: true, config: { path: `./postcss.config.js`} }
                }
            ]
        }]
    },
    resolve: {
        alias: {
            '~': 'src', // хорошая практика чтобы избавиться от ../../...
            // 'vue$': 'vue/dist/vue.js' // чтобы не прописывать полноценный пусть повторно
        }
    },
    plugins: [
        // new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css` // name также ссылается на app(!)
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
            // inject: false // отключает автоматическую вставку файлов через link
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`},
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`},
            { from: `${PATHS.src}/static`, to: ''}
        ]),
        // new webpack.ProvidePlugin({
        //     'tl': 'gsap'
        // })
    ],
}