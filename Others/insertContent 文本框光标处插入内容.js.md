```js
//输入框插入内容
jQuery.fn.extend({
    insertContent : function(myValue) {
        var $t = $(this)[0];
        if (document.selection) {
            this.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
        } else if (typeof $t.selectionStart == 'number') {
            var startPos = $t.selectionStart,
                endPos = $t.selectionEnd,
                value = $t.value,
                scrollTop = $t.scrollTop;
            $t.value = value.slice(0, startPos) + myValue + value.slice(endPos,value.length -1);
            $t.scrollTop = scrollTop;
            $t.selectionStart = $t.selectionEnd = startPos;
        } else {
            this.value += myValue;
        }
        this.focus();
    }
});


/* 为原始网络版本 */
/*jQuery.fn.extend({
    insertContent : function(myValue, t) {
        var $t = $(this)[0];
        if (document.selection) {
            this.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
            sel.moveStart('character', -l);
            var wee = sel.text.length;
            if (arguments.length == 2){
                var l = $t.value.length;
                sel.moveEnd("character", wee + t);
                t <= 0 ? sel.moveStart("character", wee - 2 * t	- myValue.length) : sel.moveStart("character", wee - t - myValue.length);
                sel.select();
            }
        } else if ($t.selectionStart || $t.selectionStart == '0') {
            var startPos = $t.selectionStart;
            var endPos = $t.selectionEnd;
            var scrollTop = $t.scrollTop;
            $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos,$t.value.length);
            this.focus();
            $t.selectionStart = startPos + myValue.length;
            $t.selectionEnd = startPos + myValue.length;
            $t.scrollTop = scrollTop;
            if (arguments.length == 2) {
                $t.setSelectionRange(startPos - t,$t.selectionEnd + t);
                this.focus();
            }
        } else {
            this.value += myValue;
            this.focus();
        }
    }
});*/