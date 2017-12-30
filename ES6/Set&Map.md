> [http://es6.ruanyifeng.com/#docs/set-map](http://es6.ruanyifeng.com/#docs/set-map)

## Set & Map
Set: 成员唯一，没有重复值(NaN不能重复，只能添加一次)，故可以用来数组去重，
```javascript
// 数组去重
function uniq (arr) {
    return [...new Set(arr)]
}

var s = new Set([1, 3, 4, 4])
var s = new Set(document.querySelectAll('div'))  // iterable param

for (var i of s) {
    console.log(i)
}
Array.from(s)

// 错误的用法 
s[0]

s.forEach(v => console.log(v))
s.keys() // SetIterator, not array
s.add(v)
s.delete(v)
s.has(v)
s.size
```

## WeakSet
WeakSet 的成员只能是对象，而不能是其他类型的值，对象的引用方式为弱引用，在垃圾回收里不计数，也就是没有其他引用就可以回收了，不管WeakSet里的引用。
```javascript
var ws = new WeakSet([
    [1, 3], [3, 4]
])


ws.add(obj)
ws.delete(obj)
ws.has(obj)

// WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在
ws.size // => undefined
ws.forEach // => undefined
```

## Map
Map键值对的数据结构，但键可以是除了字符串的其他类型(包括`undefined`、`null`、`NaN`),Map 的键实际上是跟内存地址绑定的
```javascript
var map = new Map([
    [global, 3],
    [window, 4]
])
var map2 = new Map(new Set([
    [global, 3]
])))

map.get(window) // => 3
map.set('foo', 'bar')
map.has(window) // => true
map.size // => 2
map.clear()

[...map] // => [[global, 3], [window, 4]]
for (var k of map.keys())
for (var [k, v] of map.entries())
```
## WeakMap
只接受对象(null除外)作为键名
它的键名所引用的对象都是弱引用，不能使用`values` `keys` `enties`枚举，也不能使用`clear`
```javascript
var wm = new WeakMap()
wm.set(obj, 2)

wm.size // undefined
wm.forEach // undefined
```
### WeakMap Use
1. once an object is garbage-collected, its listeners or cache will be garbage-collected, too. In other words: there won’t be any memory leaks.

```js
//cache
let cache = new WeakMap()
cache.set(obj, '')

// add listener
let listeners = new WeakMap()
function addListener (obj, fn) {
    if (!listeners.has(obj)) {
        listeners.set(obj, new Set())
    }
    listeners.get(obj).add(fn)
}
function trigger(obj) {
    let listeners = listeners.get(obj) || new Set()
    for (let action of listeners.keys) {
        action()
    }
}
```

2. protect data
见`Object&&OO.js`里的`private property/method`
