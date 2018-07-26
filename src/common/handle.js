// 跳转到详情页
export function goDetail(options) {
  this.$router.push({
    name: options.name,
    query: options.query
  })
}
