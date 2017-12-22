## webpack.config.js
1. `xxx-loader`在`exports.module.rules`里的，默认是`npm`的一个包，不需要显式的在`webpack.config.js`中引用，但得在`package.json`文件里引入;
2. 里面的`placeholders`用`[placeholders]`格式，比如`[path][name].[ext]`
3. `webpack-dev-server` 孪生兄弟呀
```js
const path = require('path')
module.exports = {
    entry: './src/app.js',
    output: {},
    module: {
        rules: [
            test: /\.html$/,
            use: 'html-loader',
        ]
    },
    plugins: [],
    watch: false,  // 监听已解析文件的变化，webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启
    watchOptions: {
        aggregateTimeout: 300,  // (ms),某一时间段后统一解析，避免文件改变频繁而损耗CPU
        poll: 1000,             // (ms), 多少时间内进行轮询
        ignored: /node_modules/,  // 排除监听的文件
    },
    externals: {}, // 不需要bundle的模块
    resolve: {},   // 解析require的路径
    devtool: '',   // how sourcemap work
    
    // 配合`webpack-dev-server`时，采用的选项
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
}

```

### Entry
> entry可以有多个，output只能设置一个
```js
# signal page
exports.entry = './src/app.js'
# multi pages
exports.entry = './src/**/index.js'  // glob pattern
```

### Output
```js
module.exports.output = {
    path: path.resolve(__dirname,'dist'),  // 绝对路径
    publicPath: 'https://cdn.com/[hash]',   // 输出的文件路径的root路径 ? 
    filename: 'bundle.js',
    library: '',
    chunkFilename: '',
}
```

### Module
1. `module.rules`给处理`require`的各个文件，贯穿整个构建过程，只要是碰到匹配的文件
2. `module.exports.customConfig`可以被`exports.module.rules[].use`使用，`loader?config=customConfig`
#### `require & import bar from 'bar.html' & @import(scss)`
```js
require('$loader?$attr!$filename')
require('$loader1?$attr!$loader2!$loader3')

require('html-loader?attrs=img:data-src!./index.html')
```
#### module.rules
```js
exports.module = {
    rules: [
        {
            test: /\.html$/,
            use: [
                {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:data-src', ':data-src'], // <tag>:<attribute> 决定了html中的哪些标签元素会被require
                        root: path.resolve(__dirname, 'dist'),
                    }
                }, // 等同于下面这个
                'html-loader?attrs=:data-src'
            ]
        },
        {
            // REGEXP here
            test: /\.scss$/,  
            // use里loader的执行顺序，好像是先整体再局部的
            use: [
                'style-loader!css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        
                    }
                }
            ]
        },
        {
           test: /\.js$/,
           use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
           ]
        },
        {
            test: /\.(jpg|png|gif)$/,
            use: [
                {
                    // return its public URL
                    // 输出的文件名默认是hash形式的
                    loader: 'file-loader',
                    options: {
                        name (name) {
                            if (env === 'production') {
                                return '[hash].[ext]'
                            }
                            return '[name].[ext]
                        },
                        outputPath: '',
                        publicPath (name) {
                            if (env === 'production') {
                                return 'cdn.com/'
                            }
                            return './dist/'
                        }
                    }
                },
                {
                    // Loads files as `base64` encoded URL, when file over limit size
                    loader: 'url-loader',
                    options: {
                        limit: 61990, // Byte
                        fallback: 'file-loader', // when file size over limit, the handler loader, default is `file-loader`
                    }
                },
                {
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.ejs$/,
                    use: 'ejs-loader'
                }
            ]
        }
    ]
}
```

### Plugins
#### html-webpack-plugin
1. 在此文件body结尾处(默认)，加上script[src='bundle.js']，并输出html文件到`dist`目录，（相对于dist目录的位置是相对于src的？）
2. 可以在ejs文件里写模板，
```html
<title><%= htmlWebpackPlugin.options.title %></title>
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
exports.plugins = [
    new HtmlWebpackPlugin({
        // 在哪个文件的基础上加上script
        template: 'src/index.html',
        // 输出的文件名，默认为index.html
        filename: 'assets/index.html', 
        // body: script放在bottom of the body(默认)
        // head: script放在bottom of the head
        inject: 'body', 
        hash: true, // 'script[src=bundle.js?${hash}],默认是false
    })
]
```

#### extract-text-webpack-plugin
> Extract text from a bundle, or bundles, into a separate file

```js
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const extractPlugin = new ExtractTextWebpackPlugin({
    filename: 'main.css' //  单独输出的文件名，要不然就是由js输出了，对于css的大文件加载性能不好
})

export.module.rules = [
    {
        test: /\.scss$/,
        use: extractPlugin.extract(['css-loader', 'scss-loader']),
    }
]
exports.plugins = [
    extractPlugin
]
```

#### clean-webpack-plugin
> remove/clean your build folder(s) before building

```js
const CleanWebpackPlugin = require('clean-webpack-plugin')
exports.plugins = [
    new CleanWebpackPlugin(['dist']),
]
```

### webpack
> plugings list: https://doc.webpack-china.org/plugins/loader-options-plugin/
```js
const webpack = require('webpack')
exports.plugins = [
    new webpack.DefinePlugin({
        "NODE_ENV": JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsplugin({
        sourceMap: false,
        compress: {
            screw_ie8: false,
            warnings: false,
        },
        mangle: false,
        output: {
            screw_ie8: false,
            comments: false,
        }
    })
]
```

### Resolve
```js
exports.resolve = {
    alias: {
        teal: '../src/teal.js'
    },
    extensions: ['.js', '*'], //   require文件默认的扩展名
}
```

### Externals
> 防止将某些 import 的包(package)打包到 bundle 中
```js
exports.externals = {
    jquery: 'jQuery',
    moment: 'moment',
    underscore: '_',
    
    subtract: ['./math', 'subtract'], // subtract: ['./math', 'subtract'] 转换为父子结构，其中 ./math 是父模块，而 bundle 只引用 subtract 变量下的子集。
    lodash : {
        commonjs: "lodash",
        amd: "lodash",
        root: "_"         // indicates global variable
    }
}
```