<template>
  <t-dialog
    :visible.sync="openBrowse"
    attach="body"
    header="企业破产一件事浏览"
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
          <t-descriptions-item label="企业名称">
            <t-input v-model="baseInfoData.qymc" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="统一社会信用代码">
            <t-input v-model="baseInfoData.tyshxydm" borderless readonly placeholder="-" />
          </t-descriptions-item>
          <t-descriptions-item label="经办人身份证号">
            <t-input v-model="baseInfoData.jbr_sfzh" borderless readonly placeholder="-" />
          </t-descriptions-item>
        </t-descriptions>
      </t-card>
      <!-- 反馈信息 -->
      <t-card title="反馈信息" class="container-base-margin-top" :bordered="false">
        <t-descriptions
          bordered
          colon
          size="small"
          v-if="feedbackInfo.cljg"
          itemLayout="vertical"
          class="container-feedback"
          :column="3"
        >
          <t-descriptions-item label="处理结果" :span="3">
            <t-space>
              <t-tag :theme="feedbackInfo.cljg === '3' ? 'success' : 'danger'" size="small">{{
                feedbackInfo.cljg === '3' ? '成功' : '失败'
              }}</t-tag>
            </t-space>
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
        <div v-show="disUpload" style="width: 100%; margin-top: 20px; display: flex; justify-content: center">
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
      date: new Date().toLocaleString(), //上传文件日期
      files: [], //上传文件
      btnLoading: false, //按钮转圈
      // 父组件传递的参数
      parentParams: {},
      baseInfoData: {
        // 企业名称
        qymc: null,
        //统一社会信用代码
        tyshxydm: null,
        // 经办人身份证号
        jbr_sfzh: null
      },
      // 反馈信息
      feedbackInfo: {
        cljg: null // 处理结果
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
      // 赋值
      this.parentParams = row
      //清空数据
      this.baseInfoData = {
        // 企业名称
        qymc: null,
        //统一社会信用代码
        tyshxydm: null,
        // 经办人身份证号
        jbr_sfzh: null
      }
      this.feedbackInfo = {
        cljg: null // 处理结果
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
              // data数据
              let dataInfo = res.data.zwbjzdxtbjData
              this.handleFormatBaseInfo(JSON.parse(dataInfo.zwqjsj))
              // 文件数据
              this.fileList = res.data.zwbjzdxtbjFileList
              // 基本数据
              this.feedbackInfo = dataInfo.fksj ? JSON.parse(dataInfo.fksj) : this.feedbackInfo
              if (row.status == '3' || row.status == '4') {
                this.disUpload = true
                console.log(this.disUpload, 'this.disUpload++++++++++++++++')
              } else {
                this.disUpload = false
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
    downloadBase64File(base64Data, fileName, fileType) {
      let binaryString
      if (fileType == '1') {
        binaryString = atob(atob(base64Data))
      } else {
        binaryString = atob(base64Data)
      }
      // 将 Base64 字符串转换为二进制数据
      // const binaryString = atob(atob(base64Data))
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
  .container-feedback {
    .t-descriptions__content {
      text-align: center;
    }
  }
}
</style>
