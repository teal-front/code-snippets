function ajax(url,fnSucc,fnFail){
	if(window.XMLHttpRequest) {
		var oAjax=new XMLHttpRequest();
	}
	else {
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	oAjax.open("GET","limit time.html",true);//true表示为异步，一般都为异步
	oAjax.send();
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){//readyState表示从发送请求到接收请求到解析完成，而不管成不成功
			if(oAjax.status==200) {//这里的status属性表示上面的readyState＝4时，解析是成功的，不然就是失败的
				fnSucc(oAjax.responseText);
			}
			else if(fnFail){
				fnFail(oAjax.status);
			}
		}
	};
}//www.zhinengshe.com/video.html#4
