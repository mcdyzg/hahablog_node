import path from 'path'

function config(root){
	return {
		controllers : path.normalize(root+'/controllers/'),
		category : path.normalize(root + '/docs')
	}
}

export default config;