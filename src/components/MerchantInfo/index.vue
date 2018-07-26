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
          <div class="w30">
            <el-form-item label="门店编号">
              <el-input v-model="form.entCode" clearable placeholder="请输入门店编号"></el-input>
            </el-form-item>
          </div>
          <div class="w30">
            <el-form-item label="门店名称">
              <el-input v-model="form.entName" placeholder="请输入门店名称" clearable></el-input>
            </el-form-item>
          </div>
          <div class="w40">
            <el-form-item label="归属">
              <el-select v-model="form.belong" placeholder="请选择">
                <el-option v-for="(item, index) in belongs" :key="index" :label="item.belong" :value="item.belong"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-line">
          <div class="w30">
            <el-form-item label="选择省">
              <el-select @change="provinceIdChoose" v-model="form.provinceId" placeholder="请选择省" clearable>
                <el-option v-for="(item, index) in provinceIds" :key="index" :label="item.fullName" :value="item.regionId"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="w30">
            <el-form-item label="选择市" class="search-form-item">
              <el-select @change="cityIdChoose" v-model="form.cityId" placeholder="请选择市" clearable>
                <el-option v-for="(item, index) in cityIds" :key="index" :label="item.fullName" :value="item.regionId"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="w40">
            <el-form-item label="选择区/县">
              <el-select v-model="form.districtId" placeholder="请选择区/县" clearable>
                <el-option v-for="(item, index) in districtIds" :key="index" :label="item.fullName" :value="item.regionId"></el-option>
              </el-select>
            </el-form-item>
          </div>

        </div>
        <div class="flex-line">
          <div class="w50">
            <el-form-item label="门店电话">
              <el-input v-model="form.telephone" placeholder="请输入门店电话" clearable></el-input>
            </el-form-item>
          </div>
          <div class="w50">
            <el-form-item label="核销电话">
              <el-input v-model="form.phone" placeholder="请输入门店电话" clearable></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="flex-line">
          <div class="w50">
            <el-form-item label="营业时间">
              <!-- <el-input v-show="!isShowCreateBtn" v-model="form.workTime"></el-input> -->
              <el-time-select
                clearable
                placeholder="起始时间"
                v-model="form.startTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }">
              </el-time-select>
              <el-time-select
                clearable
                placeholder="结束时间"
                v-model="form.endTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.startTime
                }">
              </el-time-select>
            </el-form-item>
          </div>
          <div class="w50">
            <el-form-item label="经纬度">
              <el-input v-model="form.coordinate" placeholder="请在地图定位经纬度" clearable></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="门店图片">
          <div class="flex-line">
            <!-- <img style="width: 50%; height: 30%" :src="form.logoImg" alt=""> -->
            <div class="w40">
              <el-upload
                :headers="token"
                drag
                :limit = "1"
                action = "http://139.224.149.243:8189/cwenterprise/uploadCwEntLogoImages"
                list-type = "picture-card"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :on-error="handleError"
                :on-preview="handlePictureCardPreview"
                name='file'
                :file-list="fileList">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
            <!-- <div class="w40">
              <el-upload
                :drag = true
                :limit = "1"
                :multiple='false'
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="fileList2">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div> -->
          </div>
        </el-form-item>
        <el-form-item label="门店地址" style="margin-top: 50px">
          <div>
            <el-input v-model="form.address" placeholder="请输入门店地址" clearable></el-input>
          </div>
          <div v-show="isShowCreateBtn" class="place">
            <el-amap-search-box class="search-box" :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap :plugin="plugin" ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-aibao">
              <div id="panel"></div>
              <!-- 用来显示当前定位点marker -->
              <el-amap-marker vid="current-marker" :position="currentLocationMarker.position" :draggable="currentLocationMarker.draggable" :title="currentLocationMarker.title" :events="currentLocationMarker.events"></el-amap-marker>
              <!-- 用来显示附近洗车定位点marker -->
              <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
            </el-amap>
            <div class="toolbar">
              <span>用来显示当前洗车行相关信息</span>
            </div>
          </div>
        </el-form-item>
         <div class="submitBtn" v-show="isShowCreateBtn">
            <el-button type="primary" @click="onSubmit">保存</el-button>
         </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

import { initMarker } from '@/common/map'

import init from './js/init'
import handleEvent from './js/handleEvent'

import VueAMap from 'vue-amap'

import { getToken } from '@/utils/auth'

const amapManager = new VueAMap.AMapManager()

export default {
  props: ['isCreate', 'isModify'],
  created() {
    this.isShowCreateBtn = this.isCreate
    // const cwEnterpriseId = this.$route.query.cwEnterpriseId
    const cwEnterpriseId = this.merchantId
    this.init({ cwEnterpriseId })
  },
  data() {
    const self = this
    return {
      isShowCreateBtn: false,
      canModify: true,
      provinceIds: [],
      cityIds: [],
      districtIds: [],
      token: {
        authorization: getToken()
      },
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      form: {
        entName: '',
        telephone: '',
        belong: '',
        logoImg: '',
        coordinate: '',
        address: '',
        workTime: '',
        endTime: '',
        startTime: '',
        phone: '',
        provinceId: '',
        cityId: '',
        districtId: ''
      },
      belongs: [], // 归属
      amapManager, // 全局，用于获取高德map实例
      map: null, // 高德原生map实例
      driving: null, // 驾车路线规划
      zoom: 12,
      center: [116.38, 39.90],
      // 当前所在位置定位点
      currentLocationMarker: initMarker({
        title: '您当前所在位置',
        draggable: true
      }),
      // 地图事件
      events: {
        init: (o) => { // 初始化地图
          const map = amapManager.getMap() // 获取高德原生map
          self.map = map
          this.initPlugin(map, AMap)
        },
        'moveend': () => {
          // console.log('触发地图')
          // const position = this.$refs.map.$$getCenter()
          // // 实现整个marker替换
          // const ary = []
          // for (var i = 0; i < 10; i++) {
          //   ary.push(initMarker({
          //     position
          //   }))
          // }
          // this.markers = ary
          // console.log(this.markers)
        },
        'click': (e) => { // 点击地图的时候触发
          const location = e.lnglat
          this.currentLocationMarker.position = [location.lng, location.lat]
          this.center = [location.lng, location.lat]
          this.form.coordinate = location.lng + ',' + location.lat
          // addMarker({
          //   position: [e.lnglat.lng, e.lnglat.lat],
          //   driving: self.driving,
          //   currentLocationMarker: self.currentLocationMarker
          // }, self.markers)
        }
      },
      // 洗车店marker点
      markers: [],
      plugin: [{ // toolBar功能，用于显示当前车店
        pName: 'ToolBar',
        events: {
          init(instance) {
            // console.log(instance)
          }
        }
      }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'merchantId'
    ])
  },
  methods: {
    ...init,
    ...handleEvent,
    ...mapMutations({
      setMerchant: 'SET_MERCHANT_ID',
      clearMerchant: 'CLEAR_MERCHANT_ID'
    }),
    handleRemove(file, fileList) {
      this.fileList = fileList.filter(item => {
        return item.name !== file.name
      })
    },
    handleSuccess(response, file, fileList) {
      const url = response.result
      const name = url.split('/').reverse()[0]
      this.fileList.push({
        name: name,
        url: url
      })
      this.form.logoImg = name
      this.$message.success('上传图片成功')
    },
    handleError() {
      this.$message.error('上传图片失败，请稍后再试')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
@import './style/style.scss';
</style>
