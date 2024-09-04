<template>
  <!-- 第三个反馈弹框 企业破产-->
  <el-dialog
    title="企业破产核查反馈"
    width="80%"
    top="10vh"
    :visible.sync="dialogFormVisible_5"
    class="dialog-frist"
    :before-close="handleClose"
  >
    <div class="form-tip">申报信息</div>
    <el-form
      :model="formSix"
      ref="myFormfrist"
      :disabled="true"
      size="mini"
      label-width="200px"
      class="demo-form-inline"
    >
      <!-- <el-row :gutter="20">  -->
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="企业名称">
              <el-input v-model="formSix.qymc" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="统一社会信用代码">
              <el-input v-model="formSix.tyshxydm" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="经办人身份证号">
              <el-input v-model="formSix.jbr_sfzh" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-tip">反馈信息</div>
    <el-form
      :model="formSixback"
      ref="myFormSixback"
      :rules="rules"
      label-width="120px"
      size="mini"
      class="demo-form-inline"
    >
      <!-- <el-row :gutter="20">  -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="处理结果" prop="cljg">
              <el-select v-model="formSixback.cljg" clearable placeholder="请选择" style="width: 100%">
                <el-option label="成功" value="success"></el-option>
                <el-option label="失败" value="fail"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="失败原因" prop="sjyy" v-if="formSixback.cljg === 'fail'">
              <el-input v-model="formSixback.sjyy" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <el-upload
            class="upload-demo"
            :action="''"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :file-list="fileList"
            :limit="1"
            :auto-upload="false"
            :on-remove="handleRemove"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf、jpg、png文件，且不超过2mb</div>
          </el-upload>
        </el-col>
      </el-row>
      <el-form-item class="onSubmi-button">
        <el-button type="primary" @click="handleSubmitFeedback">反馈提交</el-button>
      </el-form-item>
    </el-form>
    <div class="form-tip">附件列表信息</div>
    <el-table :data="tableDataFrist" border style="width: 100%">
      <el-table-column label="序号" type="index" width="200"> </el-table-column>
      <el-table-column prop="wjlx" label="文件类型" width="200">
        <template slot-scope="scope">
          <span>{{ wjlx[scope.row.wjlx] || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="wjmc" label="文件名称" show-overflow-tooltip width="200"> </el-table-column>
      <el-table-column prop="cjsj" label="创建时间" width="200"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleDownload(scope.row)" type="text" size="small">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getInfoById, feedbackOp } from '../../api/commonApi'
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
export default {
  components: {},
  data() {
    return {
      tableDataFrist: null, //列表数据
      dialogFormVisible_1: false, //弹框显示
      date: new Date().toLocaleString(),
      files: [],
      btnLoading: false,
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
      dialogFormVisible_5: false, //打开弹框
      // 申报信息
      // 附件列表
      fileList: [],
      //企业破产核查浏览-申报信息表单
      formSix: {
        qymc: null, // 企业名称
        tyshxydm: null, // 统一社会信用代码
        jbr_sfzh: null // 经办人身份证号
      },
      //企业破产核查浏览-反馈信息表单
      formSixback: {
        zxbh: '',
        id: '',
        cljg: '',
        sjyy: ''
      },
      // 校验规则
      rules: {
        cljg: [{ required: true, message: '请选择选择', trigger: 'change' }],
        sjyy: [{ required: true, message: '请输入失败原因', trigger: 'change' }]
      },
      // 父组件传递的参数
      parentParams: {},
      pickDate: ''
    }
  },
  computed: {
    // timePickerProps() {
    //   return {
    //     disableTime: () => {
    //       if (this.pickDate === dayjs().format('YYYY-MM-DD')) {
    //         return {
    //           hour: [0, 1, 2, 3, 4, 5, 6]
    //         }
    //       }
    //       return {}
    //     }
    //   }
    // }
  },
  mounted() {},
  methods: {
    // 显示弹窗
    showFeedbackDialog(row) {
      this.dialogFormVisible_5 = true
      // 清空数据
      this.files = []
      this.tableDataFrist = []
      this.formSixback = {}
      this.formSix = {}
      this.parentParams = {}
      this.parentParams = row
      this.handleGetInfo(row)
    },
    // 加载数据
    handleGetInfo(row) {
      //   this.loading = true
      this.$nextTick(() => {
        getInfoById({ zxbh: row.zxbh, id: row.id }).then(res => {
          //   this.loading = false
          if (res.code === 200) {
            console.log(JSON.parse(JSON.stringify(res.data)))
            // data数据
            let dataInfo = res.data.zwbjzdxtbjData
            this.handleFormatBaseInfo(JSON.parse(dataInfo.zwqjsj))
            // 文件数据
            this.tableDataFrist = res.data.zwbjzdxtbjFileList
            // 基本数据
            this.feedbackInfo = {}
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
      this.formSix = originData
      // 格式化金额
      this.formSix.monthlyAmount = this.formatAmount(this.formSix.monthlyAmount)
      this.formSix.monthlyIncome = this.formatAmount(this.formSix.monthlyIncome)
      //  翻译字段
      this.formSix.gender = this.translateDict(GENDER, this.formSix.gender)
      this.formSix.idCardType = this.translateDict(DOCUMENT_TYPE, this.formSix.idCardType)
      this.formSix.nation = this.translateDict(NATION, this.formSix.nation)
      this.formSix.maritalStatus = this.translateDict(MARITAL_STATUS, this.formSix.maritalStatus)
      this.formSix.householdType = this.translateDict(NTR_F_HSHLD_RGSTRTN, this.formSix.householdType)
      this.formSix.bankName = this.translateDict(DEPOSIT_INTO_BANK, this.formSix.bankName)
      this.formSix.education = this.translateDict(EDUCATION, this.formSix.education)
      this.formSix.payMethod = this.translateDict(PAYMENT_METHOD, this.formSix.payMethod)
      this.formSix.householdAreaCode = this.translateDict(AREA_CODE, this.formSix.householdAreaCode)
      this.formSix.addressAreaCode = this.translateDict(AREA_CODE, this.formSix.addressAreaCode)
      this.formSix.areaCode = this.translateDict(AREA_CODE, this.formSix.areaCode)
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
    },
    // 提交反馈
    async handleSubmitFeedback() {
      // 上传文件校验
      if (this.files.length === 0) {
        this.$message.error('请上传反馈文件')
        return
      }
      // 按钮loading
      // 处理反馈信息

      var feedbackData = {
        sqData: {
          zxbh: this.parentParams.zxbh,
          id: this.parentParams.id,
          jbr: this.parentParams.jbr,
          jbrxm: this.parentParams.jbrxm,
          jbrzjhm: this.parentParams.jbrzjhm,
          busiid: null,
          fkrq: null,
          fksj: null,
          status: this.feedbackInfo.cljg
        },
        fbData: {
          zxbh: this.parentParams.zxbh,
          id: this.parentParams.id,
          fksj: JSON.stringify(this.feedbackInfo)
        },
        // 反馈文件置空
        fbFile: {
          zxbh: this.parentParams.zxbh,
          id: this.parentParams.id,
          wjlx: '1',
          wjmc: this.files[0].name,
          wjsj: await this.uploadImgToBase64(this.files[0].raw),
          cjsj: null
        }
      }
      console.log(feedbackData)
      feedbackOp(feedbackData).then(res => {
        if (res.code === 200) {
          setTimeout(() => {
            this.$message.success('反馈提交成功')
            this.btnLoading = false
            this.openFeedback = false
            this.$emit('refresh')
          }, 2000)
        } else {
          this.$message.error('反馈提交失败，请稍后重试')
        }
      })
    },
    handleResultChange(value) {
      this.feedbackInfo.cljg = value
      this.files = []
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
    // 在文件上传前执行（但我们不立即上传，所以这里主要为了显示错误消息）
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
        return false
      }
      // 注意：这里不直接返回false，因为我们想在onChange中处理文件
      return true // 或者直接不返回（隐式返回undefined），因为我们已经处理了大小限制
    },

    // 文件状态改变时（文件被选中）
    handleChange(file, fileList) {
      // 清除之前的Base64和文件名（如果有的话）
      this.fileBase64 = ''
      this.fileName = ''

      // 检查文件类型
      if (!file.raw.type.match('image/jpeg|image/png|application/pdf')) {
        this.$message.error('上传文件只能是 JPG、PNG、PDF 格式!')
        this.handleRemove()
        return
      }

      // 读取文件为Base64
      const reader = new FileReader()
      reader.onload = e => {
        this.fileBase64 = e.target.result
        this.fileName = file.raw.name // 使用file.raw来获取原始的File对象
        console.log(this.fileName, ' this.fileName==========')
      }
      reader.readAsDataURL(file.raw)

      // 更新fileList（可选，取决于你是否需要在界面上显示文件列表）
      this.fileList = fileList.slice(-1) // 只保留最新选择的文件
    },

    // 处理文件移除（可选）
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.fileBase64 = ''
      this.fileName = ''
    },
    // 关闭弹框
    handleClose() {
      console.log('关闭弹框')
      this.dialogFormVisible_1 = false
      this.dialogFormVisible_3 = false
      this.dialogFormVisible_5 = false
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  position: relative;
}
.container .el-pagination {
  position: absolute;
  right: 0;
  bottom: -60px;
  margin-bottom: 20px;
}
.container .buttonHome {
  text-align: center;
}
.uniform-width {
  width: 100%;
}
.dialog-frist {
  text-align: center;
}
.dialog-frist .form-tip {
  text-align: left;
  margin-bottom: 20px;
  left: 10px;
  color: #070707;
  font-size: 24px;
}
.onSubmi-button {
  margin-top: 20px;
}
</style>
