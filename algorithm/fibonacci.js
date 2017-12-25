/**
 * 斐波那契数
 * 斐波那契数的特点是每一个数都是前二个数的和。此数列的前几项如下： 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610
 */

/**
 * 获取斐波那契数(首位为0)的第n个数
 * time comp: O(n)
 * space comp: O(1)
 * @param {number} n n>=1
 * @returns {number}
 */
exports.loop = function (n)　{
    let a = 1, b = 1, ans = 1

    if (n <= 1) return 1
    n = n - 2

    while(n--) {
        ans = a + b
        a = b
        b = ans
    }

    return ans
}

/**
 * 递归
 * time comp: O(2^n)
 * space comp: O(n)
 */
exports.recursive = function fib (n) {
    if (n <= 2) return 1

    return fib(n - 1) + fib(n - 2)
}

/**
 * 记忆递归
 * time comp: O(n)
 * space comp: O(n)
 */
exports.memRecursive = function fib (n, memo) {
    memo = memo || {
        '1': 1,
        '2': 1
    }

    if (memo[n]) return memo[n]

    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
}
