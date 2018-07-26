import { queryShopDetail, queryAllProvinces, queryAllCitys, changeMainFoods, deleteGoodsExt, changeChildFoods, addGoods, addGoodsExt } from '@/api/operate-manage/shop'

export default {
  init() {
    const query = {
      goodsId: this.$route.query.goodsId
    }
    this.goodsId = this.$route.query.goodsId
    this.queryAllProvinces()
    if (this.goodsId) {
      this.isNoFoodsExt = true
      this.changeChildFood = true
      this.queryShopDetail(query)
    } else {
      this.isNoFoodsExt = false
      this.isDisabled = false
      this.childIsDisabled = false
      this.goodsMsg = {
        categoryId: '',
        costPrice: '',
        createdTime: '',
        createdUser: 0,
        details: '',
        detailsList: '',
        fullName: '',
        goodsAttachmentList: [],
        goodsCount: '',
        goodsExtList: '',
        goodsId: '',
        goodsName: '',
        goodsNo: '',
        goodsSort: '',
        groupId: '',
        isUp: '',
        maxCarBean: '',
        modifiedTime: '',
        modifiedUser: '',
        orderCount: '',
        original: '',
        picUrl: '',
        saleCityId: '',
        saleCityName: '',
        saleDistrictId: '',
        saleProvinceId: '',
        saleProvinceName: '',
        saleStatus: '',
        sellingPrice: '',
        status: '',
        summary: ''
      }
    }
  },
  async queryShopDetail(query) {
    try {
      const res = await queryShopDetail(query)
      this.goodsMsg = res
      this.goodsStatus = this.goodsMsg.status ? '下架' : '上架'
      this.resetData()
    } catch (error) {
      console.warn(error)
    }
  },
  resetData() {
    this.mainPic = this.goodsMsg.picUrl ? [
      {
        name: '',
        url: this.goodsMsg.picUrl
      }
    ] : []
    this.goodsMsg.goodsAttachmentList && this.goodsMsg.goodsAttachmentList.forEach((val, index) => {
      const obj = {
        name: '',
        url: val.picUrlAttachment
      }
      this.bannerPicList.push(obj)
    })
    this.goodsMsg.detailsList && this.goodsMsg.detailsList.forEach((val, index) => {
      const obj = {
        name: '',
        url: val
      }
      this.detailPicList.push(obj)
    })
    this.childShopList = this.goodsMsg.goodsExtList || [{
      costPriceExt: '',
      createdUser: 0,
      goodsCountExt: '',
      goodsId: this.goodsId,
      maxCarBeanExt: '',
      modifiedUser: 0,
      original: '',
      picUrlExt: '',
      saleStatus: 0,
      sellingPriceExt: '',
      standard: '',
      style: ''
    }]
  },
  async queryAllProvinces(query) {
    try {
      const res = await queryAllProvinces(query)
      this.provincesList = res
    } catch (error) {
      console.warn(error)
    }
  },
  async queryAllCitys(query) {
    try {
      const res = await queryAllCitys(query)
      this.cityList = res
    } catch (error) {
      console.warn(error)
    }
  },
  async changeMainFoods(data) {
    try {
      await changeMainFoods(data)
      this.saveSuccess()
    } catch (error) {
      console.warn(error)
    }
  },
  async deleteGoodsExt(data) {
    try {
      await deleteGoodsExt(data)
      this.deleteSuccess()
    } catch (error) {
      console.warn(error)
    }
  },
  async changeChildFoods(data) {
    try {
      await changeChildFoods(data)
      this.ModifyChildGoods()
      this.saveSuccess()
    } catch (error) {
      console.warn(error)
    }
  },
  async addGoods(data) {
    try {
      const res = await addGoods(data)
      this.goodsId = res
      this.queryShopDetail({ goodsId: this.goodsId })
      this.saveSuccess()
    } catch (error) {
      console.warn(error)
    }
  },
  async addGoodsExt(data) {
    try {
      await addGoodsExt(data)
      this.isNoFoodsExt = true
      this.ModifyChildGoods()
      this.saveSuccess()
    } catch (error) {
      console.warn(error)
    }
  },
  deleteSuccess: function() {
    this.$message({
      message: '删除成功',
      type: 'success'
    })
  },
  saveSuccess: function() {
    this.$message({
      message: '保存成功',
      type: 'success'
    })
  }
}
