import Router from 'koa-router'
import home from '../controllers/home'

const router = new Router();

router.get('/',		home.index);


export default router
// module.exports = router;