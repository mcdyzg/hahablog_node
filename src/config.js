import path from 'path'


function config(root){
	if(process.env.NODE_ENV === 'production'){
		return {
			db :'mongodb://localhost:27017/hahablog'
		}
	}else{
		return {
			db :'mongodb://localhost:27017/hahablog'
		}
	}	
}

export default config;

