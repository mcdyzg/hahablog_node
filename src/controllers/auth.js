import { getResponse } from '../helpers'
// 登录
const signin = async (ctx,next)=>{
	if(!ctx.request.body.name || !ctx.request.body.pwd){
		log('用户名或密码不正确')
		ctx.body = getResponse(false,'authError');
		return;
	}

	// 查找用户名，如果不存在报错
	await M.user.find({name:ctx.request.body.name,pwd:ctx.request.body.pwd})
	.then((obj)=>{
		if(obj.length !== 0){
			log('用户登录成功')
			ctx.body = getResponse(true,{name:ctx.request.body.name});
			ctx.session = {
				name:ctx.request.body.name,
				pwd:ctx.request.body.pwd,
				status: 'hasLogin'
			}
		}else{
			log('用户名或密码不正确')
			ctx.body = getResponse(false,'authError');
		}
		return
	},(err)=>{
		log(err)
		ctx.body = getResponse(false,'dbError');
		return
	})
}

// 获取用户名
const getName = async (ctx,next)=>{
	if(ctx.session.status === 'hasLogin'){
		ctx.body = getResponse(true,{name:ctx.session.name});
	}else{
		ctx.body = getResponse(false,'userNotLogin');
	}
}

// 退出登录
const signout = async (ctx,next)=>{
	ctx.session = null;
	ctx.body = getResponse(false,'userNotLogin');
}

// 注册
const signup = async (ctx,next)=>{

	// 用户名或密码不存在时报错
	if(!ctx.request.body.name || !ctx.request.body.pwd) {
		log('用户不存在')
		ctx.body = getResponse(false,'inputNull');
		return;
	}

	// 如果数据库已存在用户名，报用户已存在
	await M.user.find({name:ctx.request.body.name},function(err, obj){
		if(err){
			log('注册检查用户名时出错')
			ctx.body = getResponse(false,'dbError');
			ctx.notAllowRegister = true;
			return;
		}
		if(obj.length !== 0){
			log('用户已存在')
			ctx.body = getResponse(false,'userExist');
			ctx.notAllowRegister = true;
			return;
		}
	})

	// 如果用户不被允许注册，终止执行
	if(ctx.notAllowRegister){
		return
	}
	
	
	// 如果用户不存在，创建用户
	await M.user.create({name:ctx.request.body.name.toString(),pwd:ctx.request.body.pwd.toString()})
	.then((obj)=>{
		log('用户注册成功')
		ctx.body = getResponse(true);
		ctx.session = {
			name:ctx.request.body.name,
			pwd:ctx.request.body.pwd,
			status: 'hasLogin'
		}
		return;
	},(err)=>{
		if(err){
			log('用户注册时报错')
			ctx.body = getResponse(false,'registerFail');
		}
	})

	return;
}

// 检查session是否生效
const checklogin = async (ctx,next)=>{
	if(ctx.session.status === 'hasLogin'){
		await next();
	}else{
		ctx.body = getResponse(false,'userNotLogin');
		// return;
	}
}

export default {
	getName,
	signup,
	signin,
	signout,
	checklogin
}
