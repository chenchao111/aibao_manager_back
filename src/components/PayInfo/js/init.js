import { queryMechantPayInfo } from '@/api/operate-manage/mechant'

import { myConfirm } from '@/common/myComponent'
export default {
  init(query) {
    !this.isCreate && this.queryMechantPayInfo(query) // 详情页 获取信息

    if ((this.isCreate) && (!this.merchantId)) {
      this.checkMerchantId()
    }
  },
  async queryMechantPayInfo(query) {
    try {
      const res = await queryMechantPayInfo(query)
      this.form = res
    } catch (error) {
      console.log(error)
    }
  },
  async checkMerchantId() {
    try {
      await myConfirm.call(this, {
        title: '提示',
        content: '请先填写商家信息，否则无法添加支付信息',
        type: 'danger'
      })
      this.reload()
    } catch (error) {
      console.warn(error)
      this.reload()
    }
  }
}
