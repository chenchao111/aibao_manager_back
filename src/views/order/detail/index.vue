<template>
    <div class="aibao-order-detail">
      <el-card class="card-outer">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单信息</span>
          </div>
          <div class="card-content">
            <ul class="card-content-info-list">
              <li>
                <span class="w16">订单号</span>
                <span class="w16">{{orderDetailsVo.orderNo}}</span>
                <span class="w16">地区</span>
                <span class="w16">{{orderDetailsVo.cityName}}</span>
                <span class="w16">服务种类</span>
                <span class="w20">{{orderDetailsVo.businessTypeName}}</span>
              </li>
              <li>
                <span class="w16">平台</span>
                <span class="w16">车主惠APP</span>
                <span class="w16">下单时间</span>
                <span class="w16">{{orderDetailsVo.createdTime}}</span>
                <span class="w16">支付时间</span>
                <span class="w20">{{orderDetailsVo.paymentTime}}</span>
              </li>
              <li>
                <span class="w16">支付方式</span>
                <span class="w16">{{orderDetailsVo.paymentTypeName}}</span>
                <span class="w16">优惠券</span>
                <span class="w16">{{orderDetailsVo.ticketAmountDesc}}</span>
                <span class="w16">使用积分</span>
                <span class="w20">{{orderDetailsVo.useBean}}</span>
              </li>
              <li>
                <span class="w16">原价</span>
                <span class="w16">{{orderDetailsVo.original + '元'}}</span>
                <span class="w16">销售价格</span>
                <span class="w16">{{orderDetailsVo.totalAmount + '元' }} </span>
                <span class="w16">实付价格</span>
                <span class="w20">{{orderDetailsVo.discountAmount + '元' }} </span>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card v-show="!isGoods" class="box-card">
          <div slot="header" class="clearfix">
            <span>商家信息</span>
          </div>
          <div class="card-content">
            <ul class="card-content-info-list">
              <li>
                <span class="w16">商家编号</span>
                <span class="w16">{{cwEnterprise.entCode}}</span>
                <span class="w16">名称</span>
                <span class="w16">{{cwEnterprise.entName}}</span>
                <span class="w16">归属经营单位</span>
                <span class="w20">{{cwEnterprise.belong}}</span>
              </li>
              <li>
                <span class="w16">门店电话</span>
                <span class="w16">{{cwEnterprise.telephone}}</span>
                <span class="w16">地址</span>
                <span class="w52">{{cwEnterprise.address}}</span>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card v-show="isGoods" class="box-card">
          <div slot="header" class="clearfix">
            <span>商品信息</span>
          </div>
          <div class="card-content">
            <ul class="card-content-info-list">
              <li>
                <span class="w16">商品编号</span>
                <span class="w16">{{goodsAndExtVo.goodsNo}}</span>
                <span class="w16">商品简称</span>
                <span class="w16">{{goodsAndExtVo.goodsName}}</span>
                <span class="w16">商品全称</span>
                <span class="w20">{{goodsAndExtVo.fullName}}</span>
              </li>
              <li>
                <span class="w16">颜色</span>
                <span class="w16">{{goodsAndExtVo.style}}</span>
                <span class="w16">规格</span>
                <span class="w16">{{goodsAndExtVo.standard}}</span>
                <span class="w16">库存</span>
                <span class="w20">{{goodsAndExtVo.goodsCountExt}}</span>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card v-show="isGoods" class="box-card">
          <div slot="header" class="clearfix">
            <span>配送信息</span>
          </div>
          <div class="card-content">
            <ul class="card-content-info-list">
              <li>
                <span class="w16">收件人</span>
                <span class="w16">{{orderDistribution.receiver}}</span>
                <span class="w16">手机号</span>
                <span class="w16">{{orderDistribution.receiverPhone}}</span>
                <span class="w16">地址</span>
                <span class="w20">{{orderDistribution.address}}</span>
              </li>
              <li>
                <span class="w16">快递公司</span>
                <span class="w16">{{orderDistribution.logisticsCompany}}</span>
                <span class="w16">快递单号</span>
                <span class="w16">{{orderDistribution.logisticsBillNo}}</span>
                <span class="w16">快递状态</span>
                <span class="w20"></span>
              </li>
            </ul>
          </div>
        </el-card>
      </el-card>
    </div>
</template>

<script>
import init from './js/init'

export default {
  created() {
    this.init()
  },
  data() {
    return {
      orderDetailsVo: {},
      cwEnterprise: {},
      goodsAndExtVo: {},
      orderDistribution: {},
      isGoods: false
    }
  },
  methods: {
    ...init
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import './style/style.scss';
</style>
