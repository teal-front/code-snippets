//get defaultDisplay
var elemdisplay = {}; //cache elem's default display
function defaultDisplay( nodeName ) {
	if ( !elemdisplay[ nodeName ] ) {
		var body = document.body,
			elem = body.appendChild(document.createElement(nodeName)),
			display = getCss(elem, "display" );
		elem.remove();

		// If the simple way fails, e.g. css reset 
		// get element's real default display by attaching it to a temp iframe
		if ( display === "none" || display === "" ) {
			var iframe = document.createElement( "iframe" );
			iframe.frameBorder = iframe.width = iframe.height = 0;

			body.appendChild( iframe );
			
			var iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;

			// Create a cacheable copy of the iframe document on first call.
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
			// document to it; WebKit & Firefox won't allow reusing the iframe document.
			if ( !iframeDoc.createElement ) {
				iframeDoc.write( "<!doctype html><html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = getCss(elem, "display" ); //get display
			body.removeChild( iframe );
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
	
	//get display
	function getCss (elem, prop) {
		return window.getComputedStyle ?
			window.getComputedStyle(elem, null)[prop] :
			elem.currentStyle[prop];
	}
}

//元素是否占用布局空间,from Sizzle.selectors.filter.PSEUDO :hidden & :visible
var visible = {
	hidden: function (node) {
		if (node.offsetWidth === 0 || node.offsetHeight === 0) {
			return true;
		}
		if (this._getCss(node, "display") === "none") {
			return true;
		}
		return false;
	},
	visible: function (node) {
		return !this.hidden(node);
	},
	//get display
	_getCss: function (elem, prop) {
		return window.getComputedStyle ?
			window.getComputedStyle(elem, null)[prop] :
			elem.currentStyle[prop];
	}
};

//contains
function contains (a, b) {
	if (document.documentElement.contains) {
		return a !== b && a.contains(b); //has diff with jQuery
	} else if (document.documentElement.compareDocumentPosition) {
		return !!(a.compareDocumentPosition(b) & 16);
	} else {
		return false;
	}
}

//检测当前window对象是否是iframe里面的 from: jQuery v1.10.2 jQuery.ready.promise
window.frameElement !== null //=> 为iframe 