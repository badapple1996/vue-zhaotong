<template>
  <t-dialog
    :visible.sync="openBrowse"
    attach="body"
    header="个人就业创业一件事浏览"
    destroyOnClose
    :footer="false"
    width="85%"
    top="5%"
    theme="success"
  >
    <div slot="body">
      <!-- 基本信息 -->
      <t-card title="基本信息" class="info-block" :bordered="false">
        <t-descriptions :column="3" bordered colon size="small">
          <t-descriptions-item label="申报对象证件号码">
            <t-input v-model="baseInfoData.idCardNumber" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="申报对象名称">
            <t-input v-model="baseInfoData.applicantName" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="联系电话">
            <t-input v-model="baseInfoData.mobile" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="姓名">
            <t-input v-model="baseInfoData.name" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="证件类型">
            <t-tag-input
              :value="[baseInfoData.idCardType]"
              borderless
              readonly
              :tag-props="{ theme: 'primary', variant: 'light' }"
            />
          </t-descriptions-item>
          <t-descriptions-item label="证件号码">
            <t-input v-model="baseInfoData.idCardNumber" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="性别">
            <t-tag-input
              :value="[baseInfoData.gender]"
              borderless
              readonly
              :tag-props="{ theme: 'primary', variant: 'light' }"
            />
          </t-descriptions-item>
          <t-descriptions-item label="民族">
            <t-tag-input
              :value="[baseInfoData.nation]"
              borderless
              readonly
              :tag-props="{ theme: 'primary', variant: 'light' }"
            />
          </t-descriptions-item>
          <t-descriptions-item label="出生日期">
            <t-input v-model="baseInfoData.birthday" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="婚姻状况">
            <t-tag-input
              :value="[baseInfoData.maritalStatus]"
              borderless
              readonly
              :tag-props="{ theme: 'primary', variant: 'light' }"
            />
          </t-descriptions-item>
          <t-descriptions-item label="户口性质">
            <t-input v-model="baseInfoData.householdType" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="户籍所在地">
            <t-input v-model="baseInfoData.householdAreaCode" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="户籍地址" :span="3">
            <t-input v-model="baseInfoData.householdLocation" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="居住详细住址" :span="3">
            <t-input v-model="baseInfoData.address" borderless readonly placeholder="-" />
          </t-descriptions-item>

          <t-descriptions-item label="居住所在地" :span="3">
            <t-input v-model="baseInfoData.addressAreaCode" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="业务类型">
            <t-input v-model="baseInfoData.applyType" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="职业">
            <t-input v-model="baseInfoData.profession" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="缴存银行">
            <t-input v-model="baseInfoData.bankName" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="缴存银行账户">
            <t-input v-model="baseInfoData.bankAccount" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="缴款方式">
            <t-input v-model="baseInfoData.payMethod" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="缴款日">
            <t-input v-model="baseInfoData.paymentDueDate" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="月缴存额">
            <t-input v-model="baseInfoData.monthlyAmount" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="缴存基数">
            <t-input v-model="baseInfoData.depositBase" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="缴存比例">
            <t-input
              borderless
              readonly
              v-model="baseInfoData.depositRatio"
              :format="value => `${value} %`"
              style="width: 100%"
            ></t-input>
          </t-descriptions-item>
          <t-descriptions-item label="学历">
            <t-input v-model="baseInfoData.education" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="邮政编码">
            <t-input v-model="baseInfoData.postalCode" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="家庭月收入">
            <t-input v-model="baseInfoData.monthlyIncome" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="固定电话号码">
            <t-input v-model="baseInfoData.telephone" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="经办机构所在地">
            <t-input v-model="baseInfoData.areaCode" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="创建时间">
            <t-input v-model="baseInfoData.createtime" borderless readonly placeholder="-" />
          </t-descriptions-item>
        </t-descriptions>
      </t-card>
      <!-- 反馈信息 -->
      <t-card title="反馈信息" class="container-base-margin-top" :bordered="false">
        <t-descriptions v-if="feedbackInfo.cljg === '3'" :column="3" bordered colon size="small">
          <t-descriptions-item label="处理结果">
            <t-space>
              <t-tag theme="success" size="small">成功</t-tag>
            </t-space>
          </t-descriptions-item>
          <t-descriptions-item label="业务序号">
            <t-input v-model="feedbackInfo.busiid" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="单位账号">
            <t-input v-model="feedbackInfo.unitaccnum" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="办理日期">
            <t-input v-model="feedbackInfo.TranDate" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="个人账号">
            <t-input v-model="feedbackInfo.accnum" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="手机号码">
            <t-input v-model="feedbackInfo.relphone" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="扣款账户名称">
            <t-input v-model="feedbackInfo.accname" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="每月约定扣款日">
            <t-input v-model="feedbackInfo.paymentDueDate" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="月缴存额">
            <t-input v-model="feedbackInfo.monthlyAmount" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="所属银行">
            <t-tag theme="primary" variant="light">{{
              DEPOSIT_INTO_BANK.find(item => item.value === feedbackInfo.bankName).label
            }}</t-tag>
          </t-descriptions-item>
          <t-descriptions-item label="账户名称">
            <t-input v-model="feedbackInfo.accnumname" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="银行账号">
            <t-input v-model="feedbackInfo.bankAccount" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="经办人账号">
            <t-input v-model="feedbackInfo.agentAccount" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="经办人姓名">
            <t-input v-model="feedbackInfo.agentName" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="经办人证件号码">
            <t-input v-model="feedbackInfo.agentIdNumber" borderless readonly placeholder="-" />
          </t-descriptions-item>
        </t-descriptions>
        <t-descriptions v-else-if="feedbackInfo.cljg == '4'" bordered colon size="small">
          <t-descriptions-item label="处理结果">
            <t-space>
              <t-tag theme="danger" size="small">失败</t-tag>
            </t-space>
          </t-descriptions-item>
          <t-descriptions-item label="失败原因" :span="3">
            <t-input v-model="feedbackInfo.sjyy" borderless readonly placeholder="-" />
          </t-descriptions-item>
        </t-descriptions>
        <div v-else style="text-align: center">
          <span>暂无反馈信息!</span>
        </div>
      </t-card>
      <!-- 附件列表信息 -->
      <t-card title="附件列表信息" class="container-base-margin-top" :bordered="false">
        <t-table
          rowKey="index"
          :data="fileList"
          :columns="columns"
          bordered
          size="small"
          showHeader
          cellEmptyContent="-"
          resizable
          thClassName="th-title"
        >
          <template #wjlx="{ row }">
            <t-tag :theme="row.wjlx === '1' ? 'primary' : 'success'" size="small">{{
              row.wjlx === '1' ? '反馈文件' : '请求文件'
            }}</t-tag>
          </template>

          <template #download="{ row }">
            <t-space>
              <t-button variant="outline" size="small" theme="primary" @click="handleDownload(row)">
                下载 <cloud-download-icon slot="icon"
              /></t-button>
            </t-space>
          </template>
        </t-table>
      </t-card>
    </div>
  </t-dialog>
</template>

<script>
import { getInfoById } from '../../api/commonApi'
import {
  GENDER,
  DOCUMENT_TYPE,
  NATION,
  MARITAL_STATUS,
  NTR_F_HSHLD_RGSTRTN,
  DEPOSIT_INTO_BANK,
  EDUCATION,
  PAYMENT_METHOD,
  PERSONNEL_TYPE,
  PERSONNEL_CATEGORY,
  AREA_CODE
} from '../../utils/constants.js'
import { CloudDownloadIcon } from 'tdesign-icons-vue'

export default {
  components: { CloudDownloadIcon },
  data() {
    return {
      GENDER,
      DOCUMENT_TYPE,
      NATION,
      MARITAL_STATUS,
      NTR_F_HSHLD_RGSTRTN,
      DEPOSIT_INTO_BANK,
      EDUCATION,
      PAYMENT_METHOD,
      PERSONNEL_TYPE,
      PERSONNEL_CATEGORY,
      AREA_CODE,
      openBrowse: false,
      // 申报信息
      baseInfoData: {},
      // 反馈信息
      feedbackInfo: {
        cljg: null, // 处理结果
        sjyy: null, // 失败原因
        busiid: null, // 业务序号
        unitaccnum: null, // 单位账号
        TranDate: null, // 办理日期
        accnum: null, // 个人账号
        relphone: null, // 手机号码
        accname: null, // 扣款账户名称
        paymentDueDate: null, // 每月约定扣款日
        monthlyAmount: null, // 月缴存额
        bankName: null, // 所属银行
        accnumname: null, // 账户名称
        bankAccount: null, // 银行账号
        jbr: null, // 经办人账号
        jbrxm: null, // 经办人姓名
        jbrzjhm: null // 经办人证件号码
      },
      // 附件列表
      fileList: [],
      columns: [
        { colKey: 'serial-number', title: '序号', width: '30', align: 'center' },
        { colKey: 'wjlx', title: '文件类型', width: '100', align: 'center' },
        { colKey: 'wjmc', title: '文件名称', width: '200', align: 'center' },
        { colKey: 'cjsj', title: '创建时间', width: '150', align: 'center' },
        { colKey: 'download', title: '下载', width: '50', align: 'center' }
      ]
    }
  },
  mounted() {},
  methods: {
    // 显示弹窗
    showBrowseDialog(row) {
      this.openBrowse = true
      // 清空数据
      this.baseInfoData = {}
      this.feedbackInfo = {
        cljg: null, // 处理结果
        sjyy: null, // 失败原因
        busiid: null, // 业务序号
        unitaccnum: null, // 单位账号
        TranDate: null, // 办理日期
        accnum: null, // 个人账号
        relphone: null, // 手机号码
        accname: null, // 扣款账户名称
        paymentDueDate: null, // 每月约定扣款日
        monthlyAmount: null, // 月缴存额
        bankName: null, // 所属银行
        accnumname: null, // 账户名称
        bankAccount: null, // 银行账号
        jbr: null, // 经办人账号
        jbrxm: null, // 经办人姓名
        jbrzjhm: null // 经办人证件号码
      }
      this.fileList = []
      this.handleGetInfo(row)
    },
    // 加载数据
    handleGetInfo(row) {
      this.loading = true
      this.$nextTick(() => {
        getInfoById({ zxbh: row.zxbh, id: row.id }).then(res => {
          this.loading = false
          if (res.code === 200) {
            console.log(JSON.parse(JSON.stringify(res.data)))
            // 基本信息
            let dataInfo = res.data.zwbjzdxtbjData
            this.handleFormatBaseInfo(JSON.parse(dataInfo.zwqjsj))
            // 文件数据
            this.fileList = res.data.zwbjzdxtbjFileList
            // 反馈信息
            this.feedbackInfo = dataInfo.fksj ? JSON.parse(dataInfo.fksj) : this.feedbackInfo
          } else {
            this.$message.error('获取失败，请稍后重试')
          }
        })
      })
    },
    // 格式化基础数据
    handleFormatBaseInfo(originData) {
      // 处理originData中某些值
      for (let key in originData) {
        if (originData[key] === null) {
          originData[key] = '-'
        }
      }
      this.baseInfoData = originData
      // 格式化金额
      this.baseInfoData.monthlyAmount = this.formatAmount(this.baseInfoData.monthlyAmount)
      this.baseInfoData.monthlyIncome = this.formatAmount(this.baseInfoData.monthlyIncome)
      this.baseInfoData.depositBase = this.formatAmount(this.baseInfoData.depositBase)
      this.baseInfoData.birthday = this.baseInfoData.birthday.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
      //  翻译字段
      this.baseInfoData.gender = this.translateDict(GENDER, this.baseInfoData.gender)
      this.baseInfoData.idCardType = this.translateDict(DOCUMENT_TYPE, this.baseInfoData.idCardType)
      this.baseInfoData.nation = this.translateDict(NATION, this.baseInfoData.nation)
      this.baseInfoData.maritalStatus = this.translateDict(MARITAL_STATUS, this.baseInfoData.maritalStatus)
      this.baseInfoData.householdType = this.translateDict(NTR_F_HSHLD_RGSTRTN, this.baseInfoData.householdType)
      this.baseInfoData.bankName = this.translateDict(DEPOSIT_INTO_BANK, this.baseInfoData.bankName)
      this.baseInfoData.education = this.translateDict(EDUCATION, this.baseInfoData.education)
      this.baseInfoData.payMethod = this.translateDict(PAYMENT_METHOD, this.baseInfoData.payMethod)
      this.baseInfoData.householdAreaCode = this.translateDict(AREA_CODE, this.baseInfoData.householdAreaCode)
      this.baseInfoData.addressAreaCode = this.translateDict(AREA_CODE, this.baseInfoData.addressAreaCode)
      this.baseInfoData.areaCode = this.translateDict(AREA_CODE, this.baseInfoData.areaCode)
    },
    // 格式化金额
    formatAmount(amount, decimals = 2) {
      // 先将字符串转换为数字
      let numericAmount = parseFloat(amount)

      // 检查转换结果是否为NaN
      if (isNaN(numericAmount)) {
        return '￥0.00'
      }

      // 使用 toLocaleString() 方法格式化
      return numericAmount.toLocaleString('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })
    },
    // 字典翻译
    translateDict(dict, value) {
      return dict.filter(d => d.value == value)[0]?.label || value
    },
    downloadBase64File(base64Data, fileName) {
      // 将 Base64 字符串转换为二进制数据
      const binaryString = atob(base64Data)
      const len = binaryString.length
      const bytes = new Uint8Array(len)

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      // 创建 Blob 对象
      const blob = new Blob([bytes], { type: 'application/octet-stream' })
      // 生成下载链接
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      // 触发点击事件下载文件
      document.body.appendChild(link)
      link.click()
      // 移除下载链接
      document.body.removeChild(link)
    },
    // 下载附件
    handleDownload(row) {
      this.downloadBase64File(row.wjsj, row.wjmc)
    }
  }
}
</script>

<style lang="scss" scoped>
.info-block {
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 24px;
  }
}

.container-base-margin-top {
  margin-top: 16px;
}
::v-deep {
  .th-title {
    color: #191919;
    font-weight: bold;
    font-size: 14px;
  }
  .t-descriptions__content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .t-descriptions__label {
    background-color: #eceff7;
    color: #191919;
  }
  .t-descriptions__body--border .t-descriptions__label:hover {
    background-color: #b5c7ff;
  }
}
</style>
