// 深度优先搜索算法，用于图表里，与广度优先搜索相对应

/// region combinationSum2
/**
 * 在数组里面找n个数，使和为sum
 * leetcode: https://leetcode.com/problems/combination-sum-ii
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    let list = [], l = candidates.length
    candidates.sort((a,b) => a-b)
    dfs(list, [], candidates, target, 0)
    return list

    function dfs(list, tempList, cand, remain, start) {
        if (remain === 0) {
            // 复制tempList，而不是它的引用
            list.push(tempList.slice())
        } else if (remain > 0) {
            for (let i = start; i < l; i++) {
                // 避免在list里出现重复的结果
                if (i > start && cand[i] === cand[i - 1]) continue
                tempList.push(cand[i])
                dfs(list, tempList, cand, remain - cand[i], i + 1)
                tempList.pop()
            }
        }
    }
}
/// endregion


/// target sum (当然也可以用DP来做)
// 给定一个数组，使用+/-来操作元素，使得结果为S，有多少种方案
// https://leetcode.com/problems/target-sum/
function findTargetSum (nums, S) {
    let l = nums.length
    let sum = nums.reduce((t, n) => {
        t += n
        return t
    }, 0)
    if (Math.abs(S) > sum) return 0

    let ans = 0
    dfs(nums, 0, S)
    return ans

    function dfs (nums, i, S) {
        if (i === l) {
            if (S === 0) ans++
            return
        }
        dfs(nums, i + 1, S - nums[i])
        dfs(nums, i + 1, S + nums[i])
    }
}