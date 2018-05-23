/*
* 生产环境的配置
* */

const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

/*
* 得到 dir在指定目录（build）的，绝对路径
* __dirname: 当前文件所在目录的绝对路径
*
* resolve中的参数，都是可选的，最终都会拼接到一起。
* ..为了使dir的绝对路径是demo3为基准的
* */
function resolve(dir) {
    return path.resolve(__dirname,'..',dir);
}

//webpack配置
module.exports = merge(baseConfig,{  // 配置对象

    //入口
    entry: {
        // 指定第三方模块包含哪些
        vendor: ["jquery"]
    },

    //出口
    output: {
        filename: 'static/js/[name].[chunkhash].js',    //[chunkhash:10] 对应js
        /*
        * 给所的相对连接前加上/
        * 这个是确保生成的文件，引入其他的资源都是绝对路径，
        * 这样，通过 npm run server生成的服务器访问时，就会正常显示
        * */
        publicPath: '/'
    },

    // 模块加载器
    module: {
        rules: [
            // 将es6编译为es5，baseConfig已实现

            // 加载css
            {
                test: /\.css$/,
                /*
                * use作用和 loader相同。
                *    这里不需要style-loader，将生成的 js文件，添加到页面的 <style>标签中
                *    因为最后是将css文件加入页面中，
                *
                *    通过ExtractTextPlugin.extract包装后的loader，会将css单独打包。
                *       需要配合下面的第一个插件 ExtractTextPlugin
                * */
                use: ExtractTextPlugin.extract({    //extract 抽取
                    use: ["css-loader"]
                })
            },

            // 加载img，baseConfig已实现
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'static/css/[name].[contenthash:10].css'  //[contenthash] 对应css
        }),
        /*
        *  清理的是文件名变化后，之前的文件，
        *  简单说，就是在打包前，清理dist文件夹
        *   默认是在bulid文件夹下找dist，所以要告诉dist文件夹的目录
        *   空串，也就是dir不传，resolve找的就是根目录 demo3
        * */
        new CleanPlugin(['dist'], {
            root: resolve('')
        }),

        /*
        *  第三方包模块单独打包
        *  第三方包模块是在入口entry中引入，名字要和packjson的依赖相同
        *  这个是内置插件，所以要先将webpack引入
        * */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),

        // 将webpack模板代码单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'    //'runtime'也可以
        }),

        // 压缩css
        new OptimizeCssPlugin(),

        // 压缩JS
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap:true    //可选参数，实现sourceMap
        }),

        /*
        * 问题：
        *     每次打包时，如果某些文件有变化，默认会重新打包所有的文件，
        *     如果文件过大，就会很降低效率。
        * 原因：
        *     生所有模块，都有自己的id，
        *     先用一个模块数组，收集所有模块，也就有了下标，正好作为id
        *     默认hash值，是根据文件内容+id产生
        *     所以id发生了变化，就会产生变化，
        *     所以当减少一个模块时，某些模块的下标就会发生变化，对应的hash名就会发生变化
        * 解决，
        *     根据代码内容生成hash作为模块的id，
        *     使用md5函数，只要内容不变，文件名就不变，也就是模块的MD5hash值
        * */
        new webpack.HashedModuleIdsPlugin(),
    ],

    //开启sourceMap
    devtool: 'source-map'
})