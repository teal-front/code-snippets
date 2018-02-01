### Babel
1. plugins优先于presets进行编译
> https://segmentfault.com/a/1190000012327811
> https://juejin.im/post/59ec657ef265da431b6c5b03

### Optimize
#### 减少客户端polyfill过大的问题
1. 配置项使用`useBuiltIns: true`, 得先引用`babel-polyfill`模板
2. 判断`user-agent`，有针对性的返回`polyfill`


### use
1. cli: npx babel src -d dist
2. .babelrc
3. nodejs api


#### presets
1. **presets就是多个plugins的集合**
2. 自定义preset，输出一个preset的配置文件即可，里面可引入官方preset，官方插件或自定义插件，见https://babeljs.io/docs/plugins/#creating-a-preset
2. **presets按照数组的index倒序(从数组最后一个到第一个)进行编译**

#### plugins
1. 插件都是可插拔的
2. 可以写自定义插件, https://github.com/thejameskyle/babel-handbook
2. **plugins按照数组的index增序(从数组第一个到最后一个)进行编译**

```json
{
    "presets": [
        ["env", {
            "targets": {
                "node": "4.3.1"
            },
            "useBuiltIns": false
        }]
    ],
    "plugins": [
        "myPlugins"
    ]
}
```