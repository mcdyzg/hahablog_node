import fs from 'fs'
import path from 'path'

function article(router){
	
	router.get('/1',(ctx,next)=>{
		ctx.body = 'ssss'
	})
	// 登录
	.get('/signin',async (ctx,next)=>{
		ctx.body = 'dddd'
		await M.user.find({name:'haha'},function(err, obj){
			if(err){
				console.log('出错')
			}
			console.log(obj)
		})
	})
	// 注册
	.post('/signup',async (ctx,next)=>{

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
			log(ctx.session)
			ctx.session.asdf = '111'
			log(ctx.session)
			log('1111')
			return
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

		return
		
		// 如果用户不被允许注册，return
		if(ctx.notAllowRegister){
			return;
		}
		
		log(ctx.request.body.name)
		log(ctx.request.body.pwd)
		// 如果用户不存在，创建用户
		// await M.user.create({name:ctx.request.body.name,pwd:ctx.request.body.pwd},function(err, obj){
		// 	if(err){
		// 		log('用户注册时报错')
		// 		ctx.body = {
		// 			status:'error',
		// 			msg:'用户注册时报错',
		// 		}
		// 		return;
		// 	}
			
		// 	log('用户注册成功')
		// 	ctx.body = {
		// 		status:'success',
		// 		msg:'注册成功',
		// 	}
		// 	return;
		// })
	})
} 
export default article;