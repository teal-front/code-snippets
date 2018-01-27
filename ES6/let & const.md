### let & const 共同点
1. 作用于块级作用域
2. 没有变量提升
3. 存在暂时性死区
```js
typeof x            // => 'undefined'

typeof y;let y = 0; // => ReferenceError: y is not defined

var z = 0
{
    z            // ReferenceError: z is not defined
    let z = 0
}
```

`for`循环里保存变量，可替换闭包的效果
条件判断里的作用域是{}里的父作用域
```js
for(let i = 0; i < 3;) {
    let i = i++   // 因为与上一行括号里的作用域不是同一个，所以这里let i不报错
    setTimeout(function () {
        console.log(i) // 1, 2
    }, 1000)
}
```

### const
1. `const`指向的引用的是内存地址，内存地址不变就行了，内存储存的内容是可以变的
```js
const obj = {}
obj.foo = 'bar'  // 引用地址并没有变

obj = {}        // Error,引用地址改变了
```