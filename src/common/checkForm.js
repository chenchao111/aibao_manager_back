export function checkForm(forms) {
  if (Object.prototype.toString.call(forms) === '[object Array]') {
    for (var i = 0; i < forms.length; i++) {
      var form = forms[i]
      for (const attr in form) {
        if (form[attr] === '') {
          return false
        }
      }
    }
    return true
  } else {
    for (const attr in forms) {
      if (forms[attr] === '') {
        return false
      }
    }
    return true
  }
}

export function checkPhone(phone) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(phone)) {
    return false
  } else {
    return true
  }
}

export function checkLongitudeAndLatitude(str) {
  if (str.indexOf(',') < 0) {
    return false
  }
  var reg = /^\d+(\.\d+)?$/
  var ary = str.split(',')

  if (!reg.test(ary[0])) {
    return false
  }
  if (!reg.test(ary[1])) {
    return false
  }
  return true
}

export function checkNumber(ary, attr) {
  var reg = /^\d+(\.\d+)?$/
  for (let i = 0; i < ary.length; i++) {
    if (!reg.test(ary[i][attr])) {
      return false
    }
  }
  return true
}

export function checkMax(ary, attr, maxAttr) {
  for (let i = 0; i < ary.length; i++) {
    if (parseInt(ary[i][attr]) * 10 < parseInt(ary[i][maxAttr])) {
      return false
    }
  }
  return true
}

export function checkSame(items, attr) {
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (i !== j && parseInt(items[i].status) === 0 && parseInt(items[j].status) === 0) {
        if (items[i][attr] === items[j][attr]) {
          return false
        }
      }
    }
  }
  return true
}
export function checkSameMore(items, attr, attrOther) {
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (i !== j && parseInt(items[i].status) === 0 && parseInt(items[j].status) === 0) {
        if ((items[i][attr] === items[j][attr]) && (items[i][attrOther] === items[j][attrOther])) {
          return false
        }
      }
    }
  }
  return true
}
