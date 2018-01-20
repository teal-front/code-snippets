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
let objWithSelfIterator = {
    args: [1, 3, 5],
    *[Symbol.iterator]() {
        yield this.args[0]
        yield this.args[1]
        yield this.args[2]
    }
}
for (let o of objWithSelfIterator) {
    console.log(o)
}


// not use generator function 
let fibonacci = {
    [Symbol.iterator]() {
      let pre = 0, cur = 1;
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { done: false, value: cur }
        }
      }
    }
}
  
for (var n of fibonacci) {
// truncate the sequence at 1000
if (n > 1000)
  break;
console.log(n);
}
```