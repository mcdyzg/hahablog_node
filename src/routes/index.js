import Router from 'koa-router'
import path from 'path'
import fs from 'fs'
import auth from '../controllers/auth'
import article from '../controllers/article'
import category from '../controllers/category'

const router = Router();

const basename = path.basename(module.filename);

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (path.extname(file) !== '') && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(function(file) {
    let route = require(path.join(__dirname, file));
    // console.log(route)
    router.use(route.default.routes());
});

export default router