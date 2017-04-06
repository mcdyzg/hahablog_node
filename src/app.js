import Koa from 'koa'
// import render from './lib/render'
import path from 'path'
import bodyParer from 'koa-bodyparser'
import cors from 'koa-cors'
import session from 'koa-session-minimal'
import serve from 'koa-static'
import mongoStore from 'koa-generic-session-mongo'
import convert from 'koa-convert'
import views from 'koa-views'

import models from './models';
import config from './config';
import router from './routes';


const app = new Koa();




/**
     * ===================自定义部分=====================
     * C全局静态配置
     * D全局数据模型
     * G全局动态变量
     * R全局请求
     */
    global.C = {}; //C for config
    global.M = {}; //M for db model
    global.F = {}; //F for function
    global.G = {};
    global.log = function(data){console.log(data)}


    //C-配置文件 F-内置函数 M-数据库类



//===================获取配置内容
global.C = config(path.resolve(__dirname))






//===================渲染页面
app.use(views(__dirname + '/views', {
  map: {
    html: 'lodash'
  }
}));




//===================初始化静态资源
app.use(serve(__dirname + '/static')); 






//===================session初始化
app.keys = ['keys', 'keykeys'];
app.use(session({
  store: new mongoStore({
    url:C.db
  }),
  // 设置cookie和session保存时间,如果不设置，那么cookie maxAge = 0，session = 一天
  cookie: ctx => ({
    maxAge: 60 * 60 * 1000
  })
}));



//===================初始化model
global.M = models()



//===================body解析
app.use(bodyParer())



//===================设置允许跨域
// app.use(cors({
//     // 设置允许传递cookie
//     credentials:true
// }))



//===================初始化router
app.use(router.routes());

log('start complete')




app.listen(3002)
