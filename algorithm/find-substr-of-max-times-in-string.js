/**
 * find max char in string
 *
 * 用ES6的for of，兼容汉字中单字符4个字节，length=2的情况,如'𠮷'
 */

// array
// 最多的字符可能是多个
const findMaxCountByArray = function (string) {
    let maxTimes = 0,
        maxChars = [];
    let arr = {};

    for(let s of string) {
        arr[s] || (arr[s] = 0)
        arr[s]++
        if (arr[s] > maxTimes) {
            maxTimes = arr[s]
            maxChars = [s]
        } else if (arr[s] === maxTimes) {
            maxChars.push(s)
        }
    }

    return {maxTimes, maxChars};
};


// regexp
// 最多的字符可能是多个
const findMaxCountByRegexp = function (string) {
    let maxTimes = 0,
        maxChars = [];
    let arr = string.split('').sort().join('');

    arr.replace(/(.)\1*/g, (r1, r2) => {
        // r1.length 字符编码大于0xFFFF
        if (r1.length > maxTimes) {
            maxTimes = r1.length
            maxChars = [r2]
        } else if (r1.length === maxTimes) {
            maxChars.push(r2)
        }
    })

    return {maxTimes, maxChars};
};

/// String.prototype.split
// split & charAt都不支持字符编码大于0xFFFF
const findMaxCountBySplit = function (string) {
    let maxTimes = 0,
        maxChars = [];

    while(string) {
        let char = string.charAt(0),
            charStr = string.split(char).join(''),
            length = string.length - charStr.length;

        if (length > maxTimes) {
            maxTimes = length;
            maxChars = [char];
        } else if (length === maxTimes) {
            maxChars.push(char)
        }

        string = charStr;
    }

    return { maxTimes, maxChars};
};

module.exports = {
    findMaxCountBySplit,
    findMaxCountByArray,
    findMaxCountByRegexp,
}