import {getResponse} from '../helpers'
import _cloneDeep from 'lodash/cloneDeep'

const addArticle = async (ctx,next)=>{

	// 如果内容填写不全返回错误
	if( !ctx.request.body.title || !ctx.request.body.category || !ctx.request.body.content || !ctx.request.body.introduction) {
		log('内容未填写完整')
		ctx.body = getResponse(false,'cententNotFinash');
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
		ctx.body = getResponse(true);
		return;
	},(err)=>{
		if(err){
			log('文章保存失败')
			ctx.body = getResponse(false,'dbError');
		}
	})

	return;
}

// 展示页面显示所有文章
const findArticle = async (ctx,next)=>{
	let body = ctx.request.body;
	let where = {};
	if(body.type === 'dashboard'){
		where.author = ctx.session.name;
	}

	// 查询所有文章
	await M.article.find(where,{title:1,author:1,introduction:1,date:1,category:1},{sort: {'_id':-1}},(err, obj)=>{
		if(err){
			log('查询所有文章出错')
			ctx.body = getResponse(false,'findAllError');
			return;
		}

		log('文章查询成功')
		ctx.body = getResponse(true,obj);
		return;
	})
}

// 查询部分文章
const findSomeArticle = async (ctx,next)=>{
	let body = ctx.request.body;
	let where = _cloneDeep(body);
	if(body.type === 'dashboard'){
		where.author = ctx.session.name;
		delete where.type
	}

	await M.article.where(where)
		.select('title author introduction date category content')
		.sort({_id:'desc'})
		.then((obj)=>{
			if(obj){
				log('部分文章查询成功')
				ctx.body = getResponse(true,obj);
			}
		},(err)=>{
			log('查询部分文章出错')
			ctx.body = getResponse(false,'findSomeError');
		})
}

export default {
	addArticle,
	findArticle,
	findSomeArticle,
}
