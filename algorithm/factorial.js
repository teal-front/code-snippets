'use strict'

/**
 * 阶乘 n!
 * 0! === 1
 */

/**
 * 尾递归优化版本
 */
exports.tailFactorial = function tailFactorial(n, total = 1) {
    // 函数体内使用严格模式会报错，因为用到了默认参数
    // 'use strict'
    if (n === 1) {
        return total
    }
    return tailFactorial(n - 1, n * total)
}

// recursive
// Maximum call stack size exceeded
exports.factorial = function fact(n) {
    return n === 1 ? n : (n * fact(n - 1))
}

// loop
exports.factorialLoop = n => {
    let ret = 1
    while (n > 1) {
        ret *= n
        n--
    }
    return ret
}
