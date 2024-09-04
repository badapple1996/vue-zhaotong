<template>
  <div class="app-container">
    <t-loading :loading="loading" text="加载中..." fullscreen />
    <div class="app-header">
      <!-- <img src="../../assets/images/logo.svg" width="136" /> -->
      <div>
        <section class="wrapper">
          <div class="top">政务数据直达</div>
          <div class="bottom" aria-hidden="true">政务数据直达</div>
        </section>
      </div>
    </div>

    <div class="app-body">
      <div style="margin-bottom: 16px">
        <t-form :data="queryParams" labelWidth="90px" ref="form" scrollToFirstError="smooth">
          <t-row justify="start" :gutter="16">
            <t-col :span="3">
              <t-form-item label="申报事件ID" name="eventID">
                <t-input clearable v-model="queryParams.id" placeholder="请输入申报事件ID"></t-input>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="客户名称" name="khmc">
                <t-input clearable v-model="queryParams.khmc" placeholder="请输入客户名称"></t-input>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="经办人" name="agent">
                <t-input clearable v-model="queryParams.jbr" placeholder="请输入经办人"></t-input>
              </t-form-item>
            </t-col>
          </t-row>
          <t-row justify="start" style="margin-top: 16px" :gutter="16">
            <t-col :span="3">
              <t-form-item label="业务序号" name="serialNo">
                <t-input clearable v-model="queryParams.busiid" placeholder="请输入业务序号"></t-input>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="证件号码" name="idNumber">
                <t-input clearable v-model="queryParams.zjhm" placeholder="请输入证件号码"></t-input>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="申请日期" name="date">
                <t-date-range-picker clearable v-model="dataRange" :presets="presets" />
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item
                ><t-space>
                  <t-button :icon="searchIcon" theme="primary" @click="handleSearch">搜索</t-button>
                  <t-button theme="primary" variant="outline" :icon="clearIcon" @click="handleReset">重置</t-button>
                  <t-button theme="warning" variant="outline" :icon="refreshIcon" @click="handleFlush"> 刷新</t-button>
                </t-space>
              </t-form-item>
            </t-col>
          </t-row>
        </t-form>
      </div>
      <div>
        <t-table
          :displayColumns.sync="displayColumns"
          :column-controller="columnControllerConfig"
          class="table-header-class"
          rowKey="index"
          :data="dataList"
          :columns="columns"
          bordered
          hover
          size="small"
          table-layout="fixed"
          cellEmptyContent="-"
          lazyLoad
          :filter-value="filterValue"
          @filter-change="onFilterChange"
          @change="onChange"
        >
          <!-- <template #idIndex="{ row }">
            <p class="idIndex"> -->
          <!-- 计算并显示序号 -->
          <!-- {{ (queryParams.pageNum - 1) * queryParams.pageSize + row.index + 1 + globalIndexOffset }}
            </p>
          </template> -->
          <template #applytype="{ row }">
            <t-tag v-if="row.applytype === APPLY_TYPE.JOB.value" theme="success" variant="light">{{
              APPLY_TYPE.JOB.label
            }}</t-tag>
            <t-tag v-if="row.applytype === APPLY_TYPE.RETIRE.value" theme="warning" variant="light">{{
              APPLY_TYPE.RETIRE.label
            }}</t-tag>
            <t-tag v-if="row.applytype === APPLY_TYPE.BANKRUPTCY.value" theme="danger" variant="light">{{
              APPLY_TYPE.BANKRUPTCY.label
            }}</t-tag>
          </template>
          <template #status="{ row }">
            <t-tag v-if="row.status === PROCESS_STATUS[0].value" theme="primary" variant="light">{{
              PROCESS_STATUS[0].label
            }}</t-tag>
            <t-tag v-if="row.status === PROCESS_STATUS[1].value" theme="warning" variant="light">{{
              PROCESS_STATUS[1].label
            }}</t-tag>
            <t-tag v-if="row.status === PROCESS_STATUS[2].value" theme="success" variant="light">{{
              PROCESS_STATUS[2].label
            }}</t-tag>
            <t-tag v-if="row.status === PROCESS_STATUS[3].value" theme="danger" variant="light">{{
              PROCESS_STATUS[3].label
            }}</t-tag>
            <t-tag v-if="row.status === PROCESS_STATUS[4].value" theme="danger" variant="light">{{
              PROCESS_STATUS[4].label
            }}</t-tag>
            <t-tag v-if="row.status === PROCESS_STATUS[5].value" theme="danger" variant="light">{{
              PROCESS_STATUS[5].label
            }}</t-tag>
          </template>
          <!-- 证件类型 -->
          <template #zjlx="{ row }">
            <t-tag theme="primary" variant="light">{{
              row.zjlx ? DOCUMENT_TYPE.filter(item => item.value === row.zjlx)[0].label : '-'
            }}</t-tag>
          </template>
          <template #op="{ row }">
            <t-space>
              <!-- v-if="row.status === PROCESS_STATUS.RECEIVE_SUCCESS.value" -->
              <t-button
                v-if="row.status === PROCESS_STATUS[0].value"
                size="small"
                theme="warning"
                @click="handleFeedback(row)"
                variant="outline"
              >
                <discount-icon slot="icon" />反馈</t-button
              >
              <!-- v-else -->
              <t-button v-else size="small" theme="primary" @click="handleBrowse(row)" variant="outline">
                <adjustment-icon slot="icon" />浏览</t-button
              >
              <t-button
                v-if="row.whsbcs == 10 || row.whsbcs > 10"
                size="small"
                theme="warning"
                @click="whReset(row)"
                variant="outline"
              >
                <load-icon slot="icon" />外呼次数重置</t-button
              >
            </t-space>
          </template>
          <template #caseType>
            <t-tag theme="warning" variant="light">承诺件</t-tag>
          </template>
        </t-table>
        <t-pagination
          @change="handlePageChange"
          style="margin-top: 16px"
          v-model="queryParams.pageNum"
          :total="total"
          :page-size.sync="queryParams.pageSize"
        />
      </div>
    </div>
    <!-- 个人就业创业浏览 -->
    <job-browse ref="JobBrowse" @refresh="handleFlush"></job-browse>
    <!-- 个人就业创业反馈 -->
    <job-feedback ref="JobFeedback" @refresh="handleFlush"></job-feedback>
    <!-- 退休浏览 -->
    <retire-browse ref="RetireBrowse" @refresh="handleFlush"></retire-browse>
    <!-- 退休反馈 -->
    <retire-feedback ref="RetireFeedback" @refresh="handleFlush"></retire-feedback>
    <!-- 破产浏览 -->
    <bankruptcy-browse ref="BankruptcyBrowse" @refresh="handleFlush"></bankruptcy-browse>
    <!-- 破产反馈 -->
    <bankruptcy-feedback ref="BankruptcyFeedback" @refresh="handleFlush"></bankruptcy-feedback>
  </div>
</template>

<script>
import { SearchIcon, FilterClearIcon, RefreshIcon } from 'tdesign-icons-vue'
import { APPLY_TYPE, PROCESS_STATUS, DOCUMENT_TYPE } from '../../utils/constants.js'
import { AdjustmentIcon, DiscountIcon, LoadIcon } from 'tdesign-icons-vue'
LoadIcon
import { listQuery, resetWh } from '../../api/commonApi'
import JobBrowse from './job-browse.vue'
import JobFeedback from './job-feedback.vue'
import RetireBrowse from './retire-browse.vue'
import RetireFeedback from './retire-feedback.vue'
import BankruptcyBrowse from './bankruptcy-browse.vue'
import BankruptcyFeedback from './bankruptcy-feedback.vue'

export default {
  name: 'Home',
  components: {
    JobBrowse,
    JobFeedback,
    RetireBrowse,
    RetireFeedback,
    BankruptcyBrowse,
    BankruptcyFeedback,
    AdjustmentIcon,
    DiscountIcon,
    LoadIcon
  },

  data() {
    return {
      // globalIndexOffset: 0,
      // 根据ID查询详情
      // whReset:true,//外呼次数重置
      resData: {},
      loading: false,
      APPLY_TYPE,
      PROCESS_STATUS,
      DOCUMENT_TYPE,
      // 筛选
      filterValue: {
        zjlx: [],
        status: []
      },
      // 总条数
      total: 0,
      // 查询
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        // 申报事件ID
        id: null,
        // 客户名称
        khmc: null,
        // 经办人
        jbr: null,
        // 业务序号
        busiid: null,
        // 开始时间
        startDate: null,
        // 结束时间
        endDate: null,
        // 证件号码
        zjhm: null,
        // 申报业务类型
        applytype: null,
        // 证件类型
        zjlx: [],
        // 办件状态
        status: []
      },
      // 列表数据
      dataList: [],
      displayColumns: [
        'idIndex',
        'id',
        'applytype',
        'khmc',
        'zjlx',
        'zjhm',
        'status',
        'sqrq',
        'caseType',
        'promiseDay',
        'fkrq',
        'fksj',
        'jbr',
        'busiid',
        'op',
        'whsj',
        'whsbcs',
        'whxybw'
      ],
      // 行
      columns: [
        { colKey: 'idIndex', title: '序号', align: 'center', width: '60' },
        { colKey: 'id', title: '申报事件ID', align: 'center', width: '100', ellipsis: true },
        {
          title: () => '申报业务类型',
          colKey: 'applytype',
          align: 'center',
          width: '150',
          // 单选过滤配置
          filter: {
            type: 'single',
            list: [
              { label: APPLY_TYPE.JOB.label, value: APPLY_TYPE.JOB.value },
              { label: APPLY_TYPE.RETIRE.label, value: APPLY_TYPE.RETIRE.value },
              { label: APPLY_TYPE.BANKRUPTCY.label, value: APPLY_TYPE.BANKRUPTCY.value }
            ],
            confirmEvents: ['onChange'],
            popupProps: {
              overlayInnerClassName: 't-table__list-filter-input--sticky'
            }
          }
        },
        { colKey: 'khmc', title: '客户名称', align: 'center', width: '150' },
        {
          title: () => '证件类型',
          width: '150',
          colKey: 'zjlx',
          align: 'center',
          // 单选过滤配置
          filter: {
            type: 'multiple',
            resetValue: [],
            list: DOCUMENT_TYPE,
            showConfirmAndReset: true
          }
        },
        { colKey: 'zjhm', title: '证件号码', align: 'center', width: '180' },
        {
          title: () => '办件状态',
          width: '150',
          colKey: 'status',
          align: 'center',
          filter: {
            type: 'multiple',
            resetValue: [],
            list: PROCESS_STATUS,
            showConfirmAndReset: true
          }
        },
        { colKey: 'sqrq', title: '申请日期', align: 'center', width: '150' },
        { colKey: 'caseType', title: '办件类型', align: 'center', width: '150' },
        { colKey: 'promiseDay', title: '承诺办件工作日', align: 'center', width: '120' },
        { colKey: 'fkrq', title: '反馈日期', align: 'center', width: '150', ellipsis: true },
        { colKey: 'fksj', title: '反馈时间', align: 'center', width: '150', ellipsis: true },
        { colKey: 'jbr', title: '经办人', align: 'center', width: '150' },
        { colKey: 'busiid', title: '业务序号', align: 'center', width: '150' },
        { colKey: 'whsj', title: '外呼时间', align: 'center', width: '150', ellipsis: true },
        { colKey: 'whsbcs', title: '外呼次数', align: 'center', width: '150' },
        { colKey: 'whxybw', title: '外呼响应信息', align: 'center', width: '150', ellipsis: true },

        {
          width: '200',
          align: 'center',
          fixed: 'right',
          colKey: 'op',
          title: '操作'
        }
      ],
      // 时间段
      dataRange: [this.formatDate(), this.formatDate1()]
      // dataRange: []
    }
  },

  computed: {
    // 计算开始时间
    // defaultStartTime() {
    //   const now = new Date()
    //   now.setMonth(now.getMonth() - 1) // 设置为一个月前
    //   console.log(now, 'now-----')

    //   return this.formatDate(now)
    // },
    // 计算结束时间（当前日期）
    // defaultEndTime() {
    //   const now = new Date()
    //   console.log(now, 'now=====')
    //   return this.formatDate(now)
    // },
    presets() {
      return {
        最近7天: [new Date(+new Date() - 86400000 * 6), new Date()],
        最近3天: [new Date(+new Date() - 86400000 * 2), new Date()],
        今天: [new Date(), new Date()]
      }
    },
    columnControllerConfig() {
      return {
        placement: 'top-right',
        fields: [
          'idIndex',
          'id',
          'khmc',
          'zjhm',
          'sqrq',
          'caseType',
          'promiseDay',
          'fkrq',
          'fksj',
          'jbr',
          'busiid',
          'op',
          'whsj',
          'whsbcs',
          'whxybw'
        ],
        // 弹框组件属性透传
        dialogProps: { preventScrollThrough: true },
        // 列配置按钮属性头像
        buttonProps: { content: '显示列控制', theme: 'default', variant: 'outline' },
        // 数据字段分组显示
        groupColumns: undefined
      }
    }
  },

  created() {},
  mounted() {
    this.handleGetList()
  },
  methods: {
    // 外呼次数重置
    whReset(row) {
      let params = {
        zxbh: row.zxbh,
        id: row.id
      }
      resetWh(params)
        .then(res => {
          if (res.code === 200) {
            // setTimeout(() => {
            this.$message.success('外呼次数重置成功')
            // this.btnLoading = false
            // this.openFeedback = false
            // this.handleFlush()
            this.handleGetList()
            // }, 2000)
          } else {
            this.$message.error(res)
          }
        })
        .catch(error => {
          this.btnLoading = false
          // 检查响应状态码
          if (error.message) {
            // 显示错误信息的逻辑
            this.$message.error(error.message)
          } else {
            // showErrorMessage('An error occurred')
          }
        })
      // if () {

      // } else {

      // }
    },
    // 格式化日期
    formatDate() {
      const date = new Date()
      date.setMonth(date.getMonth() - 1) // 设置为一个月前
      const year = date.getFullYear().toString().padStart(4, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      console.log(year, month, day, 'date111111==================')
      return `${year}-${month}-${day}`
    },
    formatDate1() {
      const date = new Date()
      const year = date.getFullYear().toString().padStart(4, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      console.log(year, month, day, 'date2222==================')
      return `${year}-${month}-${day}`
    },
    // 分页查询
    handlePageChange(page) {
      this.queryParams.pageSize = page.pageSize
      this.queryParams.pageNum = page.current
      this.handleGetList()
    },
    // 搜索
    handleSearch() {
      this.handleGetList()
    },
    // 刷新
    handleFlush() {
      this.handleReset()
      this.handleGetList()
    },
    // 重置
    handleReset() {
      this.filterValue = {
        zjlx: [],
        status: []
      }
      this.dataRange = [this.formatDate(), this.formatDate1()]
      this.queryParams = {
        id: null,
        khmc: null,
        jbr: null,
        busiid: null,
        zjhm: null,
        startDate: null,
        endDate: null,
        applytype: null,
        zjlx: [],
        status: [],
        pageNum: 1,
        pageSize: 10
      }
      this.handleGetList()
    },
    // 获取列表
    handleGetList() {
      this.loading = true
      this.queryParams.startDate = this.dataRange[0] ? this.dataRange[0] : null
      this.queryParams.endDate = this.dataRange[1] ? this.dataRange[1] : null
      listQuery(this.queryParams)
        .then(res => {
          this.loading = false
          if (res.code === 200) {
            console.log(res)
            this.dataList = res.rows
            for (let index = 0; index < res.rows.length; index++) {
              const index1 = (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1
              this.dataList[index].idIndex = index1
              // if (
              //   this.dataList[index].applytypedesc === '个人就业创业' ||
              //   this.dataList[index].applytypedesc === '退休一件事'
              // ) {
              //   this.dataList[index].promiseDay = '3个工作日'
              // } else {
              //   this.dataList[index].promiseDay = '11个工作日'
              // }
            }
            this.total = res.total
          } else {
            this.$message.error(res)
          }
        })
        .catch(error => {
          this.btnLoading = false
          // 检查响应状态码
          if (error.message) {
            // 显示错误信息的逻辑
            this.$message.error(error.message)
          } else {
            // showErrorMessage('An error occurred')
          }
        })
    },
    // 浏览
    handleBrowse(row) {
      // 判断是创业就业/退休/破产
      if (row.applytype === APPLY_TYPE.JOB.value) {
        this.$refs.JobBrowse.showBrowseDialog(row)
      } else if (row.applytype === APPLY_TYPE.RETIRE.value) {
        this.$refs.RetireBrowse.showBrowseDialog(row)
      } else if (row.applytype === APPLY_TYPE.BANKRUPTCY.value) {
        this.$refs.BankruptcyBrowse.showBrowseDialog(row)
      }
    },
    // 反馈
    handleFeedback(row) {
      // 判断是创业就业/退休/破产
      if (row.applytype === APPLY_TYPE.JOB.value) {
        this.$refs.JobFeedback.showFeedbackDialog(row)
      } else if (row.applytype === APPLY_TYPE.RETIRE.value) {
        this.$refs.RetireFeedback.showFeedbackDialog(row)
      } else if (row.applytype === APPLY_TYPE.BANKRUPTCY.value) {
        this.$refs.BankruptcyFeedback.showFeedbackDialog(row)
      }
    },
    // filters 参数包含自定义过滤组件 日期选择器 的值
    onFilterChange(filters, ctx) {
      console.log('filter-change', filters, ctx)
      // 保证日期是一个数组
      this.filterValue = filters
      console.log('filterValue', this.filterValue)
      // 模拟异步请求进行数据过滤
      this.request(this.filterValue)
    },
    // 筛选、分页、排序等功能发生变化时，均会触发 change 事件
    onChange(info, context) {
      console.log('change', info, context, '筛选、分页、排序等功能发生变化均会触发')
    },
    request(filters) {
      this.loading = true
      // 筛选数据
      this.queryParams.status = filters.status ? filters.status : []
      this.queryParams.zjlx = filters.zjlx ? filters.zjlx : []
      this.queryParams.applytype = filters.applytype ? filters.applytype : null
      this.queryParams.pageNum = 1
      this.queryParams.pageSize = 10
      console.log('queryParams++++筛选数据', this.queryParams.pageNum)
      listQuery(this.queryParams)
        .then(res => {
          this.loading = false
          if (res.code === 200) {
            this.dataList = res.rows
            console.log(this.dataList, 'this.dataList=====')

            this.total = res.total
          } else {
            this.$message.error(res)
          }
        })
        .catch(error => {
          this.btnLoading = false
          // 检查响应状态码
          if (error.message) {
            // 显示错误信息的逻辑
            this.$message.error(error.message)
          } else {
            // showErrorMessage('An error occurred')
          }
        })
    },
    searchIcon() {
      return <SearchIcon />
    },
    clearIcon() {
      return <FilterClearIcon />
    },
    refreshIcon() {
      return <RefreshIcon />
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #ffffff;
}
.app-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-image: url('../../assets//images/bg.png');
  background-repeat: no-repeat;
  background-size: inherit;
}
.app-body {
  display: flex;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  flex-direction: column;
}

::v-deep {
  .t-table__header {
    tr {
      background: #eceff7 !important;
      font-weight: bold !important;
    }
  }
  .t-table__column-controller-trigger {
    padding-bottom: 10px;
    cursor: ew-resize;
  }
}
.wrapper {
  display: grid;
  place-content: center;
  background-color: var(--background-color);
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1rem, 1rem + 18vw, 1.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: hsl(0, 0%, 100%);
}

.wrapper > div {
  grid-area: 1/1/-1/-1;
}
.top {
  clip-path: polygon(0% 0%, 100% 0%, 100% 48%, 0% 58%);
}
// .bottom {
//   clip-path: polygon(0% 60%, 100% 50%, 100% 100%, 0% 100%);
//   color: transparent;
//   background: -webkit-linear-gradient(177deg, black 53%, hsl(0, 0%, 100%) 65%);
//   background: linear-gradient(177deg, black 53%, hsl(0, 0%, 100%) 65%);
//   background-clip: text;
//   -webkit-background-clip: text;
//   transform: translateX(-0.02em);
// }
::v-deep .t-table__content::-webkit-scrollbar {
  width: 6px;
  height: 12px !important;
}
// .t-table .t-table-scroll-container {
//   /* 注意：这里的.t-table-scroll-container是一个假设的类名，
//      你需要根据实际情况替换为正确的类名或选择器 */
//   overflow-x: auto; /* 确保横向滚动是启用的 */
//   cursor: ew-resize; /* 尝试为整个滚动容器设置光标样式，但可能不起作用 */
// }
// /* （可选）设置鼠标悬停在滑块上的样式 */
// ::-webkit-scrollbar-thumb:hover {
//   background-color: #888; /* 滑块颜色变化 */
//   cursor: ew-resize; /* 尝试为整个滚动容器设置光标样式，但可能不起作用 */
// }
// ::v-deep .t-table__column-controller-trigger {
//     padding-bottom: 10px;
//     cursor: pointer;
// }
</style>
