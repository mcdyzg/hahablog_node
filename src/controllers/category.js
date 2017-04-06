import {getResponse} from '../helpers'

const addCategory = async (ctx,next)=>{

	// 如果分类名称未填写返回错误
	if( !ctx.request.body.category) {
		log('分类名称未填写')
		ctx.body = getResponse(false,'cententNotFinash')
		return;
	}

	// 如果分类已经存在，返回分类已存在
	await M.category.find({category:ctx.request.body.category},function(err, obj){
		if(err){
			log('查询分类时错误')
			ctx.body = getResponse(false,'dbError')
			ctx.notAllowAddCategory = true;
			return;
		}
		if(obj.length !== 0){
			log('分类已经存在')
			ctx.body = getResponse(false,'categoryExist')
			ctx.notAllowAddCategory = true;
			return;
		}
	})
	if(ctx.notAllowAddCategory){
		return;
	}

	// 如果分类不存在，创建分类
	await M.category.create({
		category:ctx.request.body.category.toString(),
		author:ctx.session.name
	})
	.then((obj)=>{
		log('分类添加成功')
		ctx.body = getResponse(true)
		return;
	},(err)=>{
		if(err){
			log('分类添加时报错')
			ctx.body = getResponse(false,'dbError')
		}
	})

	return;

}


const findCategory = async (ctx,next)=>{
	let body = ctx.request.body;
	let where = {}

	if(body.type = 'dashboard'){
		where.author = ctx.session.name;
	}
	await M.category.find(where,(err, obj)=>{
		if(err){
			log('查询分类时出错')
			ctx.body = getResponse(false,'dbError')
			return;
		}

		log('分类查询成功')
		ctx.body = getResponse(true, obj)
		return;
	})
	return;
}

const removeCategory = async (ctx,next)=>{

	await M.category.remove({category:ctx.request.body.category},(err, obj)=>{
		if(err){
			log('未找到该分类')
			ctx.body = getResponse(false, 'dbError')
			return;
		}

		log('分类删除成功')
		ctx.body = getResponse(true)
		return;
	})
	return;
}

export default {
	addCategory,
	findCategory,
	removeCategory,
}
