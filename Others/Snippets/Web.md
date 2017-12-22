1. H5调用App照相功能：
`<input type="file" class="file-alpha js-file" accept="image/*" capture="camera" name="credit_front" id="credit_front" data-scenes="credit_id" />`


2. mobile拨打电话
`<a href="tel:13764567708" data-app-no-open="0" target="_blank" rel="nofollow">移动WEB页面JS一键拨打号码咨询功能</a>`

3. zepto.js
> 1. 没有$.easing属性
> 2. 没有$.fn.stop方法
> 3. 没有$.noop

### Bug
1. 取select里的option选中，this.options[this.selectedIndex]的兼容性优于this.selectedOptions。比如UCv1.10.2就不支持后者 。
2. IE&Safari的new Date('2015-03-03 00:00:00')不行，得new Date('2015/03/03 00:00:00')格式的；
3. swipe插件.swipe-wrap>div元素中的固定定位元素不显示。是因为插件自动生成的-webkit-transform: translate(-375px, 0px) translateZ(0px);所引起的，解决办法：可把固定定位元素拿出来。（如http://m.app.com/app/bill/index.html）
4. form的onsumbit='return false;'不管用，原来是form中的表单元素没有name属性。
5. select中的options选中，不能在页面输出时靠给`<select value='10'>`这样来设置，得`<option selected>`这样才行。
6. 点浏览器的返回按钮到上一个页面时，Chrome上操作是加载了页面，但是上一次的操作还生效，比如选了一个单选框，外观上虽然没有变化，但this.checked=true，如果提交，还是提交它。解决办法，可以在提交的时候重置表单，防后退。
	setTimeout(function () {
		form.reset();
	}, 0);