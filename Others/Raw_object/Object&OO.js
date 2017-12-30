'use strict'

/// region private property/method
// http://2ality.com/2016/01/private-data-classes.html
// http://speakingjs.com/es5/ch17.html#private_data_for_objects
//
// in constructor function
class A {
    constructor (privateParamKey, privateParamMethod) {
        let privateKey = ''
        let privateMethod = () => {}

        Object.assign(this, {
            publicKey: '',
            publicMethod: () => {
                privateKey
                privateMethod()
            }
        })
    }
}

// IIFE
// use closure
let IIFE_Class = function () {
    let privateKey = ''
    let privateMethod = () => {}

    function IIFE_Class () {
        this.consrtPublicKey = ''
        this.consrtPublicMethod = () => {}
    }
    IIFE_Class.prototype = {
        constructor: IIFE_Class,
        publicKey: '',
        publicMethod: () => {
            privateKey
            privateMethod()
        }
    }

    return IIFE_Class
}()


/// WeakMap
// WeakMap里的对象键，不记入垃圾回收的引用。所以对象可能会不在存在，所以WeakMap不能被枚举，使用`keys` `values`等方法
// 所以没有`instance`的`key`，就没法取到私有变量
//
let _key = new WeakMap();
let _method = new WeakMap();

class WearMap_Class {
    constructor (privateKey, privateMethd) {
        _key.set(this, privateKey)
        _method.set(this, privateMethd)
    }
    publicMethod () {
        _key.get(this)
        _method.get(this)()
    }
}
/// Symbol(仅作演示，实际上不能严格保证属性的私有)
// 用Symbol的唯一性，来确保私有属性。但是es6的`Reflect.ownKeys(obj)`还是可以把symbol对象找出来，Object.keys不能
const _counter = Symbol('counter')
const _action = Symbol('action')

class SymbolClass {
    constructor (counter, action) {
        this[_counter] = counter
        this[_action] = action
    }
    count () {
        if (this[_counter] < 1) return
        this[_counter]--
        if (this[_counter] === 0) {
            this[_action]()
        }
    }
}
/// endregion

/// region define class
// 1. prototype(pseudoClass)
let O = function (name) {
    this.name = name
}
O.prototype = {
    constructor: O,
    getName() {
        return this.name
    }
}

let o = function () {
}
o.prototype = new O()

// 2. Object.create()
let p = {
    name: 'teal',
    get() {
        return this.name
    }
}
let intanceCase = Object.create(p)

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        let F = function () {
        }
        F.prototype = o
        return new F()
    }
}

// 3. 单体
let createNew = (spec) => {
    let age = spec.age || 1; //  private property

    let single = {};
    single.getAge = () => age;

    return single;
}
let man = createNew({age: 2})
/// endregion

/// region prototype
// constructor, 指向构造函数
// 大部分对象的constructor都可以被改写，所以不可信。除了1、't', true等的constructor为只读的原生构造函数,
// 详情见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
function A (){}
A.prototype.constructor = B;
(new A()).constructor // => A
/// endregion

/// region es6 class
// Subclassing
let Sup = class  {
    constructor (x, y) {
        this.x = x
        this.y = y
        this.m = () => {
            console.log('sup constructor method')
        }
    }

    toString () {
        return `(${this.x},${this.y})`
    }
}

let Sub = class extends Sup {
    constructor (x, y, color) {
        super(x, y)
        this.color = color
    }
    toString () {
        return super.toString() + this.color
    }
}

typeof Sub // => 'function'
// Sub()      // => TypeError: Classes can't be function-called

let cp = new Sub(3, 4, 'purple')
console.log(cp.toString())  // => (3,4)purple
cp instanceof Sup           // => true
cp instanceof Sub           // => true


// static method && get set
class StaticClass {
    constructor () {
        this.prop = 'foo'
    }
    // 静态方法,类直接调用，不会被继承!!
    static staticMethod () {
        console.log('sup static method invoked')
    }
    // 设置Sup.ZERO的只读属性
    static get ZERO () {
        return new Set([0])
    }

    get prop () {
        return 'foo'
    }
    set prop(v) {
        console.log('set prop' + v)
    }
}

console.log(StaticClass.ZERO) // => Set {0}
StaticClass.staticMethod()
console.log(new StaticClass().prop = 3)

// Generator methods
class IterableArguments {
    ['my' + 'class'] () {

    }

    constructor (...args) {
        this.args = args
    }
    * [Symbol.iterator] () {
        for (const arg of this.args) {
            yield arg;
        }
    }
}
for (const x of new IterableArguments('hello', 'world')) {
    console.log(x);
}

function Foo (foo) {
    this.foo = foo
}
Foo.prototype = {
    constructor: Foo,
    fooM: function () {
        console.log(this.foo)
    }
}

function Bar (...args) {
    Foo.apply(this, args)
    this.bar = 'bar'
}
Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.constructor = Bar
Bar.prototype.barM = function () {
    // super call
    Foo.prototype.fooM.call(this)
    console.log(this.bar)
}

let b = new Bar('foo')
console.log('-'.repeat(20) + 'es5 prototype')
console.log(b instanceof Bar)
console.log(b instanceof Foo)
console.log(Object.getPrototypeOf(b) === Bar.prototype)
console.log(Foo.prototype.isPrototypeOf(b) === true)
b.barM()
b.fooM()

function foo () {
    let privateKey = ''
    let privateMethod = function () {

    }

    this.publicKey = ''
    this.privateMethod = function () {
        privateMethod()
        console.log(privateKey)
    }
}

class f extends foo {
    constructor () {
        let p = ''
        super()
        this.private = function () {

        }
        wm.set(this, args)
    }
}
/// endregion