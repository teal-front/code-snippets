// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom() {
  return Math.random();
}
// Returns a random number between min and max
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
//包含了min值和max值
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var arr=new Array(10);
for(var i=0;i<10;i++) {
   arr[i]=i;
}
console.log(arr);
function randomSort(arr) {
	var tmpArr=[];
	var length=arr.length;
	for(var i=length;i>0;i--) {
		var randomInt=Math.floor(Math.random()*i);
		tmpArr.push(arr.splice(randomInt,1)[0]);
	}
	return tmpArr;
}
console.log(randomSort(arr));