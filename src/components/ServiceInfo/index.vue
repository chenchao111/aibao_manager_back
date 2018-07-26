<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div style="text-align: right" v-show="isMyModify">
          <el-button @click.native="isShowCreateBtn = true" type="primary" size="small">修改</el-button>
        </div>
        <div style="text-align: right" v-show="!isMyModify">
          <el-button @click.native="addCar" type="primary" size="small">添加</el-button>
        </div>
      </div>
      <el-form ref="form" :model="form" :disabled="!canModify">
          <div class="flex-line">
            <div class="w15">服务</div>
            <div class="w15">原价（元）</div>
            <div class="w15">销售价（元）</div>
            <div class="w15">成本价（元）</div>
            <div class="w15">积分兑换上限</div>
            <div class="w15">状态</div>
            <div class="w10">操作</div>
          </div>
          <div v-for="(item, index) in form.items" :key="index" v-show="item.status === '0'" class="flex-line">
            <div class="w15">
              <el-form-item>
                <el-select v-model="item.productType" placeholder="请选择服务" clearable>
                  <el-option label="标准洗车" value="201"></el-option>
                  <el-option label="全车精洗" value="202"></el-option>
                  <el-option label="全车打蜡" value="126"></el-option>
                  <el-option label="简易年检" value="141"></el-option>
                  <el-option label="上线年检" value="142"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="w15 p20">
               <el-form-item>
                <el-input v-model="item.original" placeholder="请输入原价" clearable></el-input>
              </el-form-item>
            </div>
            <div class="w15 p20">
               <el-form-item>
                <el-input v-model="item.cost" placeholder="请输入销售价" clearable></el-input>
              </el-form-item>
            </div>
            <div class="w15 p20">
               <el-form-item>
                <el-input v-model="item.discount" placeholder="请输入成本价" clearable></el-input>
              </el-form-item>
            </div>
            <div class="w15 p20">
               <el-form-item>
                <el-input v-model="item.maxCarBean" placeholder="请输入积分上限" clearable></el-input>
              </el-form-item>
            </div>
            <div class="w15 p20">
               <el-form-item>
                <!-- <div v-show="!isMyModify">{{item.saleStatus ? '上架' : '下架'}}</div> -->
                <el-select v-model="item.saleStatus" placeholder="请选择上/下架" clearable>
                  <el-option label="下架" value="1">下架</el-option>
                  <el-option label="上架" value="0">上架</el-option>
                </el-select>
               </el-form-item>
            </div>
            <div class="w10 p20">
               <el-form-item>
                 <el-button type="danger" @click="removeInfo(index)">删除</el-button>
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
    this.isMyModify = this.isModify
    const cwEnterpriseId = this.$route.query.cwEnterpriseId
    this.init({ cwEnterpriseId })
  },
  data() {
    return {
      isShowCreateBtn: false,
      isMyModify: false,
      canModify: true,
      form: {
        items: []
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
