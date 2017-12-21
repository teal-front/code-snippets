> 书籍参考：《高性能Javascript》

### Regexp
0. `.`并不是表示所有的字符，除了换行符, `[\s\S]`可以表示全部
1. 减少回溯的操作，分支（`|`）和重复(`*+{2}`)都会引起回溯
2. TODO


两次`replace`性能会好，`|`分组操作带来了额外的匹配时间
```js
str.replace(/^\s+|\s+$/g/, '')
str.replace(/^\s+/, '').replace(/\s+$/, '')
```


#### 对于String.prototype.trim的改进
对于开始的空白符，采用`^\s+`。结尾的空白符，用迭代的方式解决，因为`\s+$`的回溯操作过多，正则匹配是从左往右的，结尾的不适合用正则
性能比较：https://jsperf.com/string-trim-teal
```js
function trim (str) {
    str = str.replace(/^\s+/, '')
    let end = str.length - 1
    let ws = /\s/ // 也可以用空白字符数组[xx, xx],但代码阅读不够整洁

    while (ws.test(str.charAt(end)) {
        end--
    }
    return str.slice(0, end + 1)
}
```

### bit operate
1. 奇偶数的判断
```js
let n = 0
assert(n % 2, 0)
assert(n & 1, 0)
```
2. 位掩码(bit mask)
用来判断元素是否在集合里
```js
let [b1, b2, b3, b4] = [1, 2, 4, 8]
let b = b2 | b3 | b4
assert.strictEqual(b&b1, 0)
assert.strictEqual(b&b4, b4)
assert.strictEqual(b&b4, b4)
```

### Function
1. 经常使用的对象，应放在函数作用域内，减少查找次数
2. 函数作用域在JS引擎内用`[[scope]]`属性表示
3. `with` `eval` `try/catch`会创建动态作用域，在函数作用域之上，增加了调用局部变量的时间

### String

#### string concat
1. `str = str + 'concat'`要优于`str += 'concat'`，因为要把'concat'放在一个临时变量里
2. 性能大小(Chrome 63.0.3239 / Windows 7 0.0.0
)： `s.concat('')`> `s=s+''`>`s+=''`>`[s,''].join('')`，见https://jsperf.com/string-concat-compare-teal

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

### Recursive
1. 递归有调用栈的限制，可以改用迭代或是优化递归方案，比如缓存任务结果，减少递归次数
```js
// Memoization
function memFactorial (n) {
    if (!memFactorial.cache) {
        memFactorial.cache = {
            '0': 1,
            '1': 1
        }
    }
    if (!memFactorial.cache.hasOwnProperty(n)) {
        memFactorial.cache[n] = memFactorial(n - 1) * n
    }
    return memFactorial.cache[n]
}
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

#### Deff's Device,一次迭代中执行多次迭代，从而减少迭代次数
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

### eval
1. `eval&new Function()&setTimeout&setInterval`可以把传入字符串解析成代码运行，由于创建新的解析环境，对性能不佳
