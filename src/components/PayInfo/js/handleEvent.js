import { pushMechantPayInfo, updateMechantPayInfo } from '@/api/operate-manage/mechant'

import { checkForm, checkPhone } from '@/common/checkForm'

export default {
  operateFn(operate) {
    return {
      'add': async(query) => {
        try {
          await pushMechantPayInfo(query)
          this.$message({
            message: '添加银行账户信息成功',
            type: 'success'
          })
          this.canModify = false
        } catch (error) {
          this.$message.error('添加银行账户信息失败，请确认信息后重试')
          console.warn(error)
        }
      },
      'update': async(query) => {
        try {
          await updateMechantPayInfo(query)
          this.$message({
            message: '修改银行账户信息成功',
            type: 'success'
          })
        } catch (error) {
          this.$message.error('修改银行账户信息失败，请确认信息后重试')
          console.warn(error)
        }
      }
    }[operate]
  },
  onSubmit() {
    const query = {
      cwEnterpriseId: this.merchantId,
      ...this.form
    }
    // 校验非空
    if (!checkForm(this.form)) {
      this.$message.error('商家银行账户所有字段均为必填项，请确认是否全部填写完整！！')
      return
    }
    // 校验电话
    if (!checkPhone(this.form.accountPhone)) {
      this.$message.error('开户电话号码输入格式不正确，请确认后提交！！')
      return
    }
    // if (!checkPhone(this.form.phone)) {
    //   this.$message.error('核销电话号码输入格式不正确，请确认后提交！！')
    //   return
    // }
    if (!checkPhone(this.form.managePhone)) {
      this.$message.error('管理电话号码输入格式不正确，请确认后提交！！')
      return
    }

    if (this.isCreate) {
      this.operateFn('add')(query)
    } else {
      this.operateFn('update')(query)
    }
  }
}
