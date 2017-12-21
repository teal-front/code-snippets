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