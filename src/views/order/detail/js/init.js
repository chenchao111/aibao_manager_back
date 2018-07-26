import { queryOrderDetail, queryUnOrderDetail } from '@/api/operate-manage/order'

export default {
  init() {
    const query = {
      orderId: this.$route.query.orderId
    }
    this.$route.query.productType === null ? this.orderCommodityDetail(query) : this.orderUnCommodityDetail(query)
    this.$route.query.productType === null && (this.isGoods = true)
    // this.orderDetail()
  },
  async orderCommodityDetail(query) {
    try {
      const res = await queryOrderDetail(query)
      this.orderDetailsVo = res.orderDetailsVo
      this.cwEnterprise = {}
      this.goodsAndExtVo = res.goodsAndExtVo
      this.orderDistribution = res.orderDistribution
    } catch (error) {
      console.warn(error)
    }
  },
  async orderUnCommodityDetail(query) {
    try {
      const res = await queryUnOrderDetail(query)
      this.orderDetailsVo = res.orderDetailsVo
      this.cwEnterprise = res.cwEnterprise
      this.goodsAndExtVo = {}
      this.orderDistribution = {}
    } catch (error) {
      console.warn(error)
    }
  }
}
