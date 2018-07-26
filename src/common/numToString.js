export function numToString(ary) {
  if (Object.prototype.toString.call(ary) === '[object Array]') {
    for (let i = 0; i < ary.length; i++) {
      const obj = ary[i]
      for (const attr in obj) {
        if (typeof obj[attr] === 'number') {
          obj[attr] += ''
        }
      }
    }
  } else {
    const obj = ary
    for (const attr in obj) {
      if (typeof obj[attr] === 'number') {
        obj[attr] += ''
      }
    }
  }
  return ary
}
