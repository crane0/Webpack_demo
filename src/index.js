// index.js是入口文件
/*
* export,import是 ES6的引入方式，
*   export暴露，是使用模块化的语言，将该暴露出的文件，封装为一个对象！
*     再 import..x..from引入，x就是一个对象，访问：x.暴露出的内容
*
*  所以，如果在源文件中，就是一个对象，就不需要 export暴露了，
*     所以，jQuery，lessons，不需要暴露，直接引入就可以使用。
*
*  而css样式，因为只需要有就可以了，在 js中不需要返回什么进行操作。
*    所以，不需要暴露，直接引入即可。
*
*  而 math中是 2个函数，没有对象封装，所以需要 export暴露，
*    在引入时，{cube}是通过解构赋值，来获取到 math.js中的 cude函数。
* */

import $ from 'jquery';
import {cube} from './js/math';
import lessons from './assets/json/lessons.json';
import './assets/css/style.css';

$(function () {
    console.log(cube(3))
    const $ul = $('<ul>')
    // 根据json数据显示一个列表
    lessons.forEach(lesson => {
        $ul.append(`<li>课程名: <span class="lesson-name">${lesson.name}</span>, 时间: ${lesson.days}天</li>`)
    })

    $('#app').append($ul)
    // 添加一个按钮
    const $button = $('<button>去尚硅谷吗?</button>')
    $button.appendTo('#app').on('click', () => {
      /*
      * 异步加载远程的atguigu模块
      * 这import()加载的模块，会被单独打包，只有执行import()时，才去后台请求
      *     路由懒加载就这样实现的。
      * */
        import('./js/atguigu').then(atguigu => {
            if(atguigu.studyConfirm()) {
                atguigu.goAtguigu()
            }
        })
    })
})
