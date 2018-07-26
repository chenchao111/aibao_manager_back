import { initGeolocationPlugin, initDrivingPlugin } from '@/common/map'
import { pushMechantInfo, updateMechantInfo } from '@/api/operate-manage/mechant'

import { checkForm, checkPhone, checkLongitudeAndLatitude } from '@/common/checkForm'

export default {
  operateFn(operate) {
    return {
      'add': async(query) => {
        try {
          const res = await pushMechantInfo(query)
          if (res > 0) {
            console.log(111111)
            console.log(res)
            console.log(222222)

            this.setMerchant(res)
            this.$message({
              message: '添加商家信息成功',
              type: 'success'
            })
            this.canModify = false
          } else {
            this.$message.error('门店编号重复，添加商家信息失败，请确认信息后重试')
          }
        } catch (error) {
          this.$message.error('添加商家信息失败，请确认信息后重试')
          console.warn(error)
        }
      },
      'update': async(query) => {
        try {
          await updateMechantInfo(query)
          this.$message({
            message: '修改商家信息成功',
            type: 'success'
          })
        } catch (error) {
          this.$message.error('修改商家信息失败，请确认信息后重试')
          console.warn(error)
        }
      }
    }[operate]
  },
  // 初始化插件
  async initPlugin(map, AMap) {
    try {
      const geolocation = await initGeolocationPlugin(map)
      geolocation.getCurrentPosition((status, result) => { // 获取精确定位点，将marker定位到此处
        this.currentLocationMarker.position = [result.position.lng, result.position.lat]
      })
      this.driving = await initDrivingPlugin(map, AMap)
    } catch (error) {
      console.warn(error)
    }
  },
  // 地图搜索功能
  onSearchResult(pois) {
    if (pois.length > 0) {
      const location = pois[0]
      this.currentLocationMarker.position = [location.lng, location.lat]
      this.center = [location.lng, location.lat]
      this.form.coordinate = location.lng + ',' + location.lat
      // pois.forEach((poi, index) => {
      //   (index === 0) && (this.currentLocationMarker.position = [poi.lng, poi.lat])
      //   if ()
      // addMarker({
      //   position: [poi.lng, poi.lat],
      //   markers: this.markers,
      //   driving: this.driving,
      //   currentLocationMarker: this.currentLocationMarker
      // })
      // })
    }
  },
  onSubmit() {
    const query = {
      entCategory: 0,
      workStatus: 0,
      ...this.form
    }
    query.workTime = query.startTime + '-' + query.endTime
    this.form.workTime = query.startTime + '-' + query.endTime

    console.log(this.form)
    // 校验非空
    if (!checkForm(this.form)) {
      this.$message.error('商家信息页面所有字段均为必填项，请确认是否全部填写完整！！')
      return
    }
    // 校验电话
    if (!checkPhone(this.form.telephone)) {
      this.$message.error('门店电话号码输入格式不正确，请确认后提交！！')
      return
    }
    // 校验电话
    if (!checkPhone(this.form.phone)) {
      this.$message.error('核销电话号码输入格式不正确，请确认后提交！！')
      return
    }
    // 校验经纬度
    if (!checkLongitudeAndLatitude(this.form.coordinate)) {
      this.$message.error('经纬度输入格式不正确，必须有 , 号分隔, 前后必须是数字, 请确认后提交！！')
      return
    }

    if (this.isCreate) {
      this.operateFn('add')(query)
    } else {
      query.cwEnterpriseId = this.merchantId
      this.operateFn('update')(query)
    }
  },
  provinceIdChoose(item) {
    this.form.cityId = ''
    this.form.districtId = ''
    this.citysList(item)
  },
  cityIdChoose(item) {
    this.form.districtId = ''
    this.districtsList(item)
  }
}
