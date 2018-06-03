> http://es6.ruanyifeng.com/#docs/module-loader#ES6-模块与-CommonJS-模块的差异
> https://auth0.com/blog/javascript-module-systems-showdown/

### 与commonJs的差异
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
* ES6的编译时加载，决定了：esmodule的import&export不能不在块级作用域里；import $url的$url值不能是动态生成
* ESModule默认是严格模式滴
* ESModule支持静态分析
* esmodule: Circular dependencies supported
* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

### Issues
1. `nodejs`默认使用`commonJS`，支持es6模块，`nodejs > 8.5.0`,得这样`node --experimental-modules`,extension: .mjs

## 模块的继承
`export xx from xx`
```js
// 输出foo.js里面，除了default之外的属性
export * from './foo.js'
export default let foo = 'bar'
export function () {}
```

# import & export
```js
import * as service from './lib/service'
import default, {foo, bar} from 'module'
```


# export
```js
export var foo = 'bar'

export function foo () {
    
}

export const FOO = 'bar';
```