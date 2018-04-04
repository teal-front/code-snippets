> http://es6.ruanyifeng.com/#docs/module-loader#ES6-模块与-CommonJS-模块的差异
> https://auth0.com/blog/javascript-module-systems-showdown/
### 与commonJs的差异
1. 声明式语法，而不是commonjs的函数调用，可避免commonjs的require函数被覆盖
2. commonjs同步API，
3. esmodule的import&export不能不在块级作用域里
4. esmodule: Circular dependencies supported
2. 从语言层面上解决了JS的模块化问题，静态编译，commonjs是引入对象。 ES6 模块是编译时加载，commonjs运行时加载
3. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
4. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
5. 

### Issues
1. `nodejs`默认使用`commonJS`，支持es6模块，`nodejs > 8.5.0`,得这样`node --experimental-modules`,extension: .mjs

# import & export
```js
import * as service from './lib/service'


import {foo, bar} from 'module'
```


# export
```js
export var foo = 'bar'

export function foo () {
    
}

export const FOO = 'bar';
```