<template>
  <div class="aibao-order-detail">
    <el-card class="card-outer">
      <div class="tit" v-if="goodsId">
        <span class="play-block w40">商品编号：{{goodsMsg.goodsNo}}</span>
        <span class="play-block w60">
            <el-button type="success" @click="ModifyFn" size="mini">{{mainFoodsBtn}}</el-button>
          </span>
      </div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品信息</span>
        </div>
        <div class="card-content">
          <ul class="card-content-info-list">
            <li>
              <span class="w20">商品简称</span>
              <span class="w30">
                <el-input class="no-border" v-model="goodsMsg.goodsName" placeholder=""
                          :disabled="isDisabled"></el-input>
              </span>
              <span class="w20">商品全称</span>
              <span class="w30">
                <el-input class="no-border" v-model="goodsMsg.fullName" placeholder=""
                          :disabled="isDisabled"></el-input>
              </span>
            </li>
            <li>
              <span class="w20">商品成本价</span>
              <span class="w30">
                <el-input class="no-border" v-model="goodsMsg.costPrice" placeholder=""
                          :disabled="isDisabled"></el-input>
              </span>
              <span class="w20">商品原价</span>
              <span class="w30">
                <el-input class="no-border" v-model="goodsMsg.original" placeholder=""
                          :disabled="isDisabled"></el-input>
              </span>
            </li>
            <li>
              <span class="w20">商品销售价</span>
              <span class="w30">
                <el-input class="no-border" v-model="goodsMsg.sellingPrice" placeholder=""
                          :disabled="isDisabled"></el-input>
              </span>
              <span class="w20">积分抵扣上限</span>
              <span class="w30">
                <el-input class="no-border" v-model="goodsMsg.maxCarBean" placeholder=""
                          :disabled="isDisabled"></el-input>
              </span>
            </li>
            <li>
              <span class="w20">库存数量</span>
              <span class="w30">
                <el-input class="no-border" v-model="goodsMsg.goodsCount" placeholder=""
                          :disabled="isDisabled"></el-input>
              </span>
              <span class="w20">商品状态</span>
              <span class="w30">
                <el-select  class="no-border" v-model="goodsStatus" :disabled="isDisabled" @change="changeStatus" placeholder="请选择" name="province">
                  <el-option
                    key="0"
                    label="上架"
                    value="0">
                  </el-option>
                  <el-option
                    key="1"
                    label="下架"
                    value="1">
                  </el-option>
                </el-select>
              </span>
            </li>
            <li>
              <span class="w20">省份</span>
              <span class="w30">
                <el-select  class="no-border" v-model="goodsMsg.saleProvinceName" :disabled="isDisabled" @change="provinceChange" placeholder="请选择" name="province">
                  <el-option
                    v-for="item in provincesList"
                    :key="item.regionId"
                    :label="item.fullName"
                    :value="item.regionId">
                  </el-option>
                </el-select>
              </span>
              <span class="w20">城市</span>
              <span class="w30">
                <el-select  class="no-border" v-model="goodsMsg.saleCityName" :disabled="isDisabled" @change="cityChange" placeholder="请选择" name="city">
                  <el-option
                    v-for="item in cityList"
                    :key="item.regionId"
                    :label="item.fullName"
                    :value="item.regionId">
                  </el-option>
                </el-select>
              </span>
            </li>
            <li>
              <span class="w20">商品主图</span>
              <span class="w80 text-left">
                  <el-upload
                    action="http://139.224.149.243:8189/cwenterprise/uploadCwEntLogoImages"
                    list-type="picture-card"
                    :headers="token"
                    :file-list="mainPic"
                    :disabled="isDisabled"
                    :limit="limitNum"
                    :on-success="addMainPicSuccess"
                    :on-remove="handleRemove"
                    :on-error="addPicErr">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </span>
            </li>
            <li>
              <span class="w20">轮播图</span>
              <span class="w80 text-left">
                  <el-upload
                    action="http://139.224.149.243:8189/cwenterprise/uploadCwEntLogoImages"
                    list-type="picture-card"
                    :disabled="isDisabled"
                    :headers="token"
                    :file-list="bannerPicList"
                    :on-success="addBannerPicSuccess"
                    :on-remove="deleteBannerImg"
                    :on-error="addPicErr">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </span>
            </li>
            <li>
              <span class="w20">详情图</span>
              <span class="w80 text-left">
                <el-upload
                  action="http://139.224.149.243:8189/cwenterprise/uploadCwEntLogoImages"
                  list-type="picture-card"
                  :disabled="isDisabled"
                  :file-list="detailPicList"
                  :headers="token"
                  :on-success="addDetailPicSuccess"
                  :on-remove="deleteDetailImg"
                  :on-error="addPicErr">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                </span>
            </li>
          </ul>
        </div>
        <el-button class="success-btn" v-show="!isDisabled" type="success" @click="changeFoods" size="mini">完成</el-button>
      </el-card>
      <el-card class="box-card child-shop" v-if="goodsId">
        <div slot="header" class="clearfix font-size-zero">
          <span class="play-block w20">子商品信息</span>
          <span class="play-block w80 text-right" v-if="isNoFoodsExt">
            <el-button type="success" @click="addChildGoods" size="mini">添加子商品</el-button>
            <el-button type="success" @click="ModifyChildGoods" size="mini">{{childFoodsBtn}}</el-button>
          </span>
        </div>
        <div class="card-content">
          <div class="shop-children" v-for="(item, index) in childShopList" :key="index">
            <ul class="card-content-info-list" >
              <li>
                <span class="w20">颜色</span>
                <span class="w30">
                <el-input class="no-border" v-model="item.style" placeholder="" :disabled="childIsDisabled"></el-input>
              </span>
                <span class="w20">规格</span>
                <span class="w30">
                <el-input class="no-border" v-model="item.standard" placeholder=""
                          :disabled="childIsDisabled"></el-input>
              </span>
              </li>
              <li>
                <span class="w20">商品主图</span>
                <span class="w80 text-left" @click="addEvent(index)">
                <el-upload
                  action="http://139.224.149.243:8189/cwenterprise/uploadCwEntLogoImages"
                  list-type="picture-card"
                  :file-list="item.picUrlExt ? [{name: '', url: item.picUrlExt, index: index}] : []"
                  :disabled="childIsDisabled"
                  :headers="token"
                  :limit="limitNum"
                  :on-success="addChildPicSuccess"
                  :on-remove="handleRemove"
                  :on-error="addPicErr">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </span>
              </li>
            </ul>
            <div class="btn-group">
              <el-button type="success" @click="removeChildGoods(index)" size="mini">删除</el-button>
            </div>
          </div>
        </div>
        <el-button class="success-btn" v-show="!childIsDisabled" type="success" @click="changeChild" size="mini">完成</el-button>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import init from './js/init'
import { getToken } from '@/utils/auth'
import imgUpload from './js/imgUpload'

export default {
  created() {
    this.init()
  },
  data() {
    return {
      isNoFoodsExt: false,
      token: {
        authorization: getToken()
      },
      goodsStatus: '',
      provinceName: '',
      goodsId: '',
      mainFoodsBtn: '修改',
      childFoodsBtn: '修改',
      isMainFoodsBtn: false,
      goodsMsg: '',
      limitNum: 1,
      mainPic: [],
      bannerPicList: [],
      detailPicList: [],
      childShopList: [
        {
          costPriceExt: '',
          createdUser: 0,
          goodsCountExt: '',
          goodsId: '',
          maxCarBeanExt: '',
          modifiedUser: 0,
          original: '',
          picUrlExt: '',
          saleStatus: 0,
          sellingPriceExt: '',
          standard: '',
          style: ''
        }
      ],
      provincesList: [],
      cityList: [],
      isDisabled: true,
      childIsDisabled: true,
      dialogImageUrl: '',
      dialogVisible: false,
      index: ''
    }
  },
  methods: {
    ...init,
    ...imgUpload,
    addEvent(i) {
      this.index = i
      console.log(i)
    },
    ModifyFn: function() {
      this.isDisabled = !this.isDisabled
      this.mainFoodsBtn = this.isDisabled ? '修改' : '取消'
    },
    addChildGoods: function() {
      const childGoods = {
        costPriceExt: this.goodsMsg.costPrice,
        createdUser: 0,
        goodsCountExt: this.goodsMsg.goodsCount,
        goodsId: this.goodsId,
        maxCarBeanExt: this.goodsMsg.maxCarBean,
        modifiedUser: 0,
        original: this.goodsMsg.original,
        picUrlExt: '',
        saleStatus: 0,
        sellingPriceExt: this.goodsMsg.sellingPrice,
        standard: '',
        style: ''
      }
      this.childIsDisabled = false
      this.childShopList.push(childGoods)
    },
    ModifyChildGoods: function(i) {
      this.childIsDisabled = !this.childIsDisabled
      this.childFoodsBtn = this.childIsDisabled ? '修改' : '取消'
    },
    removeChildGoods: function(i) {
      const len = this.childShopList.length
      const left = this.childShopList.slice(0, i)
      const right = this.childShopList.slice(i + 1, len)
      const goodsExtId = this.childShopList[i].goodsExtId
      const data = {
        goodsExtId: goodsExtId
      }
      this.childShopList = left.concat(right)
      this.deleteGoodsExt(data)
    },
    changeFoods: function() { // 主商品修改
      // var picUrl = this.cutImgUrl(this.mainPic[0].url) // 商品主图 str
      // var picUrlExtList = [] // 商品轮播图 Array
      // this.bannerPicList.forEach((val) => {
      //   const str = this.cutImgUrl(val.url)
      //   picUrlExtList.push(str + '')
      // })
      // var details = '' // 商品详情图 str 通过'|'拼接
      // this.detailPicList.forEach((val, index) => {
      //   const str = this.cutImgUrl(val.url)
      //   if (index !== this.detailPicList.length - 1) {
      //     details += str + '|'
      //   } else {
      //     details += str
      //   }
      // })
      const data = {
        goodsId: this.goodsId,
        goodsName: this.goodsMsg.goodsName,
        fullName: this.goodsMsg.fullName,
        saleProvinceId: this.goodsMsg.saleProvinceId,
        saleCityId: this.goodsMsg.saleCityId,
        costPrice: this.goodsMsg.costPrice,
        original: this.goodsMsg.original,
        sellingPrice: this.goodsMsg.sellingPrice,
        maxCarBean: this.goodsMsg.maxCarBean,
        goodsCount: this.goodsMsg.goodsCount,
        picUrl: this.goodsMsg.picUrl,
        goodsAttachmentList: this.goodsMsg.goodsAttachmentList,
        details: this.goodsMsg.details,
        createdUser: '',
        modifiedUser: '',
        saleStatus: this.goodsMsg.status
      }
      this.goodsId ? this.changeMainFoods(data) : this.addGoods(data)
      this.ModifyFn()
    },
    changeChild: function() { // 保存子商品
      var arr = []
      if (!this.isNoFoodsExt) {
        this.childShopList[0].costPriceExt = this.goodsMsg.costPrice
        this.childShopList[0].goodsCountExt = this.goodsMsg.goodsCount
        this.childShopList[0].maxCarBeanExt = this.goodsMsg.maxCarBean
        this.childShopList[0].original = this.goodsMsg.original
        this.childShopList[0].sellingPriceExt = this.goodsMsg.sellingPrice
      }
      for (let i = 0; i < this.childShopList.length; i++) {
        var obj = { ...this.childShopList[i] }
        obj.picUrlExt = this.cutImgUrl(obj.picUrlExt)
        obj.goodsId = this.goodsId
        arr.push(obj)
      }
      this.isNoFoodsExt ? this.changeChildFoods(arr) : this.addGoodsExt(arr)
    },
    changeStatus: function(val) {
      this.goodsMsg.goodsStatus = val
    },
    provinceChange: function(val) {
      const options = {
        provinceId: val
      }
      this.goodsMsg.saleProvinceId = val
      this.goodsMsg.saleCityName = ''
      this.goodsMsg.saleCityId = ''
      this.queryAllCitys(options)
    },
    cityChange: function(val) {
      this.goodsMsg.saleCityId = val
    },
    cutImgUrl: function(val) {
      var str = 'http://139.224.149.243:8099/optimus-h5/resources/images/'
      var len = str.length
      var str01 = ''
      if (val.indexOf(str) >= 0) {
        str01 = val.substr(len, val.length)
      }
      return str01
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.no-border .el-input__inner{
  border: none !important;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './style/style.scss';
</style>
