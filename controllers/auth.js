
// 登录
const signin = async (ctx,next)=>{
	if(!ctx.request.body.name || !ctx.request.body.pwd){
		log('用户名或密码不正确')
		ctx.body = {
			status:'error',
			msg:'用户名或密码不正确',
		}
		return;
	}

	// 查找用户名，如果不存在报错
	await M.user.find({name:ctx.request.body.name,pwd:ctx.request.body.pwd})
	.then((obj)=>{
		if(obj.length !== 0){
			log('用户登录成功')
			ctx.body = {
				status:'success',
				msg:'登录成功',
				data:{
					name:ctx.request.body.name,
				},
			}
			ctx.session = {
				name:ctx.request.body.name,
				pwd:ctx.request.body.pwd,
				status: 'hasLogin'
			}
		}else{
			log('用户名或密码不正确')
			ctx.body = {
				status:'error',
				msg:'用户名或密码不正确',
			}
		}
		return
	},(err)=>{
		log(err)
		ctx.body = {
			status:'error',
			msg:'服务器错误',
		}
		return
	})
}

// 注册
const signup = async (ctx,next)=>{


	// 用户名或密码不存在时报错
	if(!ctx.request.body.name || !ctx.request.body.pwd) {
		log('用户不存在')
		ctx.body = {
			status:'error',
			msg:'用户名或密码未输入',
		}
		return;
	}

	// 如果数据库已存在用户名，报用户已存在
	await M.user.find({name:ctx.request.body.name},function(err, obj){
		if(err){
			log('注册检查用户名时出错')
			ctx.body = {
				status:'error',
				msg:'注册检查用户名时出错',
			}
			ctx.notAllowRegister = true;
			return;
		}
		if(obj.length !== 0){
			log('用户已存在')
			ctx.body = {
				status:'error',
				msg:'用户已存在',
			}
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
		ctx.body = {
			status:'success',
			msg:'注册成功',
		}
		ctx.session = {
			name:ctx.request.body.name,
			pwd:ctx.request.body.pwd,
			status: 'hasLogin'
		}
		return;
	},(err)=>{
		if(err){
			log('用户注册时报错')
			ctx.body = {
				status:'error',
				msg:'用户注册时报错',
			}
		}
	})

	return;
}

export default {
	signup,
	signin
}
