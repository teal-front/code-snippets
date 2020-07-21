/// 单词拆分
// https://juejin.im/post/5ca558b1e51d45592d48440a#heading-10
// https://leetcode-cn.com/problems/word-break/solution/dan-ci-chai-fen-by-leetcode-solution/

function wordBreak(s, wordDict) {
    let n = s.length
    let maxLength = 0
    for(let word of wordDict){
        maxLength = word.length > maxLength ? word.length : maxLength
    }
    // memo[i] 表示 s 中以 i - 1 结尾的字符串是否可被 wordDict 拆分
    let memo = Array.apply(null, {length: n + 1}).map(_ => false)
    memo[0] = true
    for (let i = 1; i <= n; i++) {
        for (let j = i - 1; j >= 0 && maxLength >= i - j; j--) {
            if (memo[j] && wordDict.includes(s.slice(j, i))) {
                memo[i] = true
                break
            }
        }
    }
    return memo[n]
}

let s = "catsanddog", wordDict = ["cats", "dog", "sand", "and", "cat"]
console.log(wordBreak(s, wordDict))