

const addArticle = async (ctx,next)=>{

	if(!ctx.session.name) {
		ctx.body = {
			status:'userNotLogin',
			msg:'用户未登录',
		}
		return;
	}

	// 如果内容填写不全返回错误
	if( !ctx.request.body.title || !ctx.request.body.category || !ctx.request.body.content || !ctx.request.body.introduction) {
		log('内容未填写完整')
		ctx.body = {
			status:'error',
			msg:'内容未填写完整',
		}
		return;
	}


	// 插入文章
	await M.article.create({
		title:ctx.request.body.title.toString(),
		category:ctx.request.body.category.toString(),
		content:ctx.request.body.content.toString(),
		date:new Date(),
		introduction:ctx.request.body.introduction.toString(),
		author:ctx.session.name})
	.then((obj)=>{
		log('文章保存成功')
		ctx.body = {
			status:'success',
			msg:'文章保存成功',
		}
		return;
	},(err)=>{
		if(err){
			log('文章保存失败')
			ctx.body = {
				status:'error',
				msg:'文章保存失败',
			}
		}
	})

	return;
}


const findArticle = async (ctx,next)=>{


	// if(!ctx.session.name) {
	// 	ctx.body = {
	// 		status:'userNotLogin',
	// 		msg:'用户未登录',
	// 	}
	// 	return;
	// }

	// 查询所有文章
	await M.article.find({},{title:1,author:1,introduction:1,date:1,category:1},{sort: {'_id':-1}},(err, obj)=>{
		if(err){
			log('查询所有文章出错')
			ctx.body = {
				status:'error',
				msg:'查询所有文章出错',
			}
			return;
		}

		log('文章查询成功')
		ctx.body = {
			status:'success',
			data:obj,
			msg:'文章查询成功',
		}
		return;
	})
}

const findSomeArticle = async (ctx,next)=>{


	// if(!ctx.session.name) {
	// 	ctx.body = {
	// 		status:'userNotLogin',
	// 		msg:'用户未登录',
	// 	}
	// 	return;
	// }

	// 查询所有文章
	await M.article.find(ctx.request.body,{},{sort: {'_id':-1}},(err, obj)=>{
		if(err){
			log('查询部分文章出错')
			ctx.body = {
				status:'error',
				msg:'查询部分文章出错',
			}
			return;
		}

		log('部分文章查询成功')
		ctx.body = {
			status:'success',
			data:obj,
			msg:'部分文章查询成功',
		}
		return;
	})
}

export default {
	addArticle,
	findArticle,
	findSomeArticle,
}
