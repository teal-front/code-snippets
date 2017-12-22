//---------RegExp.prototype.replace的妙用
var str = '584228855';
str.replace(/[\w]{2}/g,function(i){return '%'+i;});
//str.replace的函数方法
function addP(str) { 
	var halfLength=Math.ceil(str.length/2);
	var arr=str.split("");
	var arr_=[];
	for(var i=0; i<halfLength; i++) {
		arr_[i]='%'+arr.splice(0,2).join('');
	}
	return arr_.join('');
} 

/**
 * common reg pattern
 */
var zh_re = /[\u4e00-\u9fa5]/; //中文
var sim_re = /[\x00-\xff]/;   //半角字符