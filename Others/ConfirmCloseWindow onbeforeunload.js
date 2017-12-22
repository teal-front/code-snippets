// 2013-05-26
function ConfirmCloseWindow(){
	window.onbeforeunload = function (e) {
  		e = e || window.event;
		
		//todo something here
		// console.log("trigger onbeforeunload");
 
  		// 兼容IE8和Firefox 4之前的版本
		  if (e) {
			e.returnValue = '------------------------------------\n提示：未保存的信息将会丢失\n------------------------------------';
		  }
		 
		  // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
		  return '------------------------------------\n提示：未保存的信息将会丢失\n------------------------------------';
	};
}
