/*
* 开发环境的配置
* */

//引入基础配置
const baseConfig = require('./webpack.base.conf');
//为了在webpack配置时，可以使用其他的配置文件（如 baseConfig）
const merge = require('webpack-merge');


//webpack配置
module.exports = merge(baseConfig, {  // 配置对象

    //入口，baseConfig已实现

    //出口，baseConfig中没有指定filename
    output:{
        filename: '[name].js'   // [name]就是baseConfig中配置的入口的属性名 app
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
                * 数组中的元素，会顺序执行的。下面写法的会先执行 css-loader，
                * style(css(css文件))，也就是函数嵌套的形式
                *    css-loader，将css文件变为 js模块文件
                *    style-loader，将生成的 js文件，添加到页面的 <style>标签中
                * */
                use: ['style-loader', 'css-loader']
            }

            // 加载img，baseConfig已实现
        ]
    },

    //插件，这里不再需要其他，baseConfig已实现。

    /*
    *  开启开发环境下的: sourceMap调试
    *  可以实现，在出错时，可以定位到源文件的位置，而不是最终生成的 js文件
    * */
    devtool: 'cheap-module-eval-source-map',
})