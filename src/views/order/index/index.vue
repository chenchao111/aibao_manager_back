<template>
    <div class="aibao-order">
      <el-card class="box-card">
        <div slot="header">
          <el-form label-width="100px" :inline="true" :model="searchForm">
            <div class="search-form-list">
              <el-form-item label="选择地区" class="search-form-item">
                <el-select v-model="searchForm.cityId" size="mini" placeholder="全部" clearable >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="全国" value="0"></el-option>
                  <el-option label="北京" value="110100"></el-option>
                  <el-option label="嘉兴" value="330400"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="服务种类" class="search-form-item">
                <el-select v-model="searchForm.productTypeList" multiple size="mini" placeholder="全部" clearable>
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                  <el-option label="全部" value=""></el-option>
                  <el-option label="标准洗车" value="201"></el-option>
                  <el-option label="品牌洗车" value="202"></el-option>
                  <el-option label="快修服务" value="501"></el-option>
                  <el-option label="标准保养" value="121"></el-option>
                  <el-option label="高端保养" value="123"></el-option>
                  <el-option label="打蜡" value="126"></el-option>
                  <el-option label="贴膜" value="127"></el-option>
                  <el-option label="上线年检" value="141"></el-option>
                  <el-option label="简易年检" value="142"></el-option>
                  <el-option label="商品" value="13"></el-option>
                </el-select>
                <!-- <el-select v-model="searchForm.productTypeName" clearable size="mini">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="标准洗车" value="201"></el-option>
                  <el-option label="品牌洗车" value="202"></el-option>
                  <el-option label="快修服务" value="501"></el-option>
                  <el-option label="标准保养" value="121"></el-option>
                  <el-option label="高端保养" value="123"></el-option>
                  <el-option label="打蜡" value="126"></el-option>
                  <el-option label="贴膜" value="127"></el-option>
                  <el-option label="上线年检" value="141"></el-option>
                  <el-option label="简易年检" value="142"></el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="订单状态" class="search-form-item">
                <el-select v-model="searchForm.orderState" size="mini" placeholder="全部" clearable>
                  <el-option label="全部" value=""></el-option>
                  <el-option label="待付款" value="0"></el-option>
                  <el-option label="待出单" value="100"></el-option>
                  <el-option label="待使用" value="200"></el-option>
                  <el-option label="待评价" value="300"></el-option>
                  <el-option label="已退款" value="400"></el-option>
                  <el-option label="已取消" value="500"></el-option>
                  <el-option label="已完成" value="600"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="search-form-list">
              <!-- <el-form-item label="平台" class="search-form-item">
                <el-select v-model="searchForm.platform" clearable size="mini">
                  <el-option label="全部" value="quanbu"></el-option>
                  <el-option label="保养" value="baoyang"></el-option>
                  <el-option label="打蜡" value="dala"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="关键字" class="search-form-item">
                <el-input v-model="searchForm.keyWords" placeholder="商家编号/名称/电话等" clearable size="mini"></el-input>
              </el-form-item>
              <el-form-item label="下单时间" class="search-form-item">
                <el-date-picker
                  size="mini"
                  v-model="searchForm.orderTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item class="search-form-item">
                <el-button style="margin-left: 80px;" type="primary" @click="onSubmit" size="mini">查询</el-button>
                <el-button type="primary" @click="clearSearchForm" size="mini">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div>
          <el-card class="box-card">
            <div slot="header" class="form-list-header">
              <p class="left">订单查询结果：{{total}}条</p>
              <div class="right line-show">
                <!-- <p class="mgR10">实缴保费总计：200000</p> -->
                <!-- <p class="mgR10">佣金总计：6000</p> -->
                <el-button @click="exportToExcel" type="success" size="mini">导出</el-button>
              </div>
            </div>
            <div>
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="orderNo"
                  label="订单号"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="cityName"
                  label="地区"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="productTypeName"
                  label="服务种类"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="entName"
                  label="商家名称"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="totalAmount"
                  label="销售价（元）"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="discountAmount"
                  label="实付金额（元）"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="useBean"
                  label="抵扣积分"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="orderStateName"
                  label="订单状态"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="createdTime"
                  label="订单生成时间"
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
      // 搜索表单信息
      searchForm: {
        cityId: '',
        productTypeList: [],
        orderState: '',
        keyWords: '',
        orderTime: '',
        startTime: '',
        endTime: ''
      },
      // 表格展示列表信息
      tableData: [],
      currentPage: 1,
      total: 0
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
