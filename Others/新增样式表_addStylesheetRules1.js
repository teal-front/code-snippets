function addStylesheetRules(rules) {
        var style = document.createElement('style');

        document.body.appendChild(style);
        if (!window.createPopup) { /* For Safari */
            style.appendChild(document.createTextNode(''));
        }
        var s = document.styleSheets[document.styleSheets.length - 1];
        for (var selector in rules) {
            if (s.insertRule) {
                s.insertRule(selector + '{' + rules[selector] + '}', s.cssRules.length);
            }
            else { /* IE */
                s.addRule(selector, rules[selector], -1);
            }
        }
    }

//from: https://github.com/Modernizr/Modernizr/blob/master/src/html5shiv.js
function addStyleSheet(cssText) {
	var p = document.createElement('p'),
		parent = document.getElementsByTagName('head')[0] || document.documentElement;

	p.innerHTML = 'x<style>' + cssText + '</style>';
	return parent.insertBefore(p.lastChild, parent.firstChild);
}
