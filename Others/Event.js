/**
	 * Event
	 *
	 * var html = document.documentElement;
     * Event.bind(html, "click.c2", function () {alert("click.c2")});
     * Event.bind(html, "click.c1", function () {alert("click.c1")});
     * Event.bind(html, "click", function () {alert("html, click")});
     * Event.trigger(html, "click");
     * Event.unbind(html, "click.c1");
	 */
    var Event = {
        _addEvent: function () {
            if (window.addEventListener) {
                return function (elem, type, fn) {
                    type = type.split(/\s+/);
                    for (var i = 0, l = type.length; i < l; i++) {
                        elem.addEventListener(type[i], fn, false);
                    }
                };
            } else if (window.attachEvent) {
                return function (elem, type, fn) {
                    type = type.split(/\s+/);
                    for (var i = 0, l = type.length; i < l; i++) {
                        elem.attachEvent("on" + type[i], function () {
                            fn.apply(elem, arguments); //change this point
                        });
                    }
                }
            }
        }(),
        _removeEvent: function () {
            if (window.addEventListener) {
                return function (elem, type, fn) {
                    elem.removeEventListener(type, fn, false);
                };
            } else if (window.attachEvent) {
                return function  (elem, type, fn) {
                    elem.detachEvent("on" + type, fn);
                }
            }
        }(),
        bind: function (ele, type, func) { //func中第一个参数仍是Event对象
            if (typeof type === "string") {
                var type = type.indexOf(".") > -1 ? type : type + ".",
                    _type = type.split("."),
                    type = _type[0],
                    namespace = _type[1] || "otherNS";
                ele.Y_event || (ele.Y_event = {});
                ele.Y_event[type] || (ele.Y_event[type] = {});
                ele.Y_event[type][namespace] || (ele.Y_event[type][namespace] = []);
                var namespaceArray = ele.Y_event[type][namespace];
                namespaceArray.push(func);

                this._addEvent(ele, type, namespaceArray[namespaceArray.length -1]);

            } else if (type.length) { //type = > array
                while(type[0]) {
                    this.bind(ele, type.shift(), func);
                }
            }
        },
        trigger: function (ele, type, data) {  // data作为除一个参数Event外的参数数组传入
            if (Object.prototype.toString.call(data) !== "[object Array]") throw new Error("trigger function arguments[2] should be a array.");
            if (typeof type === "string") {
                var type = type.indexOf(".") > -1 ? type : type + ".",
                    _type = type.split("."),
                    type = _type[0],
                    namespace = _type[1] || "";
                var namespaceArray;
                if (!ele.Y_event[type]) return;
                if (!namespace) {
                    for (var ns in ele.Y_event[type]) {
                        this.trigger(ele, type + "." + ns, data);
                    }
                } else if (namespaceArray = ele.Y_event[type][namespace]) {
                    var length = namespaceArray.length;
                    for (var i = 0; i < length; i++) {
                        data = data || [];
                        data.unshift(this.utils.createEventObj(ele, type));
                        namespaceArray[i].apply(ele, data);  // !important
                    }
                }
            } else if (type.length) {
                while (type[0]) {
                    this.trigger(ele, type.shift());
                }
            }
        },
        unbind: function (ele, type) {
            if (typeof type === "string") {
                var type = type.indexOf(".") > -1 ? type : type + ".",
                    _type = type.split("."),
                    type = _type[0],
                    namespace = _type[1] || "";
                var namespaceArray;
                if (!ele.Y_event[type]) return;
                if (!namespace) {
                    for (var ns in ele.Y_event[type]) {
                        this.unbind(ele, type + "." + ns);
                    }
                } else if (namespaceArray = ele.Y_event[type][namespace]) {
                    for (var i = 0, l = namespaceArray.length; i < l; i++) {
                        this._removeEvent(ele, type, namespaceArray[i]); // !important
                    }
                    delete ele.Y_event[type][namespace];
                }

            } else if (type.length) {
                while (type[0]) {
                    this.unbind(ele, type.shift());
                }
            }
        }
    };
    Event.utils = {};
    Event.utils.createEventObj = function (ele, type) { //模拟Event对象
        var eventObj = {};
        eventObj.timeStamp = (new Date()).getTime();
        eventObj.type = type;
        eventObj.target = ele;

        return eventObj;
    };

// e.stopPropagation = function () {
	// e.stopPropagation();
	// e.cancelBubble = true;
// };
// e.preventDefault = function () {
	// e.preventDefault();
	// e.returnValue = false;
// };
