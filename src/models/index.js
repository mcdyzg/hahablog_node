import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import config from '../config'

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.connect(config().db,{},function(err, res){
	if(err){
		console.log('数据库连接错误')
	}
});

const models = {};
const basename = path.basename(module.filename);

function eachFiles(){
	fs.readdirSync(__dirname).forEach(function (name) {
		let temName = path.basename(name,'.js');
	  	if (path.extname(name) !== '' && name!==basename) {
	  		let schema = require(path.join(__dirname, name)).default(Schema);

	  		let newSchema = new mongoose.Schema(schema, { collection: temName });

	  		models[temName] = mongoose.model(temName, newSchema)
	  	} else if (name !== '.DS_Store' && name!=='index.js') { // 如果是文件夹并且不等于排除目录，则递归继续往下找(".DS_Store"为mac缓存，这里特殊处理)
	  	  	eachFiles(path.join(__dirname, name));
	  	}
	})
	return models;
}

export default eachFiles;