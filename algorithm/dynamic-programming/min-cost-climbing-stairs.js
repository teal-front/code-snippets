/**
 * 最小爬楼梯付出的金钱
 * [10, 15, 20] => 15
 * [1, 100, 1, 1, 1, 100, 1, 1, 100, 1] => 6
 *
 * video: https://www.youtube.com/watch?v=v3WqNLmmBdk
 * practice: https://leetcode.com/problems/min-cost-climbing-stairs/
 */

/**
 * 动态规划1
 * time :  O(n)
 * space : O(1) // 这里采用了动态变量，比下面的方案空间复杂度降低!!!
 */
exports.dp = function (cost) {
    let d1, d2, dp
    let l = cost.length

    // [d1, d2, dp]
    d1 = d2 = 0
    for (let i = 2; i <= l ;i++) { // contains n-th ,so <=
        // f(n) = Min(f(n-1) + cost[n - 1], f(n-2) + cost[n - 2]), dp part
        dp = Math.min(d1 + cost[i - 2], d2 + cost[i - 1])
        d1 = d2
        d2 = dp
    }

    return dp
}

/**
 * 动态规划2
 * time :  O(n)
 * space : O(n)
 */
exports.dp = function (cost) {
    let m = []
    let l = cost.length

    m[0] = m[1] = 0
    for (let i = 2; i <= l ;i++) {
        // f(n) = Min(f(n-1) + cost[n - 1], f(n-2) + cost[n - 2]), dp part
        m[i] = Math.min(m[i - 1] + cost[i - 1], m[i - 2] + cost[i - 2])
    }

    return m[l]
}

/**
 * 记忆递归
 * time: O(n)
 * space: O(n)
 */
exports.memRecursivefunction = function (cost) {
    // 最后一个n-th梯子不需要花钱
    //f(n) = Min(f(n-1) + cost[n - 1], f(n-2) + cost[n - 2])

    function dp (n, memo) {
        // store calc result
        memo = memo || []

        if (n <= 1) return 0
        if (memo[n] > 0) return memo[n]
        return memo[n] = Math.min(dp(n - 1, memo) + cost[n - 1], dp(n - 2, memo) + cost[n - 2])
    }

    return dp(cost.length)
};



