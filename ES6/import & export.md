> http://es6.ruanyifeng.com/#docs/module-loader#ES6-模块与-CommonJS-模块的差异
### 与commonJs的差异
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
3. 

### Issues
1. `nodejs`默认使用`commonJS`，支持es6模块，`nodejs > 8.5.0`,得这样`node --experimental-modules`

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