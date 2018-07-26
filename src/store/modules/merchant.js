import { getMerchantId, setMerchantId, removeMerchantId } from '@/utils/merchant'

const merchant = {
  state: {
    merchantId: getMerchantId()
  },
  mutations: {
    SET_MERCHANT_ID(state, data) {
      state.merchantId = data
      setMerchantId(data)
    },
    CLEAR_MERCHANT_ID(state) {
      state.merchantId = null
      removeMerchantId()
    }
  }
}
export default merchant
