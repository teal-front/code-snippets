var unionInterval = function () {
  var timer = [],
      timeId = null;
  
  return {
    interval: 13,
    tick: function () {
      var i = 0, length = timer.length;
      for (; i < length; i++) {
        timer[i]();
      }
    },
    start: function () {
      var that = this;
      if (!timeId) {
        timeId = setInterval(function () {
           that.tick(); 
        }, this.interval);
      }
      return this;
    },
    stop: function () {
      clearInterval(timeId); //
      timeId = null; //除了上面的取消定时之外，还需把timeId重置为null， 为了start时的准确判断
      return this;
    },
    add: function (callback) {
      timer.push(callback);
      console.log(timer);
      return this;
    }
  };
};

  
// test union
var timeMan = unionInterval();
timeMan.interval = 1000;
  timeMan.add(function () {
  console.log("interval1");
}).add(function () {
  console.log("interval2");
}).start();

setTimeout(timeMan.stop.bind(unionInterval), 6000);