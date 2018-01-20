## Array
> [http://2ality.com/2014/05/es6-array-methods.html](http://2ality.com/2014/05/es6-array-methods.html)

#### indexOf
使用===进行比较
```js
[NaN].indexOf(NaN) // => -1
```

#### includes
使用`sameVauleZero`比较,支持`NaN`为相同值
> 1.If Type(x) is different from Type(y), return false.
2.If Type(x) is Number, then
a. If x is NaN and y is NaN, return true.
b. If x is +0 and y is -0, return true.
c. If x is -0 and y is +0, return true.
d. If x is the same Number value as y, return true.
e. Return false.
3.Return SameValueNonNumber(x, y).

```js
[NaN].includes(NaN) // true
```

### 迭代器(Iterator)
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators
1. Array、String、Map、Set内建有迭代器
2. 对于Object，可以使用Symbol.iterator创建自定义的迭代器
```js
// fib
/// raw iterator
let fibRaw = function () {
let prev= 1, cur = 1
return {
 next() {
   [prev, cur] = [cur, prev + cur]
   return { done: false, value: cur }
 }
}
}
let fibraw = fibRaw()
console.log(fibraw.next().value)
console.log(fibraw.next().value)
console.log(fibraw.next().done)

/// iterator
let fibIterator = {
[Symbol.iterator]() {
 let prev = 1, cur = 1
 return {
   next() {
     [prev, cur] = [cur, prev + cur]
     return { done: false, value: cur }
   }
 }
}
}
for (let fibItem of fibIterator) {
if (fibItem > 100) break
console.log(`fibItem: ${fibItem}`)
}

/// generator
//// 迭代器的语法糖，代替next方法
let fibGenerator = {
*[Symbol.iterator]() {
   let prev = 1, cur = 1
   while (true) {
     [prev, cur] = [cur, prev + cur]
     yield cur      
   }
}
}
for(let fibGenItem of fibGenerator) {
if (fibGenItem > 100) break
console.log(`fibGenItem: ${fibGenItem}`)
}
```