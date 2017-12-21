## Object.assign
```js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

Object.assign(target, source1, source2)

// Warn： 对于对象的复制，是引用，并不是deep copy
let obj1 = { a: 0 , b: { c: 0}};
let obj2 = Object.assign({}, obj1);
obj2.b.c = 3;
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}

// deep clone
JSON.parse(JSON.stringify(deepObject))
```

## \_\_proto\_\_ property
```js
let obj = {
    __proto__: baseObj,
    toString: () => {
        return super.toString()
    }
}
```

## getter & setter
> `get`与`set`函数名可以同名，但不能与变量a同名，不然循环引用

```js
// object var
let o = {
    get getA() {
        return this.a
    },
    set getA(str) {
        this.a = str + 'lll'
    },
    a: 1
}
o.getA = '24343'
console.log(o.getA)

// Object.create
let childOfO = Object.create(o, {
    bar: {
        get: () => {
            return ''
        },
        set: (str) => {
            this.foo = str
        }
    }
})

// Object.defineProperty
Object.defineProperty(o, "b", {
        get: () => {
            return this.a;
        },
        set: (val) => {
            this.a = val;
        },
        configurable : true,
        writable: true,
        enumerable : true
    });
    
// Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__
o.__defineGetter__("giveMeA", function () {
        return this.a;
    });
o.__defineSetter__("setMeNew", function (val) {
    this.a  = val;
})
```