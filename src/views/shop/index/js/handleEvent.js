import { myConfirm, myMessage } from '@/common/myComponent'

import { goDetail } from '@/common/handle'

import { queryShopList, removeGoods } from '@/api/operate-manage/shop'

export default {
  operateFn(operate) {
    return {
      'remove': async(options, query) => {
        try {
          await myConfirm.call(this, options)
          // 1. 向后台调用删除接口
          await removeGoods(query)
          // 2. 向后台重新请求最新当前页接口
          this.operateFn('search')(this.currentQuery)

          myMessage({
            message: '删除成功',
            type: 'success'
          })
        } catch (error) {
          // 删除成功后的提示
          myMessage({
            message: '删除失败，请重试'
          })
          console.log(error)
        }
      },
      'detail': (options) => { // 详情， 跳转的详情页名称, 传递的参数
        goDetail.call(this, options)
      },
      'search': async(query) => {
        try {
          const res = await queryShopList(query)

          this.tableData = res.data // 初始化table数据
          this.total = res.total// 初始化总条数
        } catch (error) {
          console.warn(error)
        }
      }
    }[operate]
  },
  addFoods: function() {
    const options = { name: 'Shop-detail' }
    goDetail.call(this, options)
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
      name: 'Shop-detail',
      query: {
        ...row
      }
    })
  },
  // 删除订单
  handleRemoveClick(row) {
    console.log(row)
    this.operateFn('remove')({
      title: '提示',
      content: '您确认要删除出当前商品吗?',
      type: 'danger'
    }, {
      goodsId: row.goodsId
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
  clearSearchForm() {
    this.searchForm = {
      saleCityId: '',
      goodsName: ''
    }
  }
}
