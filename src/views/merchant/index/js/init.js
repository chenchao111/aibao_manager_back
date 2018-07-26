import { queryMechantBelongList } from '@/api/operate-manage/mechant'

export default {
  init() {
    this.belongList() // 归属
    this.currentQuery = { // 初始化table数据
      page: 1,
      size: 10,
      ...this.searchForm
    }
    this.operateFn('search')(this.currentQuery)
  },
  async belongList() {
    try {
      const res = await queryMechantBelongList()
      this.belongs = res
    } catch (error) {
      console.warn(error)
    }
  }
}
