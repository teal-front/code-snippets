var Placeholder={
	_has:function(){  //判断浏览器支持placeholder属性否
		return "placeholder" in document.createElement('input');
	},
	set:function(d){  //对不支持placeholder的浏览器降级，用原始onfocus、onblur方法
		if(Placeholder._has()) return;
		if(typeof d=="string"){d=document.getElementById(d);}
		var _value=d.getAttribute('data-value');
		d.value=_value;
		d.onfocus=function(){  //没用addEventLister,故只支持这一个事件
			if(d.value==_value) d.value="";
				
		};
		d.onblur=function(){
			if(d.value=="") d.value=_value;
		};
	}
};
