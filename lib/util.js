let total = {}
total.isEmptyObject = function(obj){
  	for(var key in obj){
            return false
       };
       return true
};
export default total;