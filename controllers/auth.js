function auth(router){
	router.get('/signin',(ctx,next)=>{
		ctx.body = ctx.session
	})
}
export default auth;