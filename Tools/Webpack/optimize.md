## Optimize
### code split
`requre.ensure`按需加载，打包后会生成0.js的文件

### CommonsChunkPlugin
`entry chunk` & `normal chunk`
`entry chunk`指含有`runtime`，业务文件更改后重新打包时，若runtime文件chunkhash会变化，导致entry chunk的chunkhash也会变化。可单独把runtime chunk抽离出来，增加entry chunk文件的缓存命中率

```js
exports.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunk(module, count) {
            return module.resource && module.resource.includes('node_modules')
        },
        chunks: ['app']
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
    })
]
```

### DllPlugin&DllReferencePlugin
**相比于`CommonsChunkPlugin`，会提高构建时的效率，不再重复打包dll内文件**

**与Externals相比，是可以通过构建工具进行管理**
```js
// webpack.dll.config.js
exports.entry = {
    dll: ['vue', 'vuex', 'vue-router'],
    //runtime,
}
exports.plugins = [
    new webpack.DllPlugin({
        name: '[name]_lib',  // json 文件里的name字段
        path: '[name].manifest.json'
    })
]

// webpack.prod.config.js
exports.plugins = [
    new webpack.DllReferencePlugin({
        context: '.',
        manifest: [
            '../dist/dll.manifest.json',
            //'../dist/runtime.manifest.json'
        ]
    })
]

```


### Externals
指定webpack的配置属性externals，打包时不再引入，而是通过amd/commonjs/root(全局)方式引入

**相比于`CommonsChunkPlugin`，会提高构建时的效率，不再重复打包公用/库文件**
```js
exports.externals = {
    vue: 'Vue',
    vuex: {
        root: 'Vuex', // 全局，在html上通过script标签引入
        amd: 'Vuex', // 在amd中引入
        commonjs: 'Vuex', // 在commonjs中引入
    }
}
```