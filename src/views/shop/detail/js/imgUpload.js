export default {
  addMainPicSuccess(response, file, fileList) {
    if (response.result.length) {
      const result = response.result
      this.goodsMsg.picUrl = this.getImgName(result)
      this.$message.success('上传文件成功')
    } else {
      this.$message.error('上传图片失败，请稍后再试')
    }
  },
  addBannerPicSuccess(response, file, fileList) {
    if (response.result.length) {
      fileList.forEach((val, index) => {
        const result = val.hasOwnProperty('response') ? val.response.result : val.url
        const imgUrl = this.getImgName(result)
        if (this.goodsMsg.goodsAttachmentList[index] && this.goodsMsg.goodsAttachmentList.length !== 0) {
          this.goodsMsg.goodsAttachmentList[index].picUrlAttachment = imgUrl
        } else {
          this.goodsMsg.goodsAttachmentList[index] = {
            goodsAttachmentId: '',
            goodsId: this.goodsId,
            picUrlAttachment: imgUrl
          }
        }
      })
      this.$message.success('上传文件成功')
    } else {
      this.$message.error('上传图片失败，请稍后再试')
    }
  },
  addDetailPicSuccess(response, file, fileList) {
    if (response.result.length) {
      this.goodsMsg.details = ''
      fileList.forEach((val, index) => {
        const result = val.hasOwnProperty('response') ? val.response.result : val.url
        const imgUrl = this.getImgName(result)
        if (index !== fileList.length - 1) {
          this.goodsMsg.details += imgUrl + '|'
        } else {
          this.goodsMsg.details += imgUrl
        }
      })
      this.$message.success('上传文件成功')
    } else {
      this.$message.error('上传图片失败，请稍后再试')
    }
  },
  addChildPicSuccess(response, file, fileList) {
    if (response.result.length) {
      const result = response.result
      const len = this.childShopList.length
      this.childShopList[this.index].picUrlExt = result
      this.childShopList.push({})
      this.childShopList.length = len
      this.$message.success('上传图片成功')
    } else {
      this.$message.error('上传图片失败，请稍后再试')
    }
  },
  deleteBannerImg(file, fileList) { // 删除banner图片时的操作
    this.goodsMsg.goodsAttachmentList.forEach((val, index) => {
      const result = val.picUrlAttachment
      const imgUrl = this.getImgName(result)
      if (this.goodsMsg.goodsAttachmentList[index].picUrlAttachment === file.url) {
        this.goodsMsg.goodsAttachmentList[index].status = 1
        return
      }
      this.goodsMsg.goodsAttachmentList[index].picUrlAttachment = imgUrl
    })
  },
  deleteDetailImg(file, fileList) {
    console.log(fileList)
    this.goodsMsg.details = ''
    fileList.forEach((val, index) => {
      const result = val.hasOwnProperty('response') ? val.response.result : val.url
      const imgUrl = this.getImgName(result)
      if (index !== fileList.length - 1) {
        this.goodsMsg.details += imgUrl + '|'
      } else {
        this.goodsMsg.details += imgUrl
      }
    })
  },
  getImgName(url) {
    const arr = url.split('/')
    const len = arr.length
    return arr[len - 1]
  },
  addPicErr() {
    this.$message.error('上传图片失败，请稍后再试')
  },
  handleRemove(file, fileList) {
    console.log(file, fileList)
  }
}
