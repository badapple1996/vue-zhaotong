<template>
  <!-- 第二个反馈弹框 -->
  <el-dialog
    title="个人退休一件事反馈"
    width="80%"
    top="10vh"
    :visible.sync="dialogFormVisible_3"
    class="dialog-frist"
    :before-close="handleClose"
  >
    <div class="form-tip">申报信息</div>
    <el-form
      :model="formFourth"
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
            <el-form-item label="申报对象证件号码">
              <el-input v-model="formFourth.applicantIdnumber" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="申报对象名称">
              <el-input v-model="formFourth.applicantName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="联系电话">
              <el-input v-model="formFourth.mobile" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="姓名">
              <el-input v-model="formFourth.name" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="证件类型">
              <el-select v-model="formFourth.idCardType" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="证件号码">
              <el-input v-model="formFourth.idCardNumber" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="缴存银行卡号">
              <el-input v-model="formFourth.bankAccount" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="公积金缴存银行">
              <el-select v-model="formFourth.bankName" placeholder="请选择" style="width: 100%"> </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="公积金缴存银行名称">
              <el-input v-model="formFourth.bankName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="单位名称">
              <el-input v-model="formFourth.companyName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="单位统一社会信用代码">
              <el-input v-model="formFourth.socialCreditCode" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="户籍所在地">
              <el-select v-model="formFourth.householdAreaCode" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in AREA_CODE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="退休标识">
              <el-select v-model="formFourth.isRetire" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in IS_RETIRE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="主管单位名称">
              <el-input v-model="formFourth.companyName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="主管单位统一社会信用代码">
              <el-input v-model="formFourth.socialCreditCode" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="人员类别">
              <el-select v-model="formFourth.personalStatus" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PERSONNEL_CATEGORY" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="人事档案保管机构名称">
              <el-input v-model="formFourth.personnelFileOrg" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="人事档案保管机构联系电话">
              <el-input v-model="formFourth.personnelFileOrgTel" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="人员类型">
              <el-select v-model="formFourth.personType" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PERSONNEL_TYPE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="是否独生子女父母">
              <el-input v-model="formFourth.isOnleyChild" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="退休时间">
              <el-input v-model="formFourth.Txsj" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="创建时间">
              <el-input v-model="formFourth.createtime" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!-- <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
    </el-form>
    <div class="form-tip">反馈信息</div>
    <el-form
      :model="formFourthback"
      ref="myFormFourthback"
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
              <el-select v-model="formFourthback.cljg" clearable placeholder="请选择" style="width: 100%">
                <el-option label="成功" value="success"></el-option>
                <el-option label="失败" value="fail"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="失败原因" prop="sjyy" v-if="formFourthback.cljg === 'fail'">
              <el-input v-model="formFourthback.sjyy" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="业务序号" prop="busiid" v-if="formFourthback.cljg === 'success'">
              <el-input v-model="formFourthback.busiid" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="单位账号" prop="unitaccnum" v-if="formFourthback.cljg === 'success'">
              <el-input v-model="formFourthback.unitaccnum" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="办理日期" prop="date" v-if="formFourthback.cljg === 'success'">
              <el-input v-model="formFourthback.date" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="提取本金" prop="withdrawalPrincipal" v-if="formFourthback.cljg === 'success'">
              <el-input
                v-model="formFourthback.withdrawalPrincipal"
                placeholder="请输入"
                class="uniform-width"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="提取利息" prop="withdrawalInterest" v-if="formFourthback.cljg === 'success'">
              <el-input
                v-model="formFourthback.withdrawalInterest"
                placeholder="请输入"
                class="uniform-width"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="咨询电话" prop="reviewOrgTel" v-if="formFourthback.cljg === 'success'">
              <el-input v-model="formFourthback.reviewOrgTel" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="经办人账号" prop="jbr" v-if="formFourthback.cljg === 'success'">
              <el-input v-model="formFourthback.jbr" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="经办人姓名" prop="jbrxm" v-if="formFourthback.cljg === 'success'">
              <el-input v-model="formFourthback.jbrxm" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="经办人证件号码" prop="jbrsfzh" v-if="formFourthback.cljg === 'success'">
              <el-input v-model="formFourthback.jbrsfzh" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item class="dialog-button">
        <!-- 这里要写判断 -->
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
  AREA_CODE,
  IS_RETIRE
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
      IS_RETIRE,

      tableDataFrist: null, //列表数据
      dialogFormVisible_3: false, //第二个浏览弹框
      files: [], //上传文件
      //个人退休反馈-申报信息表单
      formFourth: {
        applicantIdnumber: null, //申报对象证件号码
        applicantName: null, //申报对象名称
        mobile: null, //联系电话
        name: null, //姓名
        idCardType: null, //证件类型
        idCardNumber: null, //证件号码
        bankAccount: null, //缴存银行卡号
        bankName: null, //公积金缴存银行
        // bankName: null, //公积金缴存银行名称
        companyName: null, //单位名称
        socialCreditCode: null, //单位统一社会信用代码
        householdAreaCode: null, //户籍所在地
        isRetire: null, //退休标识
        // companyName: null, //主管单位名称
        // socialCreditCode: null, //主管单位统一社会信用代码
        personalStatus: null, //人员类别
        personnelFileOrg: null, //人事档案保管机构名称
        personnelFileOrgTel: null, //人事档案保管机构联系电话
        personType: null, //人员类型
        isOnleyChild: null, //是否独生子女父母
        Txsj: null, //退休时间
        createtime: null //创建时间
      },
      //个人退休反馈-反馈信息表单
      formFourthback: {
        cljg: null, //处理结果
        busiid: null, //业务序号
        sjyy: null, //失败原因
        TranDate: null, //办理日期
        accnum: null, //个人账号 扣款账户名称
        relphone: null, //手机号码
        certinum: null,
        accname: null,
        day: null, //每月约定扣款日
        monpaysum: null, //月缴存额
        swtyhdm: null, //所属银行
        accnumname: null, //账户名称
        jbr: null, //经办人账号
        jbrxm: null, //经办人姓名
        jbrsfzh: null, //经办人证件号码

        withdrawalPrincipal: null, //提取本金
        withdrawalInterest: null, //提取利息
        reviewOrgTel: null //咨询电话
      },
      // 校验规则
      rules: {
        busiid: [{ required: true, message: '请输入业务序号', trigger: 'change' }],
        // unitaccnum: [{ required: true, message: '', type: 'error' }],
        // TranDate: [{ required: true, message: '', type: 'error' }],
        // accnum: [{ required: true, message: '', type: 'error' }],
        // relphone: [{ required: true, message: '', type: 'error' }],
        // accname: [{ required: true, message: '', type: 'error' }],
        // paymentDueDate: [{ required: true, message: '', type: 'error' }],
        // monthlyAmount: [{ required: true, message: '', type: 'error' }],
        // bankName: [{ required: true, message: '', type: 'error' }],
        // accnumname: [{ required: true, message: '', type: 'error' }],
        // bankAccount: [{ required: true, message: '', type: 'error' }],
        jbr: [{ required: true, message: '请输入经办人账号', trigger: 'change' }],
        jbrxm: [{ required: true, message: '请输入经办人姓名', trigger: 'change' }],
        jbrzjhm: [{ required: true, message: '请输入经办人证件号码', trigger: 'change' }],
        promiseDate: [{ required: true, message: '请选择承诺办结时间', trigger: 'change' }]
      }
    }
  },
  mounted() {},
  methods: {
    // 切换处理结果
    handleResultChange(value) {
      this.formFourthback.cljg = value
      //   上传文件
      this.files = []
      // 重置表单
      this.$refs.formFourthback.reset()
      // 重置失败原因
      this.formFourthback.sjyy = null
      this.formFourthback.reviewOrgTel = '0871-12329'
    },
    // 显示弹窗
    showFeedbackDialog(row) {
      this.dialogFormVisible_3 = true
      // 赋值
      this.parentParams = row
      // 清空数据
      this.files = []
      this.formFourth = {
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
      this.formFourthback = {
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
        reviewOrgTel: '0871-12329',
        // 经办人账号
        jbr: null,
        // 经办人姓名
        jbrxm: null,
        // 经办人证件号码
        jbrzjhm: null,
        // 承诺办结时间
        promiseDate: null
      }
      this.tableDataFrist = []
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
            // 反馈数据
            this.formFourthback = {}
            this.formFourthback.reviewOrgTel = '0871-12329'
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
      this.formFourth = originData

      //  翻译字段

      this.formFourth.idCardType = this.translateDict(DOCUMENT_TYPE, this.formFourth.idCardType)
      this.formFourth.personalStatus = this.translateDict(PERSONNEL_CATEGORY, this.formFourth.personalStatus)

      this.formFourth.personType = this.translateDict(PERSONNEL_TYPE, this.formFourth.personType)
      this.formFourth.householdType = this.translateDict(NTR_F_HSHLD_RGSTRTN, this.formFourth.householdType)
      this.formFourth.bankName = this.translateDict(DEPOSIT_INTO_BANK, this.formFourth.bankName)

      this.formFourth.householdAreaCode = this.translateDict(AREA_CODE, this.formFourth.householdAreaCode)
      this.formFourth.addressAreaCode = this.translateDict(AREA_CODE, this.formFourth.addressAreaCode)
      this.formFourth.areaCode = this.translateDict(AREA_CODE, this.formFourth.areaCode)
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
    format(val) {
      return val.replace(/\d{1,3}(?=(\d{3})+(\.|$))/g, '$&,')
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
    handleSubmitFeedback({ validateResult }) {
      if (validateResult === true) {
        this.btnLoading = true
        this.feedbackInfo.sjyy = '同意'
        this.handleSubmit()
      } else {
        this.$message.error('请检查必填项')
      }
    },
    // 失败反馈提交
    handleSubmitFailFeedback() {
      // 处理失败原因
      if (this.feedbackInfo.cljg == '4') {
        if (this.feedbackInfo.sjyy == null || this.feedbackInfo.sjyy == '') {
          this.$message.error('请输入失败原因')
          return
        } else {
          this.btnLoading = true
          this.handleSubmit()
        }
      }
    },
    // 提交
    async handleSubmit() {
      // 上传文件校验
      let isFiles
      if (this.files.length === 0) {
        // this.$message.error('请上传反馈文件')
        isFiles = {}
      } else {
        isFiles = {
          zxbh: this.parentParams.zxbh,
          id: this.parentParams.id,
          wjlx: '1',
          wjmc: this.files[0].name,
          wjsj: await this.uploadImgToBase64(this.files[0].raw),
          cjsj: null
        }
      }
      // console.log(isFiles, this.uploadImgToBase64(this.files[0].raw), 'isFiles有文件上传吗')
      // 处理反馈信息
      var feedbackData = {
        sqData: {
          zxbh: this.parentParams.zxbh,
          id: this.parentParams.id,
          jbr: this.parentParams.jbr,
          jbrxm: this.parentParams.jbrxm,
          jbrzjhm: this.parentParams.jbrzjhm,
          promiseDate: this.feedbackInfo.promiseDate,
          busiid: this.feedbackInfo.busiid,
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
        fbFile: isFiles
        // fbFile: {
        //   zxbh: this.parentParams.zxbhnull,
        //   id: this.parentParams.id,
        //   wjlx: '1',
        //   wjmc: null,
        //   wjsj: null,
        //   cjsj: null
        // }
      }
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
