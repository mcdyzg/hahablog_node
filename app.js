import Koa from 'koa'
// import render from './lib/render'
import router from 'koa-router'
import path from 'path'
import bodyParer from 'koa-bodyparser'
import cors from 'koa-cors'
import session from 'koa-session-minimal'
import redisStore from 'koa-redis'
import convert from 'koa-convert'

import controllers from './controllers';
import models from './models';
import config from './config';
import util from './lib/util'


const app = new Koa();
app.keys = ['keys', 'keykeys'];
app.use(session({
  store: redisStore(),
  cookie: ctx => ({
    maxAge: 24 * 60 * 60 * 1000
  })
}));
const myRouter = router();


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



//===================初始化model
models()



//===================初始化控制器
controllers(myRouter)



//===================body解析
app.use(bodyParer())



//===================设置允许跨域
app.use(cors())



//===================初始化router
app.use(myRouter.routes())

log('222222222')



app.listen(3000)
