import path from 'path'

function config(root){
	return {
		controllers : path.normalize(root+'/controllers/'),
		category : path.normalize(root + '/docs'),
		models : path.normalize(root + '/models'),
		db :'mongodb://hahablog:ljh123456@localhost:27017/hahablog'
	}
}

export default config;