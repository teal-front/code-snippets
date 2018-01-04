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