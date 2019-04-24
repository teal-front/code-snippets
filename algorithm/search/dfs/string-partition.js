/**
 * Palindrome Partitioning
 * backtracking(回溯)
 * https://leetcode.com/problems/palindrome-partitioning/submissions/ 
 * 
 */
var partition = function (string) {
    let ret = []
    dfs(string, [])
    return ret

    function dfs(string, array) {
        if (string === '') {
            ret.push(array.slice())
            return
        }
        // '23'.slice(0, '23'.length) => '23'
        // 故下面 i <= l
        for (let i = 1, l = string.length; i <= l; i++) {
            if (isPali(string.slice(0, i))) {
                array.push(string.slice(0, i))
                dfs(string.slice(i), array)
                array.pop()
            }
        }
    }

    function isPali(string) {
        return string === string.split('').reverse().join('')
    }
};
console.log(partition('2332'))