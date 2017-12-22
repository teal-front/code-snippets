// 基于window.onerror 收集前端错误信息
function window_error_bind (traceURL) {
	var window_error_handle = function (message, url, line) {
		if (!url) return;
		var msg = {
			ua: window.navigator.userAgent,
			message: message,
			line: line,
			page: window.location.href,
			url: url
			},
			s = [];
		for (var key in msg) {
			s.push(encodeURIComponent(key) + '=' + encodeURIComponent(msg[key]));
		}
		s = s.join('&');
		//translate by get
		(new Image()).src = traceURL + "?" + s;
		//translate by post
		post(traceURL, s);		
	};
	
	if(window.addEventListener){
		window.addEventListener("error",window_error_handle,true);	//opera用false时就无法处理error
	}else if(window.attachEvent){
		window.attachEvent("onerror",window_error_handle);
	}
	
	function post (url, data) {
		var xhr = typeof win.XMLHttpRequest === 'undefined' ?
		new ActiveXObject('Microsoft.XMLHTTP') :
		new XMLHttpRequest();

		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
}
