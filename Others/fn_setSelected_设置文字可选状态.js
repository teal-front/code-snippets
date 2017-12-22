//设置Element文字的可选状态
function setSelected(target, boo){
	//设置文字是否可以复制boo=true时可以复制，否则禁止复制
	if (typeof target.onselectstart!="undefined"){ //IE  
		target.onselectstart=function(){
			return boo;
		}
	}else if (typeof target.style.MozUserSelect!="undefined"){ //Firefox   
		/*MozUserSelect有三个值: 
		*1.none表示所有子元素都不能被选择 
		*2.-moz-all子元素的所有文字都可以被选择 
		*3.-moz-none子元素的所有文字都不能选择，但input除外 
		*/
		if(boo)  target.style.MozUserSelect="-moz-all";
		else  target.style.MozUserSelect="none";
	}else{ //other  
		target.onmousedown=function(){
			return boo;  
		}
	}
}
```