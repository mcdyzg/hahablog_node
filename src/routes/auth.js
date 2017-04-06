import Router from 'koa-router'
import auth from '../controllers/auth'

const router = new Router({
  prefix: '/API'
});

router.post('/signin',		auth.signin);
router.post('/signup',		auth.signup);
router.post('/signout',		auth.signout);
router.post('/getName',		auth.checklogin, auth.getName);


export default router
// module.exports = router;