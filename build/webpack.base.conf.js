/*
* 这是一个基础配置，开发环境或生产环境的配置，都会依赖这个基础文件
* */

const path = require('path');
//为了将生成的 js文件，写入HTML页面
const HtmlPlugin = require('html-webpack-plugin');

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
module.exports = {  // 配置对象

    //入口
    entry:{
        //app就是一个属性名，供其他依赖该文件的配置文件引入
        app:'./src/index.js', // 入口js的相对路径
    },

    //出口
    output:{
        //这里没有生成文件filename，因为不会使用这个文件生成，（开发环境，生产环境的基础文件）
        path:resolve('dist')    //所有！打包生成的文件的，基础路径
    },

    // 模块加载器
    module: {
        rules: [
            // 将es6编译为es5
            {
                test: /\.js$/,  //源文件格式（此处使用正则，表示所有以.js结尾的文件）
                loader: 'babel-loader',     //引入并使用对应的 loader，也可以使用数组格式
                include: [resolve('src')]   //只对该目录下的文件有效。
            },

            // 这里也不会加载css

            // 加载img
            {
                test: /\.(png|jpe?g|gif|svg)$/,  //jpe?g，说明 e可有可无
                /*
                *'file-loader'
                * 默认情况下，生成文件的文件名，是通过文件内容的 MD5hash算法生成额的，
                * 并具有源文件的，原始扩展名。
                * 1001d16d079ddfbc7fab94eea8974b11.jpg
                *
                * url-loader
                * 与 file-loader一样工作，但如果文件小于字节限制，则将文件加载为`base64`编码的URL
                * */
                loader: 'url-loader',
                options: {
                    limit: 1020*100, // 进行图片base64编码处理的文件最大值(100kb)
                    /*
                    *生成的文件路径和文件名（以 dist文件夹为基准）
                    * [name]图片本来的名字
                    * [hash:8]图片名后，添加一个hash算法的字符串，取前 8位
                    * [ext]使用原来的扩展名
                    *
                    * hash的作用，和文件名有关，唯一的，所以可以决定是否用到浏览器缓存
                    * */
                    name: 'static/img/[name].[hash:8].[ext]'    //[hash:8] 对应图片
                }
            }
        ]
    },

    //插件
    plugins:[
        //生成html
        new HtmlPlugin({ // 配置对象
            template: 'index.html', // 源文件，相对于当前目录查找
            filename: 'index.html', // 生成文件（以 dist文件夹为基准）
            inject: true // 向页面中自动引入打包生成的 js，（可以不写，因为默认值就是true）
        })
    ]
}