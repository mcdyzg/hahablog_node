# hahablog_node

koa2做的博客后台，后期可修改为bbs系统。

### Usage

```
** mongoDB runnig **
1. npm install
2. npm start
3. open localhost:3002
```
	
### Features

* koa2
* koa-router@next
* koa-session-minimal
* mongoose
* nodemon
* marked



### 目录结构
```
├── src
│   ├── helpers   	
│   ├── controllers						
│   ├── static	
│   ├── models
│   ├── views
│   ├── routes
│   ├── config.js
│   └── app.js
├── index.js
├── package.json
└── README
```

### Explation

1. 提供登录注册功能，记住登录1小时。
2. 前台展示所有账号添加的所有文章
3. 控制台仅展示当前登录用户的所有文章
4. 添加文章前需要先添加分类，否则文章不能提交
5. 未添加分页。mark
6. 使用koa-generic-session-mongo存session，效率上比koa-redis低，但为了与数据存储共用一台mongo数据库，故为之。mark，以后修正。



