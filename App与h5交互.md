### webview嵌入H5页面常见问题

#### 1、点击position:fixed浮层按钮穿透问题
>解决:使用fastclick插件

#### 2、android下ga代码无法使用
>解决：android开发人员对webview添加允许使用本地存储属性

#### 3、【小米低版本或者其他国产手机】document.querySelector("select:option")等获取不到dom问题
>解决：向下兼容，不用CSS3查询

#### 4、android下某种场景下会出现屏幕闪一下
>解决：因为使用了css3渐隐渐现效果，把效果移除就好了

#### 5、微信分享自定义url出错问题
>解决：这种情况会偶现，少用自定义url，或者等官方新版本修复

#### 6、ios按钮点不动情况
>解决：a标签下，必须有href属性，通常可以设置默认 href="javascript:;"

#### 7、android 4.4以下版本，click、tap事件会触发2次，案例：城市列表控件（点击省后会马上自动点击市）、select-widget插件发现
>解决：iscroll引起的BUG

#### 8、android拨打电话无效
>解决: `tel:10086` 替换成 `javascript:window.WebviewAndJsMutual.callPhone('10086')`

#### 9、webview下嵌入的H5页面无法区分是浏览器还是webview
>解决: 使用useragent来判断，默认会在最后追加`app/1.6.0`
android:  `Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 app/1.6.0`
iOS:  `Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 app/1.6.0`

#### 10、webview下android无法上传图片
>解决: 使用android私用定制方法，详情查看《app与H5接口交互文档.md》
