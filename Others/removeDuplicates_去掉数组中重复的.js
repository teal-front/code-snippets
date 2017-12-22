/*
	去掉Javscript数组中的重复元素
	只对String类的有效,Number,Object,boolean,NaN,undefined都无效
*/
function removeDuplicates(arr) {
    var temp = {};
    for (var i = 0; i < arr.length; i++)
        temp[arr[i]] = true;
  
    var r = [];
    for (var k in temp) //k => "string"
        r.push(k);
    return r;
}
 
//用法
var fruits = ['apple', 'orange', 'peach', 'apple', 'strawberry', 'orange'];
var uniquefruits = removeDuplicates(fruits);
//输出 uniquefruits ['apple', 'orange', 'peach', 'strawberry'];