//判断是否是数组
var is_array = function (value) {
	/*return value&&
		typeof value === "object"&&
		value.constructor === Array;*/ //得value所在的window对象跟当前的window是同一个。不同的页面框架(frames)有不同的Window对象
	return Object.prototype.toString.call(value) === "[object Array]";	
};
//数组的初始化构造
new Array(num);

Array.dim = function (dimention, initial) {
		var a = [], i;
		for (i = 0; i<dimention; i+=1) {
			a[i] = initial;	
		}
		return a;
};
var a5 = Array.dim(5, 0);


//Array.prototype.reduce && Array.prototype.reduceRight
var dupArray = [[1, 3], [2, 4], [5, 7]];
var ret2 = dupArray.reduce(function (memory, value) {
  return memory.concat(value);
}, [9]);
console.log("ret2: " , ret2);
//=> [9, 1, 3, 2, 4, 5, 7]