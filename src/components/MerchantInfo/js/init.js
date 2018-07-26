import { queryMechantDetailInfo, queryMechantBelongList, queryAllProvinces, queryAllCitys, queryAllDistricts } from '@/api/operate-manage/mechant'

import { numToString } from '@/common/numToString'
export default {
  init(query) {
    !this.isCreate && this.queryMechantInfo(query) // 详情页 获取信息

    this.belongList() // 归属

    this.provincesList()
  },
  async queryMechantInfo(query) {
    try {
      const res = await queryMechantDetailInfo(query)
      var _time = res.workTime.split('-')
      this.form = numToString(res)
      this.$set(this.form, 'startTime', _time[0])
      this.$set(this.form, 'endTime', _time[1])

      this.fileList.push({
        neme: res.logoImg.split('/').reverse()[0],
        url: res.logoImg
      })

      if (!this.isCreate) {
        this.cityIds = numToString(await queryAllCitys(this.form.provinceId))

        this.districtIds = numToString(await queryAllDistricts(this.form.cityId))
      }
    } catch (error) {
      console.log(error)
    }
  },
  async belongList() {
    try {
      const res = await queryMechantBelongList()
      this.belongs = res
    } catch (error) {
      console.warn(error)
    }
  },
  async provincesList() {
    try {
      const res = await queryAllProvinces()
      this.provinceIds = numToString(res)
    } catch (error) {
      console.warn(error)
    }
  },
  async citysList(provincesId) {
    try {
      const res = await queryAllCitys(provincesId)
      this.cityIds = numToString(res)
    } catch (error) {
      console.warn(error)
    }
  },
  async districtsList(cityId) {
    try {
      const res = await queryAllDistricts(cityId)
      this.districtIds = numToString(res)
    } catch (error) {
      console.warn(error)
    }
  }
}
