/// flatten array
// 1. absolute flatten, no depth param
// [[1,[2,[[3]]]],4,[5,[[[6]]]]] => [1,2,3,4,5,6]
const flatten = list => list.reduce(
	(a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);
// 2. with depth param
function flatten(arr, depth = 1) {
	return arr.reduce((newArr, nextArr) => newArr.concat(depth > 1 && Array.isArray(nextArr) ? flatten(nextArr, depth - 1) : nextArr), [])
}

/// compose
/**
 * github: https://github.com/reduxjs/redux/blob/master/src/compose.js
 * @params {...function} [funcs] 函数
 */
function compose(...funcs) {
	if (funcs.length === 0) {
		return arg => arg
	}
	if (funcs.length === 1) {
		return funcs[0]
	}
	return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
// 分解
let fn = compose(
	returnC,
	returnB,
	returnA
)
fn('D')
// core 
[returnC, returnB, returnA].reduce((fn, nextFn) => {
	return (...args) => fn(nextFn(...args))
})
// 最后嵌套的函数
fn = (...args) => returnC(returnB(returnA(...args)))
const returnA = letter => {
	console.log(letter)
	return 'A'
}
const returnB = letter => {
	console.log(letter)
	return 'B'
}
const returnC = letter => {
	console.log(letter)
	return 'C'
}
let lastLetter = compose(
	returnC,
	returnB,
	returnA
)('D')
console.log(lastLetter) // C
// output: D A B C

/// Building-blocks to use for composition
const double = x => x + x;
const triple = x => 3 * x;
const quadruple = x => 4 * x;

// Function composition enabling pipe functionality
const pipe = (...functions) => input => functions.reduce(
    (acc, fn) => fn(acc),
    input
);

/// reduce mock
// recusive， 不支持reducer的第三四个参数即index, array
// acc === accumulate(累积)
// https://github.com/lodash/lodash/blob/master/.internal/arrayReduce.js
function arrayReduce(array, iteratee, accumulator, initAccum) {
	let index = -1
	const length = array == null ? 0 : array.length
  
	if (initAccum && length) {
	  accumulator = array[++index]
	}
	while (++index < length) {
	  accumulator = iteratee(accumulator, array[index], index, array)
	}
	return accumulator
  }
  
function reduce(arr, acc, callback) {
	if (arr.length === 0) {
		return acc
	}
	let [head, ...rest] = arr
	return reduce(rest, callback(acc, head), callback)
}
// loop
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
Object.defineProperty(Array.prototype, 'reduce', {
	value: function (callback) {
		var o = Object(this);
		var len = o.length >>> 0;
		var k = 0;
		var value;

		if (arguments.length >= 2) {
			value = arguments[1];
		} else {
			while (k < len && !(k in o)) {
				k++;
			}

			if (k >= len) {
				throw new TypeError('Reduce of empty array ' +
					'with no initial value');
			}
			value = o[k++];
		}

		while (k < len) {
			if (k in o) {
				value = callback(value, o[k], k, o);
			}
			k++;
		}

		return value;
	}
})

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
	var a = [],
		i;
	for (i = 0; i < dimention; i += 1) {
		a[i] = initial;
	}
	return a;
};
var a5 = Array.dim(5, 0);


//Array.prototype.reduce && Array.prototype.reduceRight
var dupArray = [
	[1, 3],
	[2, 4],
	[5, 7]
];
var ret2 = dupArray.reduce(function (memory, value) {
	return memory.concat(value);
}, [9]);
console.log("ret2: ", ret2);
//=> [9, 1, 3, 2, 4, 5, 7]