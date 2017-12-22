/**
 * @param delta interger
 * @return "2014-9-18"
 */
function getDate (delta) {
	var today = new Date(),
		someday_time = today - 60 * 60 * 24 * 1000 * delta,
		someday = today.setTime(someday_time);
	
	return someday.getFullYear() + "-" + (someday.getMonth() + 1) + "-" + someday.getDay();
}

/**
 *返回指定当前月份的天数
 */
function getDaysOfMonth (year, month) {
	return new Date(year, month, 0).getDate();
}

