<template>
  <!-- //第3个浏览弹框-企业破产 -->
  <el-dialog title="企业破产核查浏览" width="80%" top="10vh" :visible.sync="dialogFormVisible_4" class="dialog-frist">
    <div class="form-tip">申报信息</div>
    <el-form
      :model="formFifth"
      ref="myFormfrist"
      size="mini"
      :disabled="true"
      label-width="200px"
      class="demo-form-inline"
    >
      <!-- <el-row :gutter="20">  -->
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="企业名称">
              <el-input v-model="formFifth.qymc" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="统一社会信用代码">
              <el-input v-model="formFifth.tyshxydm" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="经办人身份证号">
              <el-input v-model="formFifth.jbr_sfzh" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!-- <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
    </el-form>
    <div class="form-tip">反馈信息</div>
    <el-form :model="formFifthback" ref="myFormfrist" label-width="120px" size="mini" class="demo-form-inline">
      <!-- <el-row :gutter="20">  -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="处理结果">
              <el-select v-model="formFifthback.cljg" clearable placeholder="请选择" style="width: 100%">
                <el-option label="成功" value="success"></el-option>
                <el-option label="失败" value="fail"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="失败原因" v-if="formFifthback.cljg === 'fail'">
              <el-input v-model="formFifthback.sjyy" placeholder="请输入" class="uniform-width"></el-input>
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
      <!-- <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
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
    <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div> -->
  </el-dialog>
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
export default {
  //   name: 'Home',
  components: {
    // JobBrowse,
    // JobFeedback,
    // RetireBrowse,
    // RetireFeedback,
    // BankruptcyBrowse,
    // BankruptcyFeedback,
    // AdjustmentIcon,
    // DiscountIcon
  },
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

      fileList: [], // 已选文件列表
      showBack: true, //显示反馈信息
      tableDataFrist: [], // 附件列表
      dialogFormVisible_4: false, //第一个浏览弹框
      // 申报信息
      formFifth: {
        // 企业名称
        qymc: null,
        //统一社会信用代码
        tyshxydm: null,
        // 经办人身份证号
        jbr_sfzh: null
      },
      // 反馈信息
      formFifthback: {
        cljg: null // 处理结果
      }
    }
  },
  methods: {
    // 显示弹窗
    showBrowseDialog(row) {
      this.dialogFormVisible_4 = true
      //清空数据
      this.formFifth = {
        // 企业名称
        qymc: null,
        //统一社会信用代码
        tyshxydm: null,
        // 经办人身份证号
        jbr_sfzh: null
      }
      this.formFifthback = {
        cljg: null // 处理结果
      }
      this.tableDataFrist = []
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
            // data数据
            let dataInfo = res.data.zwbjzdxtbjData
            this.handleFormatBaseInfo(JSON.parse(dataInfo.zwqjsj))
            // 文件数据
            this.tableDataFrist = res.data.zwbjzdxtbjFileList
            // 基本数据
            this.formFifthback = dataInfo.fksj ? JSON.parse(dataInfo.fksj) : this.formFifthback
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
      this.formFifth = originData
      // 格式化金额
      this.formFifth.monthlyAmount = this.formatAmount(this.formFifth.monthlyAmount)
      this.formFifth.monthlyIncome = this.formatAmount(this.formFifth.monthlyIncome)
      //  翻译字段
      this.formFifth.gender = this.translateDict(GENDER, this.formFifth.gender)
      this.formFifth.idCardType = this.translateDict(DOCUMENT_TYPE, this.formFifth.idCardType)
      this.formFifth.nation = this.translateDict(NATION, this.formFifth.nation)
      this.formFifth.maritalStatus = this.translateDict(MARITAL_STATUS, this.formFifth.maritalStatus)
      this.formFifth.householdType = this.translateDict(NTR_F_HSHLD_RGSTRTN, this.formFifth.householdType)
      this.formFifth.bankName = this.translateDict(DEPOSIT_INTO_BANK, this.formFifth.bankName)
      this.formFifth.education = this.translateDict(EDUCATION, this.formFifth.education)
      this.formFifth.payMethod = this.translateDict(PAYMENT_METHOD, this.formFifth.payMethod)
      this.formFifth.householdAreaCode = this.translateDict(AREA_CODE, this.formFifth.householdAreaCode)
      this.formFifth.addressAreaCode = this.translateDict(AREA_CODE, this.formFifth.addressAreaCode)
      this.formFifth.areaCode = this.translateDict(AREA_CODE, this.formFifth.areaCode)
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
