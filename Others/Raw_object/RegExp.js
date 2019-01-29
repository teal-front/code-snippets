// \1
/(\d)\1*/   // \n为正则表达示里面的匹配，相当于replace函数中的r1，replace中的$1
'111222333333'.replace(/(\d)/g, (r1, r2) =>　)

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

// \b
// The \b metacharacter is used to find a match at the beginning or end of a word.
// 只是用过判断单词的开始或结束的, 空格或'-'都可以成为单词的结束
// 所以并不能用在判断classname
'js-class-abc-xxx'.match(/\bjs-class-abc\b)  // => false

/**
 * common reg pattern
 */
var zh_re = /[\u4e00-\u9fa5]/; //中文
var sim_re = /[\x00-\xff]/;   //半角字符
