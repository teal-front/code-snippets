### 脚本格式 
```js
// ==UserScript==
// @name         teal
// @namespace    https://github.com/teal-front/xxx
// @version      1.0.1
// @description  my demo

/// match & include都可以添加多行
// @match        http://www.zhihu.com/*
/// 脚本包含？
// @include      http://www.zhihu.com/*

// @require      http://cdn.staticfile.org/jquery/1.8.2/jquery.min.js

/// include css & images
// @resource     jqUI_CSS http://cdn.staticfile.org/iCheck/1.0.1/skins/square/blue.css
// @resource     ui-bg_icheck-skin_square_blue http://cdn.staticfile.org/iCheck/1.0.1/skins/square/blue.png

/// include js
// @require      http://cdn.staticfile.org/jqueryui/1.10.4/jquery-ui.min.js

/// 全局变量？
// @grant        GM_xmlHttpRequest

// 脚本的icon
// @icon         https://raw.githubusercontent.com/unogz/izhihu/develop/misc/xpi-config/icon64.png
// @copyright    teal-front
// ==/UserScript==

```

