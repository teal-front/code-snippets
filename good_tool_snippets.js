/**
 * 固定的概率
 *from: fun.alipay.com/sitemap/index.htm
 */
//p.s. Math.random() => [0, 1)
// @param {Number} rate, 指定概率，[0,1] 区间的数值。
// @return {Boolean}
function hit(rate){ //.3
    return 0 === Math.floor(Math.random() / rate);
}

/**
 * change value
 */
var a = 5, b = "string";
//1.middle varanibel
var tmp; tmp = a; a = b; b = tmp;
//2.array
a = [a, b]; b = a[0]; a = a[1]; // !
console.log(a, b);

/**
 * 随机打乱数组
 */
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
array.sort(function () {
    return Math.random() > .5 ? -1 : 1;
    //return 0 === Math.floor(Math.random()) / .5 ? -1 : 1;
});

/**
 * 操作动态数组
 */
var dynamicArray = {
    array: [1, 3, 5, 6, 8, 10, 11],
    tick: function () {
        var i = 0;
        for (; i < this.array.length; i++) {
            console.log(this.array, this.array[i]);
            if (!this.timer()) {
                this.array.splice(i--, 1);
            } else {
                this.array.splice(i, 1, true);
            }
        }
    },
    timer: function () {//50% percent
        return 0 === Math.floor(Math.random() / .5);
    }
};

dynamicArray.tick();

//is empty object
function isEmptyObject( obj ){
    for( var i in obj ){
        return false;
    }
    return true;
}

//is HTMLElement
function isNode (ele) {
    return !!ele.nodeType;  //HTMLElement.nodeType >= 1
}

//0与1的对调
function switchBit (i){
    return i ^ 1;
}

//space-separated string to array : " a b c " => ["a", "b", "c"]
var space_separated_string = " a b c ";
space_separated_string.replace(/(^\s+|\s+$)/, "").split(/\s+/); //method one
space_separated_string.match(/\S+/g); //method two

//has property: 直接用对象的值来储存，看某个property在不在对象结构里
var cssNumber = {
    "fillOpacity": true,
    "fontWeight": true,
    "lineHeight": true,
    "opacity": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true
};
cssNumber[p] ? "" : "px";

//inArray的If语句的简写
jQuery.inArray //=> [-1, ∞)
~-1 === 0  //=>false
~0 === -1  //=>true
~1 === -2  //=>true
~2 === -3  //=>true
if (jQuery.inArray(1, [1, 4]) > 0) {
    //elem in array
}
if (~jQuery.inArray(1, [1, 4])) {
    //elem in array
}

//判断单词首字母是不是大写的
var string = "Words";
string[0] === string[0].toUpperCase()

/**
 * sameValueZero
 */
const assert = require('assert')

0 === -0                      // => true
Object.is(0, -0)              // => false
assert.notStrictEqual(0, -0)  // => AssertionError [ERR_ASSERTION]: 0 !== -0

NaN === NaN                      // => false
Object.is(NaN, NaN)              // => true
assert.strictEqual(NaN, NaN)    // => AssertionError [ERR_ASSERTION]: NaN === NaN

/// 查找单个字符出现的次数,可以处理多字节字符
const findMaxTimesChar1 = (str, char) => {
    return (str.match(new RegExp(char, 'g')) || []).length
}
/// 查找单个字符出现的次数,不能处理多字节字符(> u0xFFFF)
const findMaxTimesChar2 = function (string, char) {
    let splitStr= string.split(char).join('')
    return string.length - splitStr.length
}