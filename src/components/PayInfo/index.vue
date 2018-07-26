<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div style="text-align: right" v-show="isModify">
          <el-button @click.native="isShowCreateBtn = true" type="primary" size="small">修改</el-button>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="80px" :disabled="!canModify">
          <div class="flex-line">
            <div class="w50">
              <el-form-item label="账户名">
                <el-input v-model="form.accountName" placeholder="请输入账户名称" clearable ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item label="开户行">
                <el-input v-model="form.accountBank" placeholder="请输入开户行" clearable></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="flex-line">
            <div class="w50">
              <el-form-item label="开户账号">
                <el-input v-model="form.accountNo" placeholder="请输入开户账号" clearable></el-input>
              </el-form-item>
            </div>
            <div class="w50">
               <el-form-item label="开户电话">
                <el-input v-model="form.accountPhone" placeholder="请输入开户电话" clearable></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="flex-line">
            <!-- <div class="w50">
              <el-form-item label="核销电话">
                <el-input v-model="form.phone" placeholder="请输入核销电话" clearable></el-input>
              </el-form-item>
            </div> -->
            <div class="w100">
              <el-form-item label="管理电话">
                <el-input v-model="form.managePhone" placeholder="请输入管理电话" clearable></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="submitBtn" v-show="isShowCreateBtn">
            <!-- <el-form-item> -->
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <!-- </el-form-item> -->
          </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import init from './js/init'
import handleEvent from './js/handleEvent'

export default {
  inject: ['reload'],
  props: ['isCreate', 'isModify'],
  created() {
    this.isShowCreateBtn = this.isCreate
    // const cwEnterpriseId = this.$route.query.cwEnterpriseId
    const cwEnterpriseId = this.merchantId
    this.init({ cwEnterpriseId })
  },
  data() {
    return {
      isShowCreateBtn: false,
      canModify: true,
      form: {
        accountName: '',
        accountBank: '',
        accountNo: '',
        accountPhone: '',
        // phone: '',
        managePhone: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'merchantId'
    ])
  },
  methods: {
    ...init,
    ...handleEvent
  }
}
</script>

<style scoped>
@import './style/style.scss';
</style>
