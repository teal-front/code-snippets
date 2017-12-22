```js
/**
 * 请求发送前添加csrf请求头
 */
!function () {
	const getCookie =  function (key) {
		let re = new RegExp('(?:^|\\s)' + key + '=(.+?)($|;\\s)');
		let matches = document.cookie.match(re);

		return (matches && matches[1]) || '';
	}
	
	var token = getCookie('X-CSRF-Token');

	// 监听ajax发送事件
	// 兼容jQuery & Zepto
	$(document).on('ajaxSend', function(e, xhr, settings){
		// json请求操作，且没有跨域访问
		if (/\.json($|\?)/i.test(settings.url) && !settings.crossDomain) {
			xhr.setRequestHeader('X-CSRF-Token', token);
		}
	});	
	
})();