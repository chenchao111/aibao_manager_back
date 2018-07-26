export function checkProductType(ary, productType) {
  for (let i = 0; i < ary.length; i++) {
    if (ary[i]['productType'] !== productType) {
      ary.splice(i, 1)
      i--
    }
  }
  return ary
}

export function checkProductTypeRemove(ary, productTypes) {
  for (let i = 0; i < ary.length; i++) {
    for (let j = 0; j < productTypes.length; j++) {
      if (ary[i]['productType'] === productTypes[j]) {
        ary.splice(i, 1)
        i--
        break
      }
    }
  }
  return ary
}
