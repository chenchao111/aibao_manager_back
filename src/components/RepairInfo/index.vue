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
            <div v-for="(title, index) in form.titles" :key="index" class="w14">{{title}}</div>
          </div>
          <div v-for="(item, index) in form.data" :key="index" v-show="item.status === '0'" class="flex-line">
            <div class="w14">
              <el-form-item>
                <el-select v-model="item.modelsId" placeholder="请选择车型" clearable>
                  <el-option label="20万以下" value="4"></el-option>
                  <el-option label="20~30万" value="5"></el-option>
                  <el-option label="30~50万" value="6"></el-option>
                  <el-option label="50~130万" value="7"></el-option>
                  <el-option label="130万以上" value="8"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="w14 p20">
               <el-form-item>
                <el-select v-model="item.partsId" placeholder="请选择部件" clearable>
                  <el-option label="一个部件" value="1"></el-option>
                  <el-option label="两个部件" value="2"></el-option>
                  <el-option label="三个部件" value="3"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="w14 p20">
               <el-form-item>
                <el-input v-model="item.original" placeholder="请输入原价" clearable></el-input>
              </el-form-item>
            </div>
            <div class="w14 p20">
               <el-form-item>
                <el-input v-model="item.cost" placeholder="请输入销售价" clearable></el-input>
              </el-form-item>
            </div>
            <div class="w14 p20">
               <el-form-item>
                <el-input v-model="item.purchase" placeholder="请输入成本价" clearable></el-input>
              </el-form-item>
            </div>
            <div class="w14 p20">
               <el-form-item>
                <el-input v-model="item.maxCarBean" placeholder="请输入积分上限" clearable></el-input>
              </el-form-item>
            </div>
            <div class="w14 p20">
               <el-form-item>
                <!-- <div v-show="!isMyModify">{{item.saleStatus ? '上架' : '下架'}}</div> -->
                <el-select v-model="item.saleStatus" placeholder="请选择上/下架" clearable>
                  <el-option label="下架" value="1">下架</el-option>
                  <el-option label="上架" value="0">上架</el-option>
                </el-select>
               </el-form-item>
            </div>
            <div class="w14">
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
    // const cwEnterpriseId = this.$route.query.cwEnterpriseId
    const cwEnterpriseId = this.merchantId
    this.init({ cwEnterpriseId })
  },
  data() {
    return {
      isShowCreateBtn: false,
      isMyModify: false,
      canModify: true,
      form: {
        titles: ['车型范围', '部件', '原价', '销售价', '成本价', '积分兑换上线', '状态', '操作'],
        data: []
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
