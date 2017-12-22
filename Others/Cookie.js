var cookie = {
	set: function (name,value,day) {
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+day);
		document.cookie=name+"="+value+";"+"expires="+oDate;//这里的分号后面不用空格、expires为复数
		//一次只能写入一个name=value,多了无用
		//expires后加日期对象
		
		/*document.cookie="name=yao";// 后一条不会覆盖前一条
		document.cookie="expir=213";*/
	
	},
	get: function (name) {
		var cookies=document.cookie.split("; ");
		//分号后面还有一个空格，cookie格式为a=b; c=d; d=c
		var cookie,i;
		for(i=0;i<cookies.length;i++){
			cookie=cookies[i].split("=");
			if(cookie[0]===name) {
				return cookie[1];
			}
		}
		return "";	
	},
	delete: function (name) {
		setCookie(name,1,-1);//参数value随便哪个值都可以，因为会覆盖原cookie，然后被删除
		//-1是指设置日期为前一天，所以就自动过期了		
	}
};
