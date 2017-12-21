## summary
```js
let buf = new Buffer('a string', 'utf-8')
buf.toString('base64')

// 追加写入，可以是其他编码的
buf.write('other stirng', 0, 3, 'base64')

// 可读流的字符设置
let readstream = fs.read('/path/file', {maxPollLength: 11})
let data = '';
readStream.setEncoding('utf-8')
readStream.on('data', (err, chunk) {
    // 中文字符可能会出现乱码问题
    data += chunk
})
```



