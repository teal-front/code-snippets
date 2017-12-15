> 书籍参考：《高性能Javascript》

### Regexp
1. 减少回溯的操作

两次`replace`性能会好，`|`分组操作带来了额外的匹配时间
```js
str.replace(/^\s+|\s+$/g/, '')
str.replace(/^\s+/, '').replace(/\s+$/, '')
```


#### 对于String.prototype.trim的改进
对于开始的空白符，采用`^\s+`。结尾的空白符，用迭代的方式解决，因为`\s+$`的回溯操作过多，正则匹配是从左往右的，结尾的不适合用正则
```js
function trim (str) {
    str = str.replace(/^\s+/, '')
    let end = str.length - 1
    let ws = /\s/ // 也可以用空白字符数组[xx, xx],但代码阅读不够整洁

    while (ws.exec(str.charAt(end)) {
        end--
    }
    return str.slice(0, end + 1)
}
```

### Function
1. 经常使用的对象，应放在函数作用域内，减少查找次数
2. 函数作用域在JS引擎内用`[[scope]]`属性表示
3. `with` `eval` `try/catch`会创建动态作用域，在函数作用域之上，增加了调用局部变量的时间

### String
1. `str = str + 'concat'`要优于`str += 'concat'`，因为要把'concat'放在一个临时变量里
2.

### Array


### Object&Prototype
1. 对象的查找会遍历所有属性，所以应该缓存对象值
2. 对象属性查找沿着原型链查找
```js
function O () {}
O.prototype = {
    constructor: O
}

let o = new O()
assert.equal(o.__prototype__, O.prototype)
```

```js
let doc = document
```


### if/switch/while
1. `if`,把出现可能性大的条件判断放在最前面
2. 减少迭代次数
3. 减少迭代体运行时间，包括迭代判断条件

#### 数组的倒序迭代一般化于正序
`i--`的`boolean`判断，比`i<l&i++`条件判断+自增操作性能要好
```js
let i = arr.length
while (i--) {
    process(arr[i])
}

let i = 0,l = arr.length
while (i < l) {
    process(arr[i++])
}
```


#### if判断的二分法运用，加快命中判断
```js
if (i === 0) {}
 else if (i === 1) {}
  else if (i ==== 2) {}
   else if (i ==== 3) {}
    else if (i ==== 4) {}
     else if (i ==== 5) {}

if (i < 3) {
    if (i === 0) {}
     else if (i === 1) {}
      else if (i ==== 2) {}
} else {
 if (i ==== 3) {}
    else if (i ==== 4) {}
     else if (i ==== 5) {}
}
```

#### jeff结构,对于循环体的优化，减少了循环终止条件的判断
```js
let i = 0
let start = items.length % 8
let loopCount = Math.floor(items.length / 8)

while(start--) {
    process(items[i++])
}

while (loopCount--) {
    process(items[i++])
    process(items[i++])
    process(items[i++])
    process(items[i++])
    process(items[i++])
    process(items[i++])
    process(items[i++])
    process(items[i++])
}
```