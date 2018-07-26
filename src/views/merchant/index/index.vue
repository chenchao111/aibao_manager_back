<template>
  <div class="aibao-order">
    <el-card class="box-card">
      <div slot="header">
        <el-form label-width="100px" :inline="true" :model="searchForm" class="search-form-list">
          <el-form-item label="选择地区" class="search-form-item">
            <el-select v-model="searchForm.cityId" placeholder="请选择地区" clearable size="mini">
              <el-option label="全国" value=""></el-option>
              <el-option label="北京" value="110100"></el-option>
              <el-option label="嘉兴" value="330400"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择归属" class="search-form-item">
            <el-select v-model="searchForm.belong" placeholder="请选择归属" clearable size="mini">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in belongs" :key="index" :label="item.belong" :value="item.belong"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务种类" class="search-form-item">
            <el-select v-model="searchForm.serviceId" placeholder="请选择服务种类" clearable size="mini">
              <el-option label="全部" value=""></el-option>
              <el-option label="标准洗车" value="201"></el-option>
              <el-option label="全车精洗" value="202"></el-option>
              <el-option label="标准保养" value="121"></el-option>
              <el-option label="全车打蜡" value="126"></el-option>
              <el-option label="快修服务" value="501"></el-option>
              <el-option label="简易年检" value="501"></el-option>
              <el-option label="上线年检" value="142"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字" class="search-form-item">
            <el-input v-model="searchForm.keyWord" placeholder="商家编号/名称/核销电话等" clearable size="mini"></el-input>
          </el-form-item>
          <el-form-item class="search-form-item">
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
            <el-button type="primary" @click="clearSearchForm" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-card class="box-card">
          <div slot="header" class="form-list-header">
            <p class="left">商家查询结果：{{total}}条</p>
            <div class="right line-show">
              <el-button type="success" size="mini" @click="addMerchant">新增</el-button>
              <el-button type="success" size="mini" @click="batchUpload">批量导入</el-button>
            </div>
          </div>
          <div>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="entCode"
                label="商家编号"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="cityName"
                label="地区"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="belong"
                label="归属经营单位"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="entName"
                label="商家名称"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="serviceName"
                label="服务种类"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="核销电话"
                fit="true">
              </el-table-column>
              <el-table-column
                label="状态"
                fit="true">
                <template slot-scope="scope">
                  <span>{{scope.row.workStatus ? '禁用' : '启用'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                fit="true">
                <template slot-scope="scope">
                  <el-button @click="handleDetailClick(scope.row)" type="text" size="small">详情</el-button>
                  <el-button v-show="!scope.row.workStatus" @click="handleStopClick(scope.row)" type="text" size="small">禁用</el-button>
                  <el-button v-show="scope.row.workStatus" @click="handleStartClick(scope.row)" type="text" size="small">启用</el-button>
                  <el-button @click="handleRemoveClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import init from './js/init'
import handleEvent from './js/handleEvent'

import { mapMutations } from 'vuex'

export default {
  created() {
    this.init()
  },
  data() {
    return {
      isUpload: false,
      belongs: [], // 商家归属
      total: 0, // 总条数
      currentQuery: null, // 当前搜索条件
      // 搜索表单信息
      searchForm: {
        cityId: '',
        belong: '',
        serviceId: '',
        keyWord: ''
      },
      // 表格展示列表信息
      tableData: [],
      currentPage: 1
    }
  },
  methods: {
    ...init,
    ...handleEvent,
    ...mapMutations({
      setMerchant: 'SET_MERCHANT_ID',
      clearMerchant: 'CLEAR_MERCHANT_ID'
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import './style/style.scss';
</style>
