import { exportDataToExcel } from '@/common/exportDataToExcel'

import { myConfirm, myMessage } from '@/common/myComponent'

import { goDetail } from '@/common/handle'

import { queryOrderList, removeOrderInfo } from '@/api/operate-manage/order'

import { formatDate } from '@/common/formatDate'

export default {
  operateFn(operate) {
    return {
      'remove': async(options, query) => {
        try {
          await myConfirm.call(this, options)
          // 1. 向后台调用删除接口
          await removeOrderInfo(query)
          // 2. 向后台重新请求最新当前页接口
          this.operateFn('search')(this.currentQuery)

          myMessage({
            message: '删除成功',
            type: 'success'
          })
        } catch (error) {
          // 删除成功后的提示
          myMessage({
            message: '删除失败, 请稍后重试!!'
          })
          console.log(error)
        }
      },
      'detail': (options) => { // 详情， 跳转的详情页名称, 传递的参数
        goDetail.call(this, options)
      },
      'search': async(query) => {
        if ((query.orderTime) && (query.orderTime.length === 2)) { // 时间转换
          query.startTime = formatDate(new Date(query.orderTime[0]))
          query.endTime = formatDate(new Date(query.orderTime[1]))
        }
        if (query.productTypeList.length > 0) {
          for (let i = 0; i < query.productTypeList.length; i++) {
            if (query.productTypeList[i] === '') {
              query.productTypeList[i] = null
              continue
            }
            query.productTypeList[i] = parseInt(query.productTypeList[i])
          }
        }
        try {
          const res = await queryOrderList(query)
          console.log(11111111)
          console.log(res)
          console.log(2222222)
          this.tableData = res.data // 初始化table数据
          this.total = res.total// 初始化总条数
        } catch (error) {
          console.warn(error)
        }
      },
      'export': async(query) => {
        if ((query.orderTime) && (query.orderTime.length === 2)) { // 时间转换
          query.startTime = formatDate(new Date(query.orderTime[0]))
          query.endTime = formatDate(new Date(query.orderTime[1]))
        }
        try {
          const res = await queryOrderList(query)
          exportDataToExcel({
            tHeader: ['订单号', '地区', '服务种类', '商家名称', '实付金额', '订单状态', '生成时间'],
            filterVal: ['orderNo', 'cityName', 'businessTypeName', 'entName', 'discountAmount', 'orderStateName', 'createdTime'],
            data: res.data
          })
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
  // 获取订单详情
  handleDetailClick(row) {
    // this.$router.push({ name: 'Order-detail' })
    this.operateFn('detail').call(this, {
      name: 'Order-detail',
      query: {
        ...row
      }
    })
  },
  // 删除订单
  handleRemoveClick(row) {
    this.operateFn('remove')({
      title: '提示',
      content: '您确认要删除出当前订单吗?',
      type: 'danger'
    }, {
      orderId: row.orderId
    })
  },
  // 点击当前第几页(根据页码+搜索form进行数据请求获取指定页数据内容进行渲染)
  handleCurrentChange(val) {
    this.currentQuery = {
      page: val,
      size: 10,
      ...this.searchForm
    }
    this.operateFn('search')(this.currentQuery)
  },
  // 将数据导出成excel表格
  exportToExcel() {
    const query = this.currentQuery
    query.size = 1000000000 // 查找出全部
    this.operateFn('export')(query)
  },
  clearSearchForm() {
    this.searchForm = {
      cityId: '',
      productTypeList: [],
      orderState: '',
      keyWords: '',
      orderTime: '',
      startTime: '',
      endTime: ''
    }
  }
}
