<template>
    <div class="aibao-order-detail">
      <el-card class="card-outer">
        <div class="card-content">
          <el-tabs type="border-card" @tab-click="tabClick">
          <!-- <el-tabs type="border-card"> -->
            <el-tab-pane label="商家信息">
              <!-- <merchant-info :isCreate='isCreate' :isModify='isModify'/> -->
            </el-tab-pane>
            <el-tab-pane label="基础服务">
              <!-- <service-info :isCreate='isCreate' :isModify='isModify'/> -->
            </el-tab-pane>
            <el-tab-pane label="快修服务">
              <!-- <repair-info :isCreate='isCreate' :isModify='isModify'/> -->
            </el-tab-pane>
            <el-tab-pane label="保养服务">
              <!-- <maintenance-info :isCreate='isCreate' :isModify='isModify'/> -->
            </el-tab-pane>
            <el-tab-pane label="银行账户信息">
              <!-- <pay-info :isCreate='isCreate' :isModify='isModify'/> -->
            </el-tab-pane>
          </el-tabs>
          <!-- 动态组件 -->
          <keep-alive>
            <component :isCreate='isCreate' :isModify='isModify' v-bind:is="currentTabComponent"></component>
          </keep-alive>
        </div>
      </el-card>

    </div>
</template>

<script>
const tab = {
  '商家信息': 'MerchantInfo',
  '基础服务': 'ServiceInfo',
  '快修服务': 'RepairInfo',
  '保养服务': 'MaintenanceInfo',
  '银行账户信息': 'PayInfo'
}
export default {
  created() {
    // 进行页面判断(add和detail封装在一个页面中)
    const type = this.$route.query.type
    type === 'detail' ? this.isCreate = false : this.isCreate = true
    type === 'detail' ? this.isModify = true : this.isModify = false
  },
  data() {
    return {
      isShow: false,
      currentTabComponent: 'MerchantInfo'
    }
  },
  components: {
    MerchantInfo: () => import('@/components/MerchantInfo'),
    ServiceInfo: () => import('@/components/ServiceInfo'),
    RepairInfo: () => import('@/components/RepairInfo'),
    MaintenanceInfo: () => import('@/components/MaintenanceInfo'),
    PayInfo: () => import('@/components/PayInfo')
  },
  methods: {
    tabClick(tabInfo, event) {
      this.currentTabComponent = tab[tabInfo.label]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-outer{
  margin: 10px;
}
</style>
