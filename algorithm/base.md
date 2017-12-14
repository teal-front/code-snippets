### 时间复杂度

### 空间复杂度

### 最坏复杂度

### 好的算法
好的算法会减少时间复杂度，以计算n到1的和为例：
```js
// bad algorithm
const sumBad = n => {
    let sum = 0
    for(let i = 1; i < n + 1; i++) {
        sum += i
    }
    return sum
}
// good algorithm
const sumGood = n => {
    return n * (n + 1) / 2
}
```