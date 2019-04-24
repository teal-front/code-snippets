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
 * 字符串转数字
 * 
 * 要注意正负数的判断，不考虑超过最大整数情况
 * 
 * 34 => 
 * (((0 * 10 + 3) * 10) + 4)
 */
function string2int(string) {
  if (string === null || string.length === 0) {
    return 0
  }
  let isNegative = string.charAt(0) === '-'
  let i = -1,
    l = string.length,
    ret = 0,
    c
  // also would use `reduce`
  while (++i < l) {
    if (i === 0 && isNegative) {
      continue
    }
    c = Number(string.charAt(i))

    ret = ret * 10 + c
  }
  return isNegative ? -ret : ret
}