import path from 'path'


function config(root){
	if(process.env.NODE_ENV === 'production'){
		return {
			controllers : path.normalize(root+'/controllers/'),
			category : path.normalize(root + '/docs'),
			models : path.normalize(root + '/models'),
			db :'mongodb://hahablog:ljh123456@localhost:27017/hahablog'
		}
	}else{
		return {
			controllers : path.normalize(root+'/controllers/'),
			category : path.normalize(root + '/docs'),
			models : path.normalize(root + '/models'),
			db :'mongodb://hahablog:ljh123456@172.19.195.64:27017/hahablog'
		}
	}	
}

export default config;

