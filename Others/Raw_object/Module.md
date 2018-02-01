## Modules

### CommonJS
Nodejs的模块，文件即模块，`require/module/exports`来调用

### ES6 module
`import/export`API调用

### AMD(异步模块规范)
代表作如`requirejs`,依赖加载完了再去处理factory里的,倾向于提前加载
```js
define(['jquery'], function ($) {
    function myFunc(){}

    return myFunc;
});
```

### CMD
代表作如`seajs`,CMD规范倾向依赖就近

### UMD(通用模块规范)
```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    方法
    function myFunc(){};

    //    暴露公共方法
    return myFunc;
}));
```

### SystemJS
