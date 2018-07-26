import { pushMechantServiceInfo, updateMechantServiceInfo } from '@/api/operate-manage/mechant'

import { checkForm, checkNumber, checkMax, checkSame } from '@/common/checkForm'

const service = {
  '201': '标准洗车',
  '202': '全车精洗',
  '126': '全车打蜡',
  '141': '简易年检',
  '142': '上线年检'
}

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
          this.$message.error('添加商家产品信息失败，请确认信息后重试')
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
    this.form.items.forEach(item => {
      item['cwEntId'] = this.merchantId
      item['discount'] = item.cost
      item['name'] = service[item.productType]
      item['fullName'] = service[item.productType]
    })
    // 校验非空
    if (!checkForm(this.form.items)) {
      this.$message.error('基础服务页面所有字段均为必填项，请确认是否全部填写完整！！')
      return
    }
    // 校验数字
    if (!checkNumber(this.form.items, 'original')) {
      this.$message.error('基础服务页面原价必须是数字，请确认填写是否规范！！')
      return
    }
    if (!checkNumber(this.form.items, 'cost')) {
      this.$message.error('基础服务页面销售价必须是数字，请确认填写是否规范！！')
      return
    }
    if (!checkNumber(this.form.items, 'discount')) {
      this.$message.error('基础服务页面成本价必须是数字，请确认填写是否规范！！')
      return
    }
    if (!checkNumber(this.form.items, 'maxCarBean')) {
      this.$message.error('基础服务页面积分值必须是数字，请确认填写是否规范！！')
      return
    }
    if (!checkMax(this.form.items, 'cost', 'maxCarBean')) {
      this.$message.error('积分不能大于销售价的10倍，请确认填写是否规范！！')
      return
    }
    // 相同校验
    if (!checkSame(this.form.items, 'productType')) {
      this.$message.error('服务类型不能重复，请确认后重新添加')
      return
    }

    if (this.isCreate) {
      this.operateFn('add')(this.form.items)
    } else {
      this.operateFn('update')(this.form.items)
    }
  },
  // 删除商品
  removeInfo(index) {
    // this.form.data.splice(index, 1)
    if (!this.form.items[index].cwEntProductId) {
      this.form.items.splice(index, 1)
      return
    }
    this.form.items[index]['status'] = 1
  },
  // 添加商品
  addCar() {
    this.form.items.push({
      productType: '',
      original: '',
      cost: '',
      discount: '',
      saleStatus: '0',
      status: '0',
      maxCarBean: ''
    })
  }
}
