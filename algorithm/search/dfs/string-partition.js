/**
 * Palindrome Partitioning
 * backtracking(回溯)
 * https://leetcode.com/problems/palindrome-partitioning/submissions/ 
 * https://zxi.mytechroad.com/blog/searching/leetcode-131-palindrome-partitioning/
 * 
 */
var partition = function (string) {
    let ret = []
    let cur = []
    let n = string.length
    dfs(0)
    return ret

    function dfs(start) {
        if (start === n) {
            // shaddow copy
            ret.push(cur.slice())
            return
        }
        for (let i = start; i < n; i++) {
            if (!isPali(string, start, i)) continue
            console.log(start, i)
            cur.push(string.slice(start, i + 1))
            dfs(i + 1)
            cur.pop()
        }
    }

    function isPali(string, l, r) {
        while (l < r) {
            if (string[l++] !== string[r--]) return false
        }
        return true
    }
};
console.log(partition('23321'))