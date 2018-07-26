export default {
  init() {
    this.currentQuery = { // 初始化table数据
      page: 1,
      size: 10,
      ...this.searchForm
    }
    this.operateFn('search')(this.currentQuery)
  }
}
