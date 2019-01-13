/**
 * 返回今天前某天
 * @param delta interger
 * @return "2014-9-18"
 */
function getDateBeforeToday (delta) {
	var today = new Date(),
		someday_time = today - 8.64e7 * delta,
		someday = today.setTime(someday_time);
	let year = someday.getFullYear(),
		month = someday.getMonth() + 1,
		day = someday.getDay()
	
	return `${year}-${padding(month)}-${padding(day)}`

	function padding(num) {
		return `0${num}`.slice(-2)
	}
}

/**
 * 返回指定当前月份的天数
 * @param {string} year
 * @param {string} month, 实际月份的值，即getMonth()+1
 * @return {number}
 */
function getDaysOfMonth (year, month) {
	return new Date(year, month, 0).getDate();
}

