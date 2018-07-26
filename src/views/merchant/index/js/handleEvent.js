import { myConfirm, myMessage } from '@/common/myComponent'

import { goDetail } from '@/common/handle'

import { queryMechantInfoList, pushMechantStopAndStartUseInfo } from '@/api/operate-manage/mechant'

export default {
  operateFn(operate) {
    return {
      'stop': async(options, query) => {
        try {
          await myConfirm.call(this, options)
          // 1. 向后台调用停用接口
          // 2. 向后台重新请求最新当前页接口
          await pushMechantStopAndStartUseInfo(query)
          this.operateFn('search')(this.currentQuery)

          myMessage({
            message: '操作成功',
            type: 'success'
          })
        } catch (error) {
          // 删除成功后的提示
          myMessage({
            message: '取消停用'
          })
          console.log(error)
        }
      },
      'detail': (options) => { // 详情， 跳转的详情页名称, 传递的参数
        goDetail.call(this, options)
      },
      'search': async(query) => {
        try {
          const res = await queryMechantInfoList(query)
          this.tableData = res.data // 初始化table数据
          this.total = res.total// 初始化总条数
        } catch (error) {
          console.warn(error)
        }
      }
    }[operate]
  },
  // 搜索信息提交
  onSubmit() {
    this.currentQuery = {
      page: 1,
      size: 10,
      ...this.searchForm
    }
    this.operateFn('search')(this.currentQuery)
  },
  // 获取商家详情
  handleDetailClick(row) {
    this.clearMerchant() // 清空商家id
    this.setMerchant(row.cwEnterpriseId) // 设置商家id
    console.log('ggggggggggggggg')
    console.log(row)
    console.log('ggggggggggggggg')
    this.operateFn('detail').call(this, {
      name: 'Merchant-add',
      query: {
        type: 'detail',
        cwEnterpriseId: row.cwEnterpriseId
      }
    })
  },
  // 添加商家信息
  addMerchant() {
    this.clearMerchant()
    this.operateFn('detail').call(this, {
      name: 'Merchant-add',
      query: {
        type: 'add'
      }
    })
  },
  // 批量导出
  batchUpload() {
    this.operateFn('detail').call(this, {
      name: 'Merchant-upload'
    })
  },
  // 点击当前第几页
  handleCurrentChange(val) { // 最终也是调用search
    this.currentQuery = {
      page: val,
      size: 10,
      ...this.searchForm
    }
    this.operateFn('search')(this.currentQuery)
  },
  // 停用
  handleStopClick(item) {
    this.operateFn('stop')({
      title: '提示',
      content: '您确认要对当前用户采用停用操作吗?',
      type: 'danger'
    }, {
      cwEnterpriseId: item.cwEnterpriseId,
      workStatus: 1
    })
  },
  // 启用
  handleStartClick(item) {
    this.operateFn('stop')({
      title: '提示',
      content: '您确认要对当前用户采用启用操作吗?',
      type: 'danger'
    }, {
      cwEnterpriseId: item.cwEnterpriseId,
      workStatus: 0
    })
  },
  // 删除商家
  handleRemoveClick(item) {
    this.operateFn('stop')({
      title: '提示',
      content: '您确认要对当前用户采用删除操作吗?',
      type: 'danger'
    }, {
      cwEnterpriseId: item.cwEnterpriseId,
      status: 1
    })
  },
  clearSearchForm() {
    this.searchForm = {
      cityId: '',
      belong: '',
      serviceId: '',
      keyWord: ''
    }
  }
}
