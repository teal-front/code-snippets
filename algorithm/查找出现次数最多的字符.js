/**
 * find max char in string
 *
 *
 * 用ES6的for of，兼容汉字中单字符4个字节，length=2的情况,如'𠮷'
 */

const string = 'aaaaaaaaaaaabbbbccccedaifoasflajwelasdflkiwero𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷';

/// 查找单个字符出现的次数：
string.match(new RegExp(char, 'g'))


const findMaxCount = function (string) {
    var charMap =  string.reduce(function (charMap, curChar) {
        charMap[curChar] || (charMap[curChar] = 0);
        charMap[curChar]++;
    }, {})
    // return charMap[]  todo
}

/// hash
// 从文本中找到出现最多的单词，也可以用这个方法
const findMaxCountByHash = function (string) {
    let maxLength = 0,
        maxChar = '';

    let map = {};
    for(let s of string) {
        map[s] || (map[s] = 0);
        map[s]++;

        if (map[s] > maxLength) {
            maxLength = map[s];
            maxChar = s;
        }
    }

    return {maxLength, maxChar};
};
console.dir(findMaxCountByHash(string));

// array
const findMaxCountByArray = function (string) {
    let maxLength = 0,
        maxChar = '';
    let arr = [], i = 0;

    for(let s of string) {
        let charCode = s.codePointAt(0);

        arr[charCode] || (arr[charCode] = 0);
        arr[charCode]++;

        if (arr[charCode] > maxLength) {
            maxLength = arr[charCode];
            maxChar = charCode;
        }
    }

    return {maxLength, maxChar: String.fromCodePoint(maxChar)};
};
console.dir(findMaxCountByArray(string));

/// String.prototype.split
// split & charAt都不支持字符编码大于0xFFFF
const findMaxCountBySplit = function (string) {
    let maxLength = 0,
        maxChar = '';

    while(string) {
        let char = string.charAt(0),
            charArr = string.split(char),
            length = string.length - charArr.join('').length;

        if (length > maxLength) {
            maxLength = length;
            maxChar = char;
        }

        string = charArr.join('');
    }

    return {maxLength, maxChar};
};
console.dir(findMaxCountBySplit(string));