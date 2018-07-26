<template>
    <div class="aibao-order-detail">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>批量导入商家信息(支持手动拖拽文件)</span>
          <a style="float: right; padding: 3px 0; color: green;" type="text" href="http://139.224.149.243:8099/optimus-h5/resources/excelmodel/enterprise.xlsx">导出模板</a>
        </div>
        <div style="text-align: center">
          <el-upload
            class="upload-demo"
            :drag="true"
            action="http://139.224.149.243:8189/cwenterprise/importCwEntExcel"
            :limit = "1"
            :headers="token"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :on-error="handleError"
            name='file'
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">批量导入商家信息(支持手动拖拽文件)</div>
          </el-upload>
        </div>
      </el-card>
    </div>
</template>

<script>

import { getToken } from '@/utils/auth'

export default {
  name: 'uploadExcel',
  data() {
    return {
      tableData: [],
      tableHeader: [],
      token: {
        authorization: getToken()
      }
    }
  },
  methods: {
    selected(data) {
      this.tableData = data.results
      this.tableHeader = data.header
    },
    handleRemove() {

    },
    handleSuccess(response, file) {
      console.log(response)
      // var url = response.result
      // this.form.logoImg = url.split('/').reverse()[0]
      if (!response.result.length) {
        this.$message.success('上传文件成功')
      } else {
        this.$message.error(response.result.join())
      }
    },
    handleError() {
      this.$message.error('上传图片失败，请稍后再试')
    }
  }
}
</script>

<style scoped>
.box-card{
  margin: 10px;
}
</style>

