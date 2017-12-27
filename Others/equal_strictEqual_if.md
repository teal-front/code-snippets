> **Equality对照表: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness**

### equal ==
1. `null == undefined`
2. string & number, string to number
3. boolean & string, bollean to number, then string to number
4. object & string, object.toString() or object.valueOf()
```js
null == undefined //
null != 0
null != false
undefined != 0
undefined != false

1 == true // true => 1
2 != true // true => 1
({}) != 0 // {} => '[object Object]'
[] == 0   // [] => '' => 0
[] == true

Undefined	Null	Number	String	Boolean	Object
被比较值 A	Undefined	true	true	false	false	false	IsFalsy(B)
Null	true	true	false	false	false	IsFalsy(B)
Number	false	false	A === B	A === ToNumber(B)	A=== ToNumber(B)	A=== ToPrimitive(B)
String	false	false	ToNumber(A) === B	A === B	ToNumber(A) === ToNumber(B)	ToPrimitive(B) == A
Boolean	false	false	ToNumber(A) === B	ToNumber(A) === ToNumber(B)	A === B	ToNumber(A) == ToPrimitive(B)
Object	false	false	ToPrimitive(A) == B	ToPrimitive(A) == B	ToPrimitive(A) == ToNumber(B)
A === B

// 相同结构的对象不会相等
[] != []
({}) != ({})
```

### strictEqual ===
```
NaN !== NaN
-0 === +0

null === null
{} !== {}
[] !== []
undefined === undefined
```

### Object.is
Object.is(NaN, NaN) // => true
Object.is(-0, +0)  // => false

### Falsy
> Falsy术语: https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy
**falsy是在 Boolean 上下文中认定可转换为false的值, 比如在条件语句或者循环语句中**
```js
if ('') // false
if ([]) // true
if ({}) // true
```


### SameValueZero
**TODO**
todo