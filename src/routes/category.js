import Router from 'koa-router'
import category from '../controllers/category'
import auth from '../controllers/auth'

const router = new Router({
  prefix: '/API'
});

router.post('/addCategory',		auth.checklogin, category.addCategory);
router.post('/findCategory',	category.findCategory);
router.post('/removeCategory',	auth.checklogin, category.removeCategory);


export default router
// module.exports = router;