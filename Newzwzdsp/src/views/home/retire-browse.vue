<template>
  <t-dialog
    :visible.sync="openBrowse"
    attach="body"
    header="个人退休一件事浏览"
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
            <t-input v-model="baseInfoData.applicantIdnumber" borderless readonly placeholder="-" />
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
            <t-input v-model="baseInfoData.idCardType" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="缴存银行卡号">
            <t-input v-model="baseInfoData.bankAccount" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="公积金缴存银行">
            <t-input v-model="baseInfoData.bankName" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="公积金缴存银行名称">
            <t-input v-model="baseInfoData.bankNameString" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="单位名称">
            <t-input v-model="baseInfoData.companyName" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="单位统一社会信用代码">
            <t-input v-model="baseInfoData.socialCreditCode" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="户籍所在地">
            <t-input v-model="baseInfoData.householdAreaCode" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="退休标识">
            <t-tag :theme="baseInfoData.isRetire == '01' ? 'success' : 'warning'">{{
              baseInfoData.isRetire == '01' ? '已退休' : '未退休'
            }}</t-tag>
          </t-descriptions-item>
          <t-descriptions-item label="主管单位名称">
            <t-input v-model="baseInfoData.parentCompanyName" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="主管单位统一社会信用代码">
            <t-input v-model="baseInfoData.parentSocialCreditCode" borderless readonly placeholder="-" />
          </t-descriptions-item>

          <t-descriptions-item label="人员类别">
            <t-input v-model="baseInfoData.personalStatus" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="人事档案保管机构名称">
            <t-input v-model="baseInfoData.personnelFileOrg" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="人事档案保管机构联系电话">
            <t-input v-model="baseInfoData.personnelFileOrgTel" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="人员类型">
            <t-input v-model="baseInfoData.personType" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="是否独生子女父母">
            <t-tag :theme="baseInfoData.isOnlyChild == '02' ? 'success' : 'warning'">{{
              baseInfoData.isOnlyChild == '02' ? '是' : '否'
            }}</t-tag>
          </t-descriptions-item>
          <t-descriptions-item label="退休时间">
            <t-input v-model="baseInfoData.retirementDate" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="创建时间">
            <t-input v-model="baseInfoData.createtime" borderless readonly placeholder="-" />
          </t-descriptions-item>
        </t-descriptions>
      </t-card>
      <!-- 反馈信息 -->
      <t-card title="反馈信息" class="container-base-margin-top" :bordered="false">
        <t-descriptions :column="3" bordered colon size="small" v-if="feedbackInfo.cljg == '3'">
          <t-descriptions-item label="处理结果">
            <t-space>
              <t-tag theme="success" size="small">成功</t-tag>
            </t-space>
          </t-descriptions-item>

          <t-descriptions-item label="业务序号">
            <t-input v-model="feedbackInfo.busiid" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <!-- <t-descriptions-item label="单位账号">
            <t-input v-model="feedbackInfo.unitaccnum" borderless readonly placeholder="-" />
          </t-descriptions-item> -->
          <t-descriptions-item label="办理日期">
            <t-input v-model="feedbackInfo.date" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="提取本金">
            <t-input v-model="feedbackInfo.withdrawalPrincipal" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="提取利息">
            <t-input v-model="feedbackInfo.withdrawalInterest" borderless readonly placeholder="-" />
          </t-descriptions-item>

          <t-descriptions-item label="经办人账号">
            <t-input v-model="feedbackInfo.jbr" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="经办人姓名">
            <t-input v-model="feedbackInfo.jbrxm" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="经办人证件号码">
            <t-input v-model="feedbackInfo.jbrzjhm" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="承诺办结工作日">
            <t-input v-model="feedbackInfo.promiseDay" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="承诺办结时间">
            <t-input v-model="feedbackInfo.promiseDate" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="咨询电话" :span="2">
            <t-input v-model="feedbackInfo.reviewOrgTel" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item v-if="disUpload" :span="3">
            <template v-slot:label>
              <span style="color: red; margin-right: 2px">*</span> <span>上传文件</span>
            </template>
            <t-upload
              :autoUpload="false"
              v-model="files"
              theme="custom"
              :max="1"
              :abridgeName="[10, 8]"
              draggable
              :sizeLimit="{ size: 2, unit: 'MB', message: '图片太大，不能超过 {sizeLimit} MB' }"
              action=""
              accept="image/*, .pdf"
            >
              <template>
                <div v-if="files && files.length" style="width: 100%; height: 100%">
                  <div>
                    <div style="margin-bottom: 10px">
                      <span>{{ shortenFilename(files[0].name, 20) }}</span>
                    </div>
                    <span>文件大小:{{ formatFileSize(files[0].size) }}</span
                    ><br />
                    <span>上传日期:{{ date }}</span>
                  </div>
                  <div style="margin-top: 10px">
                    <t-link theme="primary">重新上传</t-link>
                  </div>
                </div>
                <div v-else>
                  <t-link theme="primary">点击上传</t-link><span>&nbsp;/&nbsp;拖拽到此区域</span> <br />
                  <p>要求文件大小在 2M 以内</p>
                </div>
              </template>
            </t-upload>
          </t-descriptions-item>
        </t-descriptions>

        <t-descriptions v-else-if="feedbackInfo.cljg == '4'" :column="3" bordered colon size="small">
          <t-descriptions-item label="处理结果">
            <t-space>
              <t-tag theme="danger" size="small">失败</t-tag>
            </t-space>
          </t-descriptions-item>
          <t-descriptions-item label="业务序号">
            <t-input v-model="feedbackInfo.busiid" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <!-- <t-descriptions-item label="单位账号">
            <t-input v-model="feedbackInfo.unitaccnum" borderless readonly placeholder="-" />
          </t-descriptions-item> -->
          <t-descriptions-item label="办理日期">
            <t-input v-model="feedbackInfo.date" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="提取本金">
            <t-input v-model="feedbackInfo.withdrawalPrincipal" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="提取利息">
            <t-input v-model="feedbackInfo.withdrawalInterest" borderless readonly placeholder="-" />
          </t-descriptions-item>

          <t-descriptions-item label="经办人账号">
            <t-input v-model="feedbackInfo.jbr" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="经办人姓名">
            <t-input v-model="feedbackInfo.jbrxm" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="经办人证件号码">
            <t-input v-model="feedbackInfo.jbrzjhm" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="承诺办结工作日">
            <t-input v-model="feedbackInfo.promiseDay" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="承诺办结时间">
            <t-input v-model="feedbackInfo.promiseDate" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="咨询电话" :span="2">
            <t-input v-model="feedbackInfo.reviewOrgTel" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="失败原因" :span="3">
            <t-input v-model="feedbackInfo.sjyy" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item v-if="disUpload" :span="3">
            <template v-slot:label>
              <span style="color: red; margin-right: 2px">*</span> <span>上传文件</span>
            </template>
            <t-upload
              :autoUpload="false"
              v-model="files"
              theme="custom"
              :max="1"
              :abridgeName="[10, 8]"
              draggable
              :sizeLimit="{ size: 2, unit: 'MB', message: '图片太大，不能超过 {sizeLimit} MB' }"
              action=""
              accept="image/*, .pdf"
            >
              <template>
                <div v-if="files && files.length" style="width: 100%; height: 100%">
                  <div>
                    <div style="margin-bottom: 10px">
                      <span>{{ shortenFilename(files[0].name, 20) }}</span>
                    </div>
                    <span>文件大小:{{ formatFileSize(files[0].size) }}</span
                    ><br />
                    <span>上传日期:{{ date }}</span>
                  </div>
                  <div style="margin-top: 10px">
                    <t-link theme="primary">重新上传</t-link>
                  </div>
                </div>
                <div v-else>
                  <t-link theme="primary">点击上传</t-link><span>&nbsp;/&nbsp;拖拽到此区域</span> <br />
                  <p>要求文件大小在 2M 以内</p>
                </div>
              </template>
            </t-upload>
          </t-descriptions-item>
        </t-descriptions>
        <div v-show="disUpload1" style="width: 100%; margin-top: 20px; display: flex; justify-content: center">
          <t-space>
            <t-button :loading="btnLoading" @click="handleSubmit"><GestureUpIcon slot="icon" />文件补传</t-button>
          </t-space>
        </div>
        <!-- <div v-else style="text-align: center">
          <span>暂无反馈信息!</span>
        </div> -->
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
import { getInfoById, fileBc } from '../../api/commonApi'
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
import { CloudDownloadIcon, GestureUpIcon } from 'tdesign-icons-vue'

export default {
  components: { CloudDownloadIcon, GestureUpIcon },
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
      disUpload: false, //文件补传显示/隐藏
      disUpload1: false, //文件补传显示/隐藏
      date: new Date().toLocaleString(), //上传文件日期
      files: [], //上传文件
      btnLoading: false, //按钮转圈
      // 父组件传递的参数
      parentParams: {},
      baseInfoData: {
        // 申报对象证件号码
        applicantIdnumber: null,
        // 申报对象名称
        applicantName: null,
        // 联系电话
        mobile: null,
        // 姓名
        name: null,
        // 证件类型
        idCardType: null,
        // 证件号码
        idCardNumber: null,
        // 缴存银行卡号
        bankAccount: null,
        // 公积金缴存银行
        bankName: null,
        // 公积金缴存银行名称
        bankNameString: null,
        // 单位名称
        companyName: null,
        // 单位统一社会信用代码
        socialCreditCode: null,
        // 户籍所在地
        householdAreaCode: null,
        // 退休标识
        isRetire: null,
        // 主管单位名称
        parentCompanyName: null,
        // 主管单位统一社会信用代码
        parentSocialCreditCode: null,
        // 人员类别
        personalStatus: null,
        // 人事档案保管机构名称
        personnelFileOrg: null,
        // 人事档案保管机构联系电话
        personnelFileOrgTel: null,
        // 人员类型
        personType: null,
        // 是否独生子女父母
        isOnleyChild: null,
        // 退休时间
        retirementDate: null,
        // 创建时间
        createtime: null
      },
      // 反馈信息
      feedbackInfo: {
        // 处理结果
        cljg: null,
        // 失败原因
        sjyy: null,
        // 业务序号
        busiid: null,
        // 单位账号
        unitaccnum: null,
        // 办理日期
        date: null,
        // 提取本金
        withdrawalPrincipal: null,
        // 提取利息
        withdrawalInterest: null,
        // 咨询电话
        reviewOrgTel: null,
        // 经办人账号
        jbr: null,
        // 经办人姓名
        jbrxm: null,
        // 经办人证件号码
        jbrzjhm: null,
        // 承诺办结时间
        promiseDate: null,
        // 承诺办结工作日
        promiseDay: null
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
    async handleSubmit() {
      // 上传文件校验
      let isFiles
      let base64Data
      let base64Data1
      if (this.files.length === 0) {
        this.$message.error('请上传反馈文件')
        // isFiles = {}
        return
      } else {
        base64Data = await this.uploadImgToBase64(this.files[0].raw)
        base64Data1 = base64Data.split(',', 2)[1]
        isFiles = {
          zxbh: this.parentParams.zxbh,
          id: this.parentParams.id,
          wjlx: '1',
          wjmc: this.files[0].name,
          wjsj: base64Data1,
          cjsj: null
        }
      }
      console.log(isFiles, '文件补传的参数')

      fileBc(isFiles)
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.$message.success('文件补传成功')
              this.btnLoading = false
              this.openBrowse = false
              this.$emit('refresh')
            }, 2000)
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
    uploadImgToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          // 图片转base64完成后返回reader对象
          resolve(reader.result)
        }
        reader.onerror = reject
      })
    },
    shortenFilename(filename, maxLength) {
      // 检查文件名是否超长
      if (filename.length <= maxLength) {
        return filename
      }
      // 找到文件扩展名的位置
      const extIndex = filename.lastIndexOf('.')
      const extension = extIndex !== -1 ? filename.slice(extIndex) : ''
      const nameWithoutExt = extIndex !== -1 ? filename.slice(0, extIndex) : filename

      // 计算保留前后部分的长度
      const charsToShow = maxLength - extension.length - 3 // 3 是表示省略号 "..."
      const frontChars = Math.ceil(charsToShow * 0.55) // 前部分保留 75%
      const backChars = Math.floor(charsToShow * 0.25) // 后部分保留 25%

      // 生成省略后的文件名
      return `${nameWithoutExt.slice(0, frontChars)}...${nameWithoutExt.slice(-backChars)}${extension}`
    },
    formatFileSize(size) {
      const units = ['B', 'KB', 'MB', 'GB', 'TB']
      let i = 0
      while (size >= 1024 && i < units.length - 1) {
        size /= 1024
        i++
      }
      return size.toFixed(2) + ' ' + units[i]
    },
    // 显示弹窗
    showBrowseDialog(row) {
      this.disUpload = false
      this.openBrowse = true
      // 清空数据
      // 赋值
      this.parentParams = row
      this.baseInfoData = {
        // 申报对象证件号码
        applicantIdnumber: null,
        // 申报对象名称
        applicantName: null,
        // 联系电话
        mobile: null,
        // 姓名
        name: null,
        // 证件类型
        idCardType: null,
        // 证件号码
        idCardNumber: null,
        // 缴存银行卡号
        bankAccount: null,
        // 公积金缴存银行
        bankName: null,
        // 公积金缴存银行名称
        bankNameString: null,
        // 单位名称
        companyName: null,
        // 单位统一社会信用代码
        socialCreditCode: null,
        // 户籍所在地
        householdAreaCode: null,
        // 退休标识
        isRetire: null,
        // 主管单位名称
        parentCompanyName: null,
        // 主管单位统一社会信用代码
        parentSocialCreditCode: null,
        // 人员类别
        personalStatus: null,
        // 人事档案保管机构名称
        personnelFileOrg: null,
        // 人事档案保管机构联系电话
        personnelFileOrgTel: null,
        // 人员类型
        personType: null,
        // 是否独生子女父母
        isOnleyChild: null,
        // 退休时间
        retirementDate: null,
        // 创建时间
        createtime: null
      }
      this.feedbackInfo = {
        // 处理结果
        cljg: null,
        // 失败原因
        sjyy: null,
        // 业务序号
        busiid: null,
        // 单位账号
        unitaccnum: null,
        // 办理日期
        date: null,
        // 提取本金
        withdrawalPrincipal: null,
        // 提取利息
        withdrawalInterest: null,
        // 咨询电话
        reviewOrgTel: null,
        // 经办人账号
        jbr: null,
        // 经办人姓名
        jbrxm: null,
        // 经办人证件号码
        jbrzjhm: null,
        // 承诺办结时间
        promiseDate: null,
        // 承诺办结工作日
        promiseDay: null
      }
      this.files = [] //文件补传制空
      this.fileList = []
      this.handleGetInfo(row)
    },
    // 加载数据
    handleGetInfo(row) {
      this.loading = true
      this.$nextTick(() => {
        getInfoById({ zxbh: row.zxbh, id: row.id })
          .then(res => {
            this.loading = false
            if (res.code === 200) {
              console.log(JSON.parse(JSON.stringify(res.data)))
              // 基本信息
              let dataInfo = res.data.zwbjzdxtbjData
              this.handleFormatBaseInfo(JSON.parse(dataInfo.zwqjsj))
              // this.handleFormatBaseInfo1(JSON.parse(dataInfo.fksj))
              // 文件数据
              this.fileList = res.data.zwbjzdxtbjFileList
              // 反馈信息
              this.feedbackInfo = dataInfo.fksj ? JSON.parse(dataInfo.fksj) : this.feedbackInfo
              this.handleFormatBaseInfo1(this.feedbackInfo)
              if (row.status == '3' || row.status == '4') {
                this.disUpload = true
                this.disUpload1 = true
              } else {
                this.disUpload = false
                this.disUpload1 = false
              }
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
      })
    },
    // 格式化基础数据-反馈数据
    handleFormatBaseInfo1(originData) {
      // 处理originData中某些值
      for (let key in originData) {
        if (originData[key] === null) {
          originData[key] = '-'
        }
      }
      this.feedbackInfo = originData
      // 格式化金额
      this.feedbackInfo.withdrawalPrincipal = this.formatAmount(this.feedbackInfo.withdrawalPrincipal)
      this.feedbackInfo.withdrawalInterest = this.formatAmount(this.feedbackInfo.withdrawalInterest)
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
      //  翻译字段
      this.baseInfoData.idCardType = this.translateDict(DOCUMENT_TYPE, this.baseInfoData.idCardType)
      this.baseInfoData.personalStatus = this.translateDict(PERSONNEL_CATEGORY, this.baseInfoData.personalStatus)
      this.baseInfoData.personType = this.translateDict(PERSONNEL_TYPE, this.baseInfoData.personType)
      this.baseInfoData.householdType = this.translateDict(NTR_F_HSHLD_RGSTRTN, this.baseInfoData.householdType)
      this.baseInfoData.bankName = this.translateDict(DEPOSIT_INTO_BANK, this.baseInfoData.bankName)
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
    downloadBase64File(base64Data, fileName, fileType) {
      let binaryString
      if (fileType == '1') {
        binaryString = atob(atob(base64Data))
      } else {
        binaryString = atob(base64Data)
      }
      // 将 Base64 字符串转换为二进制数据
      // const binaryString = atob(atob(base64Data))
      console.log('44444444', binaryString)

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
      console.log('12121212', row)
      this.downloadBase64File(row.wjsj, row.wjmc, row.wjlx)
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
    text-align: center;
  }
  .t-descriptions__body--border .t-descriptions__label:hover {
    background-color: #b5c7ff;
  }
}
</style>
