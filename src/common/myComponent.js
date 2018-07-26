import { Message } from 'element-ui'

// 确认框
export function myConfirm(options) {
  var _default = {
    title: '提示',
    content: '您确认删除该条记录信息?',
    type: 'danger'
  }
  for (const attr in options) {
    _default[attr] = options[attr]
  }
  return this.$confirm(_default.content, _default.title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: _default.type
  })
}

//  消息提示框
export function myMessage(options) {
  var _default = {
    message: null,
    type: 'info',
    showClose: true,
    duration: 2000
  }
  for (const attr in options) {
    _default[attr] = options[attr]
  }
  // 删除成功后的提示
  Message(_default)
}
