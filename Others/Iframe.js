/*
 * author: yao wang
 * 
 */
 
/**
 * get iframe document and window 
 * from: http://help.dottoro.com/ljvftsxk.php
 */
//获取iframe节点
var iframeNode = document.getElementsByTagName("iframe")[0];
//获取iframe文档document
var iframeDoc = iframeNode.contentDocument || iframeNode.contentWindow.document;
//获取iframe文档window
var iframeWindow = iframeDoc.defaultView || //IE9+
		iframeDoc.parentWindow;  //IE6-8
		
		