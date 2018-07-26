export function formatDate(now, isShowHours) {
  var year = now.getFullYear()
  var month = (now.getMonth() + 1).toString()
  var day = (now.getDate()).toString()
  if (month.length === 1) {
    month = '0' + month
  }
  if (day.length === 1) {
    day = '0' + day
  }
  var dateTime = ''
  if (isShowHours) {
    var hour = (now.getHours()).toString()
    var minute = (now.getMinutes()).toString()
    var second = (now.getSeconds()).toString()
    if (hour.length === 1) {
      hour = '0' + hour
    }
    if (minute.length === 1) {
      minute = '0' + minute
    }
    if (second.length === 1) {
      second = '0' + second
    }
    dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  } else {
    dateTime = year + '-' + month + '-' + day
  }
  return dateTime
}
