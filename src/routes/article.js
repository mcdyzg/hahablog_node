import Router from 'koa-router'
import article from '../controllers/article'
import auth from '../controllers/auth'

const router = new Router({
  prefix: '/API'
});

router.post('/addArticle',		auth.checklogin, article.addArticle);
router.post('/findArticle',		article.findArticle);
router.post('/findSomeArticle',	article.findSomeArticle);


export default router
// module.exports = router;