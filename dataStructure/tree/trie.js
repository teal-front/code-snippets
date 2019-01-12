/**
 * 前缀树/字符串树
 *
 * 可以用来Autocomplete查找搜索词匹配，对字典省空间
 * 时间复杂度：O(m) m为单词长度
 * 空间复杂度：O(1)
 *
 * Demo: 
 * let trie = new Trie()
 * trie.insert(['app', 'apple', 'origin', 'crossorigin', 'pjpeg'])
 * console.dir(JSON.stringify(trie.data))
 * console.log(trie.search('pjpeg'))
 * console.log(trie.startsWith('app'))
 * 
 * video: https://www.youtube.com/watch?v=f48wGD-MuQw
 * practice: https://leetcode.com/problems/implement-trie-prefix-tree/description/
 */

class Trie {
    constructor () {
        this.data = {}
    }

    /**
     * 插入一个单词
     * @param word
     */
    insert (words) {
        if (typeof words === 'string') {
            words = [words]
        }

        for (let word of words) {
            let d = this.data
            for (let c of word) {
                if (!d[c]) {
                    d[c] = {
                        $: false,  //是否是单词的最后一个
                    }
                }
                d = d[c]
            }
            d.$ = true
        }

        return this
    }

    /**
     * 最大程度找到单词在树中最后一个字符位置
     * @param word string
     * @returns Object
     */
    find (word) {
        let d = this.data
        for(let i of word) {
            if (!d[i]) {
                return null
            }
            d = d[i]
        }
        return d
    }

    /**
     * 查看单词是否出现
     * @param word String
     * @returns {boolean}
     */
    search (word) {
        let match = this.find(word)

        return !!(match && match.$)
    }

    /**
     * 查看单词中，是否有prefix的前缀
     * @param prefix string
     * @returns {boolean}
     */
    startsWith (prefix) {
        let match = this.find(prefix)

        return !!match
    }

}

module.exports = Trie