import Koa from 'koa'
// import render from './lib/render'
import path from 'path'
import bodyParer from 'koa-bodyparser'
import cors from 'koa-cors'
import session from 'koa-session-minimal'
// import redisStore from 'koa-redis'
import mongoStore from 'koa-generic-session-mongo'
import convert from 'koa-convert'

import models from './models';
import config from './config';
import routes from './routes';
import util from './lib/util'


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
    global.U = {}; //U for util
    global.log = function(data){console.log(data)}


    //C-配置文件 F-内置函数 M-数据库类



//===================获取配置内容
global.C = config(path.resolve(__dirname))



//===================获取工具类
global.U = util;




//===================session初始化
app.keys = ['keys', 'keykeys'];
app.use(session({
  store: new mongoStore({
    url:'mongodb://hahablog:ljh123456@localhost:27017/hahablog'
  }),
  // 设置cookie和session保存时间,如果不设置，那么cookie maxAge = 0，session = 一天
  // cookie: ctx => ({
  //   maxAge: 24 * 60 * 60 * 1000
  // })
}));



//===================初始化model
models()



//===================body解析
app.use(bodyParer())



//===================设置允许跨域
app.use(cors({
    // 设置允许传递cookie
    credentials:true
}))



//===================初始化router
routes(app)

log('222222222')



app.listen(3000)
