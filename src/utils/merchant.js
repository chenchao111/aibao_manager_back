import Cookies from 'js-cookie'

const AddMerchant = 'Add-Mechant-Id'

export function getMerchantId() {
  return Cookies.get(AddMerchant)
}

export function setMerchantId(MerchantId) {
  return Cookies.set(AddMerchant, MerchantId)
}

export function removeMerchantId() {
  return Cookies.remove(AddMerchant)
}
