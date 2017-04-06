
// 主页
const index = async (ctx,next)=>{
	await ctx.render('index',{
		env: process.env.NODE_ENV === 'development'
	});
}


export default {
	index
}
