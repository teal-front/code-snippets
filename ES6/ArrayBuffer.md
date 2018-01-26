## ArrayBuffer(二进制数组)
`ArrayBuffer`对象、（`TypedArray`视图和`DataView`视图）是 JavaScript 操作二进制数据的一个接口。**它们都是以数组的语法处理二进制数据，所以统称为二进制数组。**

很多浏览器操作的 API，用到了二进制数组操作二进制数据，比如`XMLHttpRequest`、`WebSocket`


ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。




