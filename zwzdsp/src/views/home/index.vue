<template>
  <div class="app-container">
    <el-container>
      <el-header height="120px">
        <div>
          <h1>政务数据直达系统</h1>
        </div>
      </el-header>
      <el-form
        style="padding: 20px 0 0 0"
        :model="queryParams"
        ref="queryForm"
        size="small"
        :inline="true"
        v-show="showSearch"
        label-width="100px"
      >
        <el-row :gutter="10" type="flex" justify="space-between">
          <el-col :span="6">
            <el-form-item label="申报事件ID" prop="id">
              <el-input
                v-model="queryParams.id"
                placeholder="请输入申报事件ID"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申报业务类型" prop="applytypedesc">
              <el-input
                v-model="queryParams.applytypedesc"
                placeholder="请输入申报业务类型"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户名称" prop="khmc">
              <el-input
                v-model="queryParams.khmc"
                placeholder="请输入客户名称"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件类型" prop="zjlx">
              <el-input
                v-model="queryParams.zjlx"
                placeholder="请输入证件类型"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" type="flex" justify="space-between">
          <el-col :span="6">
            <el-form-item label="证件号码" prop="zjhm">
              <el-input
                v-model="queryParams.zjhm"
                placeholder="请输入证件号码"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请日期" prop="sqrq">
              <el-date-picker
                clearable
                v-model="queryParams.sqrq"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择申请日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经办人" prop="jbr">
              <el-input
                v-model="queryParams.jbr"
                placeholder="请输入经办人"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务序号" prop="busiid">
              <el-input
                v-model="queryParams.busiid"
                placeholder="请输入业务序号"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="display: flex; justify-content: flex-end; margin-bottom: 10px">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
        <el-button type="success" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="warning" icon="el-icon-refresh" size="mini" @click="getList">刷新</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="sqList"
        :header-cell-style="{ background: '#F6F8FC', color: '#606266' }"
        border
        stripe
        :height="tableHeight"
      >
        <el-table-column label="中心编号" align="center" prop="zxbh" />
        <el-table-column width="120" label="申报事件ID" align="center" prop="id" />
        <el-table-column width="120" label="申报业务类型" align="center" prop="applytype" />
        <el-table-column width="120" label="申报业务类型" align="center" prop="applytypedesc" />
        <el-table-column label="客户名称" align="center" prop="khmc" />
        <el-table-column label="证件类型" align="center" prop="zjlx" />
        <el-table-column width="120" label="证件类型说明" align="center" prop="zjlxdesc" />
        <el-table-column label="证件号码" align="center" prop="zjhm" />
        <el-table-column label="办件状态" align="center" prop="status" />
        <el-table-column width="120" label="办件状态说明" align="center" prop="statusdesc" />
        <el-table-column label="申请日期" align="center" prop="sqrq" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.sqrq, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="cjsj" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.cjsj, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="反馈日期" align="center" prop="fkrq" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.fkrq, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="反馈时间" align="center" prop="fksj" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.fksj, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="外呼日期" align="center" prop="whrq" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.whrq, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="外呼时间" align="center" prop="whsj" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.whsj, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="经办人" align="center" prop="jbr" />
        <el-table-column width="120" label="经办人姓名" align="center" prop="jbrxm" />
        <el-table-column width="120" label="经办人证件号码" align="center" prop="jbrzjhm" />
        <el-table-column label="业务序号" align="center" prop="busiid" />
        <el-table-column width="120" label="外呼失败次数" align="center" prop="whsbcs" />
        <el-table-column width="150" label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row)">浏览</el-button>
            <el-button size="mini" type="info" icon="el-icon-delete" @click="handleDelete(scope.row)">反馈</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--   v-show="total > 0" -->
      <pagination
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-container>
  </div>
</template>

<script>
import { listSq, getSq } from '@/api/sq'

export default {
  name: 'Sq',
  data() {
    return {
      // 遮罩层
      loading: false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 政务数据直达系统办件申请信息表格数据
      sqList: [
        {
          zxbh: 'ZX123456789',
          id: 'ID987654321',
          applytype: 'type1',
          applytypedesc: '类型描述1',
          khmc: '客户名称',
          zjlx: '护照',
          zjlxdesc: '护照描述',
          zjhm: 'A12345678',
          status: '待处理',
          statusdesc: '待处理描述',
          sqrq: '2024-08-09',
          cjsj: '2024-08-08 12:34:56',
          fkrq: '2024-08-10',
          fksj: '2024-08-10 15:00:00',
          whrq: '2024-08-09',
          whsj: '2024-08-09 09:30:00',
          jbr: '员工001',
          jbrxm: '张三',
          jbrzjhm: 'E987654321',
          busiid: 'BUSI0012345',
          whsbcs: 2
        },
        {
          zxbh: 'ZX123456789',
          id: 'ID987654321',
          applytype: 'type1',
          applytypedesc: '类型描述1',
          khmc: '客户名称',
          zjlx: '护照',
          zjlxdesc: '护照描述',
          zjhm: 'A12345678',
          status: '待处理',
          statusdesc: '待处理描述',
          sqrq: '2024-08-09',
          cjsj: '2024-08-08 12:34:56',
          fkrq: '2024-08-10',
          fksj: '2024-08-10 15:00:00',
          whrq: '2024-08-09',
          whsj: '2024-08-09 09:30:00',
          jbr: '员工001',
          jbrxm: '张三',
          jbrzjhm: 'E987654321',
          busiid: 'BUSI0012345',
          whsbcs: 2
        }
      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        zxbh: null,
        id: null,
        applytype: null,
        applytypedesc: null,
        khmc: null,
        zjlx: null,
        zjlxdesc: null,
        zjhm: null,
        status: null,
        statusdesc: null,
        sqrq: null,
        cjsj: null,
        fkrq: null,
        fksj: null,
        whrq: null,
        whsj: null,
        jbr: null,
        jbrxm: null,
        jbrzjhm: null,
        busiid: null,
        whsbcs: null
      },
      // 表单参数
      form: {}
    }
  },
  computed: {
    tableHeight: function () {
      return this.showSearch ? window.innerHeight - 700 + 'px' : window.innerHeight - 246 + 'px'
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    /** 查询政务数据直达系统办件申请信息列表 */
    getList() {
      this.loading = true
      listSq(this.queryParams).then(response => {
        this.sqList = response.rows
        this.total = response.total
        this.loading = false
      })
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #fff;
}

::v-deep {
  .el-header {
    background-image: url('../../../static/banner.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #fefefe;
    text-shadow: 0px 1px 0px #c0c0c0, 0px 2px 0px #b0b0b0, 0px 3px 0px #a0a0a0, 0px 4px 0px #909090,
      0px 5px 10px rgba(0, 0, 0, 0.9);

    font-size: large;
  }

  // ::-webkit-scrollbar {
  //   width: 5px;
  // }

  // ::-webkit-scrollbar-thumb {
  //   background-color: #eaecf1;
  //   border-radius: 4px;
  // }
  .el-input {
    width: 220px;
  }
}
</style>
