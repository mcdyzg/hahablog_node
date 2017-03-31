

const addCategory = async (ctx,next)=>{

	if(!ctx.session.name) {
		ctx.body = {
			status:'userNotLogin',
			msg:'用户未登录',
		}
		return;
	}

	// 如果分类名称未填写返回错误
	if( !ctx.request.body.category) {
		log('分类名称未填写')
		ctx.body = {
			status:'error',
			msg:'分类名称未填写',
		}
		return;
	}

	// 如果分类已经存在，返回分类已存在
	await M.category.find({category:ctx.request.body.category},function(err, obj){
		if(err){
			log('查询分类时错误')
			ctx.body = {
				status:'error',
				msg:'查询分类时错误',
			}
			ctx.notAllowAddCategory = true;
			return;
		}
		if(obj.length !== 0){
			log('分类已经存在')
			ctx.body = {
				status:'error',
				msg:'分类已经存在',
			}
			ctx.notAllowAddCategory = true;
			return;
		}
	})
	if(ctx.notAllowAddCategory){
		return;
	}

	// 如果分类不存在，创建分类
	await M.category.create({category:ctx.request.body.category.toString()})
	.then((obj)=>{
		log('分类添加成功')
		ctx.body = {
			status:'success',
			msg:'分类添加成功',
		}
		return;
	},(err)=>{
		if(err){
			log('分类添加时报错')
			ctx.body = {
				status:'error',
				msg:'分类添加时报错',
			}
		}
	})

	return;

}


const findCategory = async (ctx,next)=>{

	// if(!ctx.session.name) {
	// 	ctx.body = {
	// 		status:'userNotLogin',
	// 		msg:'用户未登录',
	// 	}
	// 	return;
	// }

	await M.category.find({},(err, obj)=>{
		if(err){
			log('查询分类时出错')
			ctx.body = {
				status:'error',
				msg:'查询分类时出错',
			}
			return;
		}

		log('分类查询成功')
		ctx.body = {
			status:'success',
			data:obj,
			msg:'分类查询成功',
		}
		return;
	})
	return;
}

const removeCategory = async (ctx,next)=>{

	if(!ctx.session.name) {
		ctx.body = {
			status:'userNotLogin',
			msg:'用户未登录',
		}
		return;
	}

	await M.category.remove({category:ctx.request.body.category},(err, obj)=>{
		if(err){
			log('未找到该分类')
			ctx.body = {
				status:'error',
				msg:'未找到该分类',
			}
			return;
		}

		log('分类删除成功')
		ctx.body = {
			status:'success',
			msg:'分类删除成功',
		}
		return;
	})
	return;
}

export default {
	addCategory,
	findCategory,
	removeCategory,
}
