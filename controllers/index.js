import fs from 'fs';
import path from 'path';

function eachFiles() {
    fs.readdirSync(C.controllers).forEach(function (name) {
      	if (path.extname(name) !== '' && name!=='index.js') {
      	  	F[name] = require('./' + name).default
      	} else if (name !== '.DS_Store' && name!=='index.js') { // 如果是文件夹并且不等于排除目录，则递归继续往下找(".DS_Store"为mac缓存，这里特殊处理)
      	  	eachFiles(path.join(C.controllers, name));
      	}
    })
}

export default eachFiles;