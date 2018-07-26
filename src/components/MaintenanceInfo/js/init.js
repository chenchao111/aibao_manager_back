import { queryMechantServiceInfo } from '@/api/operate-manage/mechant'

import { myConfirm } from '@/common/myComponent'

import { numToString } from '@/common/numToString'

import { checkProductType } from '@/common/checkProductType'

export default {
  init(query) {
    !this.isCreate && this.queryMechantRepairInfo(query) // 详情页 获取信息

    if ((this.isCreate) && (!this.merchantId)) {
      this.checkMerchantId()
    }
  },
  async queryMechantRepairInfo(query) {
    try {
      const res = await queryMechantServiceInfo(query)

      this.isMyModify = !this.isMyModify
      this.isShowCreateBtn = !this.isShowCreateBtn

      // 数据处理(1. 整数转字符串 2. 对productType进行判断)
      this.form.data = checkProductType(numToString(res), '121')
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
