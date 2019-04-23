/**
 * JS字符转码
 * core code: '我'.charCodeAt(0).toString(16)
 * '\\u' => '\u'
 * @param {string} theString
 */
function toUnicode(theString) {
  return theString
    .split("")
    .map(char => {
      let theUnicode = char.charCodeAt(0).toString(16);
      return "\\u" + `000${theUnicode}`.slice(-4);
    })
    .join("");
}

/**
 * Palindrome Partitioning
 * https://leetcode.com/problems/palindrome-partitioning/submissions/ 
 * 
 */
var partition = function(string) {
  let ret  = []
  dfs(string, [])
  return ret

  function dfs (string, array) {
      if (string === '') {
          ret.push(array.slice())
          return
      }
      for(let i = 1, l = string.length + 1; i < l; i++) {
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