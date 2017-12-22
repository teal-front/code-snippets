//文本框文字选中事件
ipt.onselect=function() {
	if(ipt.selectionStart) {
		console.log(ipt.value.slice(ipt.selectionStart,ipt.selectionEnd));	
	}else if(document.selection) {
		document.onmouseup=function() {
			console.log(document.selection.createRange().text);
			document.onmouseup=null;
		}
	}
};