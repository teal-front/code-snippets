#JS
## history.replaceState & history.pushState
```js
// stateObj可以是对象或字符串，
// title参数目前没用，传null即可
history.replaceState(stateObj, title, newUrl)

history.pushState(stateObj, title, newUrl)


// 页面前进或后退时，popstate会发生
// 当前Url是用replaceState或pushState设置的url时，stateObj会传进来，否则默认为null
window.addEventListener('popstate', function (e) {
    // 即之前pushState或replaceState中传的stateObj对象
    console.log(e.state)
})
```

## pagehide event & beforeunload
**`pagehide` 在IOS&Android上兼容性要好，`beforeunload不太支持**

**离开页面时就会触发此事件**

**直到事件hanlder运行完，页面就会离开,handler里面的alert、confirm直接忽视**

```js
//  对于要取消pagehide行为的流程，要及时注销事件
window.addEventListener('pagehide', function () {
    wait(100).then(() => {
        page.unload()
    });
})
```

