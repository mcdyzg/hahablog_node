import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


function eachFiles() {
	mongoose.connect(C.db);
    fs.readdirSync(C.models).forEach(function (name) {
    	let temName = path.basename(name,'.js');
      	if (path.extname(name) !== '' && name!=='index.js') {
      	  	M[temName] = mongoose.model(temName, new Schema(require(path.join(C.models, name)).default(Schema)));
      	} else if (name !== '.DS_Store' && name!=='index.js') { // 如果是文件夹并且不等于排除目录，则递归继续往下找(".DS_Store"为mac缓存，这里特殊处理)
      	  	eachFiles(path.join(C.models, name));
      	}
    })
}

export default eachFiles;