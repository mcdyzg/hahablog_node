import errors from './errorCode'

export function getResponse(tag, data){
	if(tag){
		return {
			status:'success',
			data:data || {}
		}
	}else{
		return {
			status: data,
			msg:errors[data] || '未知错误'
		}
	}
}