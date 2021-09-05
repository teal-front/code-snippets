
// new Date('2019/01/02')时的标准格式
// http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
// 等同于2019-01-02T08:00:00z YYYY-MM-DD 这种是标准格式，默认是带当前时区的，也就是GMT+8。
new Date('2019-01-02')
// 其他格式的datestring， 解析后不会有当前时区,
// 以下的都等同于2019-01-02T00:00:00
new Date('2019-01-2')
new Date('2019-1-02')
new Date('2019/01/02')