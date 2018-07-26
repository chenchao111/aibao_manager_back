<template>
  <div class="aibao-order">
    <el-card class="box-card">
      <div slot="header">
        <el-form label-width="100px" :inline="true" :model="searchForm" class="search-form-list">
          <el-form-item label="选择地区" class="search-form-item">
            <el-select v-model="searchForm.saleCityId" placeholder="全部" clearable size="mini">
              <el-option label="全国" value=""></el-option>
              <el-option label="北京" value="110100"></el-option>
              <el-option label="嘉兴" value="330400"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" class="search-form-item">
            <el-input v-model="searchForm.goodsName" placeholder="商品名称" clearable size="mini"></el-input>
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
            <p class="left">商品查询结果：{{total}}条</p>
            <div class="right line-show">
              <el-button type="success" @click="addFoods" size="mini">添加商品</el-button>
            </div>
          </div>
          <div>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="goodsNo"
                label="商品编号"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="saleCityName"
                label="地区"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="goodsName"
                label="商品简称"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="style"
                label="商品颜色"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="standard"
                label="商品规格"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="goodsCount"
                label="库存数量"
                fit="true">
              </el-table-column>
              <el-table-column
                prop="saleStatusDesc"
                label="商品状态"
                fit="true">
              </el-table-column>
              <el-table-column
                label="操作"
                fit="true">
                <template slot-scope="scope">
                  <el-button @click="handleDetailClick(scope.row)" type="text" size="small">详情</el-button>
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

export default {
  created() {
    this.init()
  },
  data() {
    return {
      total: 0,
      // 搜索表单信息
      searchForm: {
        saleCityId: '',
        goodsName: ''
      },
      // 表格展示列表信息
      tableData: [],
      currentPage: 1
    }
  },
  methods: {
    ...init,
    ...handleEvent
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import './style/style.scss';
</style>
