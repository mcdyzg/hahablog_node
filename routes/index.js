import router from 'koa-router'
import auth from '../controllers/auth'
const myRouter = router();

const routes = app =>{
	app.use(myRouter.routes());
	
	myRouter.get('/signin',auth.signin);
	myRouter.post('/signup',auth.signup);
}

export default routes