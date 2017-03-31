import router from 'koa-router'
import auth from '../controllers/auth'
import article from '../controllers/article'
import category from '../controllers/category'

const APIRouter = new router({
  prefix: '/API'
});
const PageRouter = new router();

const routes = app =>{

	// 将所有的get请求都导向主页
	PageRouter.get('/*',			async (ctx)=>{
		await ctx.render('index.html')
	})

	APIRouter.post('/signin',		auth.signin);
	APIRouter.post('/signup',		auth.signup);

	APIRouter.post('/addArticle',	article.addArticle);
	APIRouter.post('/findArticle',	article.findArticle);
	APIRouter.post('/findSomeArticle',article.findSomeArticle);

	APIRouter.post('/addCategory',	category.addCategory);
	APIRouter.post('/findCategory',	category.findCategory);
	APIRouter.post('/removeCategory',category.removeCategory);

	app.use(PageRouter.routes());
	app.use(APIRouter.routes());
}

export default routes