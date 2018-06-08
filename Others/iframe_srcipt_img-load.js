/*
 *js的动态加载 
 * onload事件，当script从缓存中加载时，也可以触发到这个事件
 * 下面的脚本，取自seajs的加载脚本部分
 https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/hh180173(v=vs.85)
 */
function scriptOnload(uri, callback) {
  var s = document.createElement("script"),
    head = document.head || document.getElementsByTagName("head")[0],
    base = document.getElementsByTagName("base")[0];
  // undefined是给onload事件准备的
  // loader|complete是给onreadystatechange准备的
  var READY_STATE_RE = /loaded|complete|undefined/;
  // onreadystatechange是ie8及IE8以下的script事件
  s.onerror = s.onload = s.onreadystatechange = function() {
    if (READY_STATE_RE.test(s.readyState)) {
      s.onerror = s.onload = s.onreadystatechange = null;
      (callback || function() {})();
    }
  };
  s.src = uri;
  base ? head.insertBefore(s, base) : head.appendChild(s);
}

//获取script的绝对路径
function getScriptAbsoluteSrc(node) {
  return node.hasAttribute // non-IE6/7
    ? node.src
    : // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
      node.getAttribute("src", 4); //第二个参数4表示获取完整路径
}

/*
 * iframe的动态加载
 */
//method one (better than method two)
var iframe = document.createElement("iframe");
iframe.src = "http://www.planabc.net";

if (iframe.attachEvent) {
  iframe.attachEvent("onload", function() {
    //IE 支持 iframe 的 onload 事件，不过是隐形的，需要通过 attachEvent 来注册。
    alert("Local iframe is now loaded.");
  });
} else {
  iframe.onload = function() {
    alert("Local iframe is now loaded.");
  };
}
document.body.appendChild(iframe);

//method two
var iframe = document.createElement("iframe");
iframe.src = "http://www.planabc.net";

if (!/*@cc_on!@*/ 0) {
  //if not IE
  iframe.onload = function() {
    alert("Local iframe is now loaded.");
  };
} else {
  iframe.onreadystatechange = function() {
    if (iframe.readyState == "complete") {
      alert("Local iframe is now loaded.");
    }
  };
}
document.body.appendChild(iframe);

/*
 * image的动态加载
 * IE6下，如果有缓存，则img.complete为true,不触发img.onload
 */
//method one
$("<img />")
  .load(function() {
    console.log(this.width, this.height); //可用在IE6下，兼容了它的img.complete
  })
  .prop("src", "http://a.b.c/a.png");
//method two
var img = new Image();
img.src = "";
if (img.complete) {
  //do something stuff
} else {
  img.onload = function() {
    //do somethins stuff
  };
}
