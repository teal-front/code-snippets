### UI线程
1. 使用`setTimeout&setInterval`来分块异步执行代码，减少对UI线程的阻塞
2. 使用`Web workers`来处理执行时间过长的代码，通过消息传递来交换数据(`postMessage&onmessage`)，低版本浏览器`message`只能接收字符串



### **Reflow&Repaint**
1. Reflow(重排)，对DOM树中的尺寸大小、边距的重新计算
2. Repaint(重绘)，在浏览器上重新绘制出来，只涉及到颜色的只会重绘不会重排
3. reflow之后必定会repaint
#### 减少reflow/repaint的方式
1. 批量操作元素样式或是使用`class`
```js
d.style.cssText += ''
d.className += ''
```
1. 使用文档片断（document fragment）
2. 先使元素隐藏，操作元素，再显示
```js
d.style.display = 'none'
//...
d.style.display = 'block'
```
3. **设置元素为绝对定位，脱离文档流**
4. 复制元素，再代替之前的
```js
let c = d.cloneNode(true)
//...
d.parentNode.replaceNode(d, c)
```
#### 渲染队列的刷新
1. 获取复合样式时，会强制刷新渲染队列进行重排，以获取重新的样式，所以在操作样式时，避免获取复合样式
```js
function getCurrentStyle(s) {
  if (document.currentStyle) {
    return d.currentStyle[s]
  } else {
    return window.getComputedStyle(d)[s]
  }
}
```

### Ajax
广义上指不刷新页面获取数据的方式
1. XHR(XMLHttpRequest)
get会比post要快，post有两次发包过程，一次是发送header，一次是发送body。这样处理牺牲了速度，但是确保了TCP传送的完整性。下面是用`Wireshark`抓包的截图
![http get](https://github.com/teal-front/code-snippets/blob/master/performance/images/get.png)
![http post](https://github.com/teal-front/code-snippets/blob/master/performance/images/post.png)
2. iframe
3. dyamic scrite insert(使用`JSONP`数据格式)
4. image信标
