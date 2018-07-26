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
                <el-select v-model="item.partsId" placeholder="请选择品牌" clearable>
                  <el-option label="道达尔（快驰5000）" value="9"></el-option>
                  <el-option label="道达尔（快驰7000）" value="10"></el-option>
                  <el-option label="壳牌矿物油" value="11"></el-option>
                  <el-option label="壳牌半合成油" value="12"></el-option>
                  <el-option label="壳牌全合成油" value="13"></el-option>
                  <el-option label="嘉实多（金嘉护）" value="14"></el-option>
                  <el-option label="嘉实多（超嘉护）" value="15"></el-option>
                  <el-option label="嘉实多（极护）" value="16"></el-option>
                  <el-option label="道达尔（快驰9000）" value="20"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="w14 p20">
               <el-form-item>
                <el-select v-model="item.modelsId" placeholder="请选择升数" clearable>
                  <el-option label="4L" value="17"></el-option>
                  <el-option label="5L" value="18"></el-option>
                  <el-option label="6L" value="19"></el-option>
                  <el-option label="1L" value="21"></el-option>
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
        titles: ['品牌', '升数', '原价', '销售价', '成本价', '积分兑换上限', '状态', '操作'],
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
