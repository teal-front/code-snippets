//使eval在全局作用域下执行，不然变量容易被函数作用域覆盖，取到错误的值
//new Function 里面是全局作用域
//from jQuery
var globalEval = function (src) {
	//IE: window.execScript
	(window.execScript || function (src) {
		//前面的window要带上，不然一些浏览器会出错
		window.eval.call(window, src);
	})(src);
};

//执行for-in循环时，JavaScript会先枚举非继承属性，再枚举从原型对象继承的属性。如果对象obj的最后一个属性是非继承属性，则认为所有属性都是非继承属性

//按位非运算符（～）会将运算数的所有位取反，相当于改变它的符号并且减1
~0 == -1; // true

//Sizzlejs的选择器查找 div > p 在从左向右的查找过程中，每次处理块间关系符时都需要处理未知数量的子元素或后代元素(从div里找P)，而在从右向左的查找过程中，处理块间关系符时只需要处理单个父元素或有限数量的祖先元素(查找p的父元素)。因此，在大多数情况下，采用从右向左的查找方式其效果要高于从左向右。

