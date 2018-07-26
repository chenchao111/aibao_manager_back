import { queryMechantServiceInfo } from '@/api/operate-manage/mechant'
import { myConfirm } from '@/common/myComponent'

import { numToString } from '@/common/numToString'

import { checkProductTypeRemove } from '@/common/checkProductType'

export default {
  init(query) {
    !this.isCreate && this.queryMechantServiceInfo(query) // 详情页 获取信息

    if ((this.isCreate) && (!this.merchantId)) {
      this.checkMerchantId()
    }
  },
  async queryMechantServiceInfo(query) {
    try {
      const res = await queryMechantServiceInfo(query)
      // if (!res.length) {
      this.isMyModify = !this.isMyModify
      this.isShowCreateBtn = !this.isShowCreateBtn
      // }
      res.forEach(item => {
        item.saleStatus += ''
      })
      this.form.items = checkProductTypeRemove(numToString(res), ['501', '121'])
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
