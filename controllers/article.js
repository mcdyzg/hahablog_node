import fs from 'fs'
import path from 'path'

function article(){
	// router.post('/article/insert',function*(next){
	// 	if(U.isEmptyObject(this.request.body)) {
	// 		console.log('无内容')
	// 		return yield next;
	// 	}

	// 	// 写入docs文件夹
	// 	fs.writeFileSync(path.join(C.category,this.request.body.category,this.request.body.title+'.md'),this.request.body.content);

	// 	this.status = 200;
	// 	this.body = {
	// 		status:'ok'
	// 	}
	// 	// yield next;
	// }).get('/category/find',function*(next){
	// 	const cate = [];
	// 	fs.readdirSync(C.category).forEach(function(name){
	// 		if (path.extname(name) === '') {
	//       	  	cate.push(name)
	//       	}
	// 	})
	// 	this.body = cate
	// })
} 
export default article;