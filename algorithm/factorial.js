/**
 * 阶乘 n!
 * 0! === 1
 */

// recursive
// Maximum call stack size exceeded
exports.factorial = function fact(n) {
    return n === 1 ? n : (n * fact(n - 1))
}

// loop
exports.factorialLoop = n => {
    let ret = 1
    while(n > 1) {
        ret *= n
        n--
    }
    return ret
}

/**
 * 尾递归优化版本
 * 不知道为什么还是报调用堆栈溢出
 */
exports.tailFactorial = function tailFactorial (n, total = 1) {
    'use strict'

    if (n === 1) {
        return total
    }
    return tailFactorial(n - 1, n * total)
}