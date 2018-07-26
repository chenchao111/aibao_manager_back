import { pushMechantServiceInfo, updateMechantServiceInfo } from '@/api/operate-manage/mechant'

import { checkForm, checkNumber, checkSameMore, checkMax } from '@/common/checkForm'

export default {
  operateFn(operate) {
    return {
      'add': async(query) => {
        try {
          await pushMechantServiceInfo(query)
          this.$message({
            message: '添加商家产品信息成功',
            type: 'success'
          })
          this.canModify = false
        } catch (error) {
          this.$message.error('添加保养服务信息失败，请确认信息后重试')
          console.warn(error)
        }
      },
      'update': async(query) => {
        try {
          await updateMechantServiceInfo(query)
          this.$message({
            message: '修改商家产品信息成功',
            type: 'success'
          })
        } catch (error) {
          this.$message.error('修改商家产品信息失败，请确认信息后重试')
          console.warn(error)
        }
      }
    }[operate]
  },
  onSubmit() {
    this.form.data.forEach(item => {
      item['cwEntId'] = this.merchantId
      item['discount'] = item.cost
      item['product_type'] = 121
      item['name'] = '保养服务'
      item['fullName'] = '保养服务'
    })
    // 校验非空
    if (!checkForm(this.form.data)) {
      this.$message.error('保养服务页面所有字段均为必填项，请确认是否全部填写完整！！')
      return
    }
    // 校验数字
    if (!checkNumber(this.form.data, 'original')) {
      this.$message.error('保养服务页面原价必须是数字，请确认填写是否规范！！')
      return
    }
    if (!checkNumber(this.form.data, 'cost')) {
      this.$message.error('保养服务页面销售价必须是数字，请确认填写是否规范！！')
      return
    }
    if (!checkNumber(this.form.data, 'discount')) {
      this.$message.error('保养服务页面成本价必须是数字，请确认填写是否规范！！')
      return
    }
    if (!checkMax(this.form.data, 'cost', 'maxCarBean')) {
      this.$message.error('积分不能大于销售价的10倍，请确认填写是否规范！！')
      return
    }
    // 相同校验
    if (!checkSameMore(this.form.data, 'partsId', 'modelsId')) {
      this.$message.error('品牌和升数不能完全重复，请确认后重新添加')
      return
    }
    if (this.isCreate) {
      this.operateFn('add')(this.form.data)
    } else {
      this.operateFn('update')(this.form.data)
    }
  },
  addCar() {
    this.form.data.push({
      partsId: '',
      modelsId: '',
      original: '',
      cost: '',
      purchase: '',
      saleStatus: '0',
      status: '0',
      maxCarBean: ''
    })
  },
  removeInfo(index) {
    // this.form.data.splice(index, 1)
    if (!this.form.data[index].cwEntProductId) {
      this.form.data.splice(index, 1)
      return
    }
    this.form.data[index]['status'] = 1
  }
}
