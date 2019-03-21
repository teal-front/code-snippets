/**
 * JS字符转码
 * core code: '我'.charCodeAt(0).toString(16)
 * '\\u' => '\u'
 * @param {string} theString 
 */
function toUnicode(theString) {
    return theString.split('').map(char => {
        let theUnicode = chat.charCodeAt(0).toString(16)
        return '\\u' + `000${theUnicode}`.slice(-4)
    }).join('')
}