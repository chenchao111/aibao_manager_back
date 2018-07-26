<template>
    <div class="aibao-order">
      <!-- 删除订单时的弹窗 -->
      <el-dialog
        title="删除提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>您确定要删除此订单?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog class="activeBox" title="" :visible.sync="activeBox" width="35%" :before-close="closeActiveBox">
        <el-row align="middle">
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">活动名称：</div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-input v-model="activeData.name" :disabled="isDisabled" class="elInput" size="small" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">活动类型：</div></el-col>
          <el-col :span="16">
            <el-select size="small" v-model="activeTypeVal" placeholder="请选择" :disabled="isDisabled">
              <el-option
                v-for="item in activeTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">位置：</div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-select size="small" v-model="activeData.location" placeholder="请选择" :disabled="isDisabled">
                <el-option
                  v-for="item in activeLocationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">地区：</div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-select size="small" v-model="activeData.region" placeholder="请选择" :disabled="isDisabled">
                <el-option
                  v-for="item in activeRegionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">合作方：</div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-select size="small" v-model="activeCooperationVal" placeholder="请选择" :disabled="isDisabled">
                <el-option
                  v-for="item in activeCooperationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">有效期：</div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-date-picker
                size="small"
                v-model="activeStartTime"
                type="date"
                :disabled="isDisabled"
                placeholder="选择日期">
              </el-date-picker>
              ~
              <el-date-picker
                size="small"
                v-model="activeEndTime"
                type="date"
                :disabled="isDisabled"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">策划人：</div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-select size="small" v-model="activeData.person" placeholder="请选择" :disabled="isDisabled">
                <el-option
                  v-for="item in activePlannerList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">焦点图：</div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :disabled="isDisabled"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">链接页面：</div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-row>
                <el-col :span="6"><div class="grid-content bg-purple-dark">
                  <el-select size="small" v-model="activeLinkTypeVal" placeholder="请选择" :disabled="isDisabled">
                    <el-option
                      v-for="item in activeLinkTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div></el-col>
                <el-col :span="18"><div class="grid-content bg-purple-dark">
                  <el-input class="elInput" size="small" v-model="activeLinkVal" placeholder="请输入内容" :disabled="isDisabled"></el-input>
                </div></el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-dark activeTit">备注：</div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                :disabled="isDisabled"
                v-model="note">
              </el-input>
            </div>
          </el-col>
          <el-col :span="2"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
        <el-button @click="closeActiveBox">{{btnName}}</el-button>
        </span>
      </el-dialog>
      <el-card class="box-card">
        <div slot="header">
          <el-form label-width="80px" :inline="true" :model="searchForm" class="search-form-list">
            <el-form-item label="活动名" class="search-form-item">
              <el-input v-model="searchForm.activeName" placeholder="商家编号/名称/电话等" clearable size="mini"></el-input>
            </el-form-item>
            <el-form-item label="渠道" class="search-form-item">
              <el-select v-model="searchForm.place" size="mini">
                <el-option label="全国" value="quanguo"></el-option>
                <el-option label="北京" value="beijing"></el-option>
                <el-option label="嘉兴" value="jiaxing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地区" class="search-form-item">
              <el-select v-model="searchForm.region" clearable size="mini">
                <el-option label="全国" value="quanguo"></el-option>
                <el-option label="北京" value="beijing"></el-option>
                <el-option label="嘉兴" value="jiaxing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="策划人" class="search-form-item">
              <el-input v-model="searchForm.person" placeholder="商家编号/名称/电话等" clearable size="mini"></el-input>
            </el-form-item>
            <el-form-item label="状态" class="search-form-item">
              <el-select v-model="searchForm.status" clearable size="mini">
                <el-option label="全部" value="quanbu"></el-option>
                <el-option label="保养" value="baoyang"></el-option>
                <el-option label="打蜡" value="dala"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有效期" class="search-form-item">
              <el-date-picker
                size="mini"
                v-model="searchForm.date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
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
              <p class="left">订单查询结果：1000条</p>
              <div class="right line-show">
                <el-button @click="handleDetailClick(null, false, true)" type="success" size="mini">新增活动</el-button>
              </div>
            </div>
            <div>
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="activeId"
                  label="活动ID"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="location"
                  label="位置"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="person"
                  label="策划人"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="region"
                  label="地区"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="有效期"
                  fit="true">
                </el-table-column>
                <el-table-column
                  label="操作"
                  fit="true">
                  <template slot-scope="scope">
                    <el-button @click="handleDetailClick(scope.row, true)" type="text" size="small">查看</el-button>
                    <el-button @click="handleUpdateClick(scope.row, false)" type="text" size="small">修改</el-button>
                    <el-button @click="handleRemoveClick(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block">
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="100"
                  layout="total, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
              </div>
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      btnName: '关闭',
      isDisabled: true,
      imageUrl: '',
      activeData: {
        activeId: 1,
        name: '好活动',
        type: 'banner',
        location: '车主惠APP',
        category: '贴膜',
        person: '刘德华',
        region: '全国',
        status: '待审核',
        date: '2016-05-03'
      }, // 活动详情信息
      activeBox: false,
      // 弹窗默认初始值不显示
      dialogVisible: false,
      note: '',
      activeLinkVal: '',
      activeLinkTypeVal: '',
      activeLinkTypeList: [
        {
          label: '无',
          value: '1'
        },
        {
          label: '图片',
          value: '2'
        },
        {
          label: 'H5链接',
          value: '3'
        }
      ],
      activeStartTime: '',
      activeEndTime: '',
      // 活动策划人列表
      activePlannerList: [
        {
          label: '无',
          value: '1'
        },
        {
          label: '吴晶晶',
          value: '2'
        },
        {
          label: '钟剑',
          value: '3'
        },
        {
          label: '吴尉泷',
          value: '4'
        },
        {
          label: '蒋华',
          value: '5'
        }
      ],
      activePlannerVal: '',
      // 活动合作方列表
      activeCooperationList: [
        {
          label: '无',
          value: '1'
        },
        {
          label: '58同城',
          value: '2'
        },
        {
          label: '易车',
          value: '3'
        },
        {
          label: '瓜子二手车',
          value: '4'
        }
      ],
      activeCooperationVal: '',
      // 活动地区列表
      activeRegionList: [
        {
          label: '全国',
          value: '1'
        },
        {
          label: '北京',
          value: '2'
        },
        {
          label: '上海',
          value: '3'
        },
        {
          label: '嘉兴',
          value: '4'
        },
        {
          label: '新疆',
          value: '5'
        },
        {
          label: '秦皇岛',
          value: '6'
        },
        {
          label: '吉林',
          value: '7'
        }
      ],
      activeRegionVal: '',
      // 活动位置列表
      activeLocationList: [
        {
          label: '车主惠APP',
          value: '1'
        },
        {
          label: '天天爱保',
          value: '2'
        }
      ],
      activeLocationVal: '',
      // 活动类型列表
      activeTypeList: [
        {
          label: '广告',
          value: '1'
        },
        {
          label: '抽奖',
          value: '2'
        },
        {
          label: '团购',
          value: '3'
        },
        {
          label: '秒杀',
          value: '4'
        },
        {
          label: '其他',
          value: '5'
        }
      ],
      activeTypeVal: '',
      // 搜索表单信息
      searchForm: {
        region: '全国',
        category: '全部',
        status: '全部',
        platform: '全部',
        keywords: '',
        orderTime: ''
      },
      // 表格展示列表信息
      tableData: [{
        activeId: 1,
        name: '好活动',
        type: 'banner',
        location: '车主惠APP',
        category: '贴膜',
        person: '刘德华',
        region: '全国',
        status: '待审核',
        date: '2016-05-03'
      },
      {
        activeId: 1,
        name: '好活动',
        type: 'banner',
        location: '车主惠APP',
        category: '贴膜',
        person: '刘德华',
        region: '全国',
        status: '待审核',
        date: '2016-05-03'
      },
      {
        activeId: 1,
        name: '好活动',
        type: 'banner',
        location: '车主惠APP',
        category: '贴膜',
        person: '刘德华',
        region: '全国',
        status: '待审核',
        date: '2016-05-03'
      },
      {
        activeId: 1,
        name: '好活动',
        type: 'banner',
        location: '车主惠APP',
        category: '贴膜',
        person: '刘德华',
        region: '全国',
        status: '待审核',
        date: '2016-05-03'
      }],
      currentPage: 1,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    // 搜索信息提交
    onSubmit() {
      console.log('submit!')
    },
    // 删除订单
    async handleRemoveClick(row) {
      try {
        await this.$confirm('删除此项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 获取订单详情
    handleDetailClick(row, isDisabled, isModification) {
      this.btnName = isModification ? '确定' : '关闭'
      this.btnName === '确定' && this.addOrChange()
      this.activeData = row || {}
      this.isDisabled = isDisabled
      this.activeBox = true
      // this.$router.push({ name: 'Order-detail' })
    },
    // 关闭活动详情弹窗
    closeActiveBox() {
      this.activeBox = false
    },
    // 活动的添加或修改
    addOrChange: function() {
      console.log('add or change')
    },
    // 修改活动
    handleUpdateClick(row, isDisabled) {
      this.handleDetailClick(row, isDisabled, true)
    },
    // 点击当前第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 图片上传验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.activeBox .el-date-editor.el-input, .activeBox .el-date-editor.el-input__inner {
  width: 43%;
}
.el-row {
  margin-bottom: 20px;
}
.activeTit {
  line-height: 32px;
  text-align: right;
}
.left {
  float: left;
}
.right{
  float: right;
}
.line-show{
  display: flex;
  flex-flow: row nowrap;
}
.mgR10{
  margin-right: 10px;
}
.aibao-order{
  .box-card{
    margin: 10px;
    .search-form-list{
      display: flex;
      flex-flow: row nowrap;
      .search-form-item{
        display: flex;
        flex-flow: row nowrap;
        flex: 1 1 auto;
        margin-bottom: 0;
      }
    }
  }
  .form-list-header{
    overflow: hidden;
    p {
      height: 30px;
      margin: 0 0;
      margin-right: 10px;
      font-weight: bold;
      line-height: 30px;
    }
  }
  .block{
    margin: 20px;
    float: right;
  }
}
.el-row{
  margin-bottom: 10px;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.avatar-uploader-icon:hover{
  border-color: #409EFF;
}
.avatar {
  width: 100px;
  display: block;
}
</style>
