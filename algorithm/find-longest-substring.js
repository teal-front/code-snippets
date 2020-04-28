/**
 * 查找最长的、含有不重复字符的子串的长度
 * reference: https://leetcode.com/problems/longest-substring-without-repeating-characters/solution/
 */

// Sliding Window Optimized
exports.lengthOfLongestSubstring = (str) => {
    let n = str.length,
        ans = 0
    let map = new Map()
    // [i, j]
    for (let i = 0, j = 0; j < n; j++) {
        if (map.has(str[j])) {
            i = Math.max(map.get(str[j]) + 1, i)
        }
        ans = Math.max(ans, j - i + 1)
        map.set(str[j], j)
    }
    return ans
}

// Sliding Window
exports.lengthOfLongestSubstring2 = str => {
    let ans = 0,
        i = 0,
        j = 0,
        l = str.length
    let set = new Set()
    // [i, j]
    while (i < l && j < l) {
        if (set.has(str[j])) {
            set.delete(str[i++])
        } else {
            ans = Math.max(ans, j - i + 1)
            set.add(str[j++])
        }
    }
    return ans
}

// Brute Force [Time Limit Exceeded]
exports.lengthOfLongestSubstring3 = s => {
    if (s.length === 0) {
        return 0
    }

    let max = 1
    for (let i = 0, l = s.length; i < l; i++) {
        let set = new Set()
        set.add(s[i])
        for (let j = i + 1; j < l; j++) {
            if (set.has(s[j])) {
                break
            }
            set.add(s[j])

        }
        max = Math.max(max, set.size)
    }
    return max
}