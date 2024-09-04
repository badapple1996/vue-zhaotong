<template>
  <!-- //第一个浏览弹框 -->
  <el-dialog
    title="个人就业创业一件事浏览"
    width="80%"
    top="10vh"
    :visible.sync="dialogFormVisible"
    class="dialog-frist"
  >
    <div class="form-tip">申报信息</div>
    <el-form
      :model="formFrist"
      ref="myFormfrist"
      :disabled="true"
      label-width="150px"
      class="demo-form-inline"
      size="mini"
    >
      <!-- <el-row :gutter="20">  -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="申报对象证件号码">
              <el-input v-model="formFrist.applicantIdnumber" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="申报对象名称">
              <el-input v-model="formFrist.applicantName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="姓名">
              <el-input v-model="formFrist.name" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="证件类型">
              <el-select v-model="formFrist.idCardType" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="性别">
              <el-select v-model="formFrist.gender" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in GENDER" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="民族">
              <el-select v-model="formFrist.nation" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in NATION" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="婚姻状况">
              <el-select v-model="formFrist.maritalStatus" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in MARITAL_STATUS" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="户口性质">
              <el-select v-model="formFrist.householdType" clearable placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in NTR_F_HSHLD_RGSTRTN"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="居住详细住址">
              <el-input v-model="formFrist.address" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="户籍所在地">
              <el-input v-model="formFrist.householdLocation" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="业务类型">
              <el-select v-model="formFrist.isAccountOpen" placeholder="请选择" style="width: 100%">
                <el-option label="个人开户、个人启封" value="isAccountOpen"></el-option>
                <el-option label="个人账户启封" value="isAccountUnsealing"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="职业">
              <el-select v-model="formFrist.profession" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PERSONNEL_CATEGORY" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="缴存银行账户">
              <el-input v-model="formFrist.bankAccount" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="缴款方式">
              <el-select v-model="formFrist.payMethod" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PAYMENT_METHOD" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="月缴存额">
              <el-input v-model="formFrist.monthlyAmount" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="缴存基数">
              <el-input v-model="formFrist.depositBase" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="学历">
              <el-select v-model="formFrist.education" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in EDUCATION" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="邮政编码">
              <el-input v-model="formFrist.postalCode" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="固定电话号码">
              <el-input v-model="formFrist.telephone" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="经办机构所在地">
              <el-select v-model="formFrist.areaCode" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in AREA_CODE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!-- <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
    </el-form>
    <template v-if="showBack">
      <div>
        <div class="form-tip">反馈信息</div>
        <el-form :model="formFristback" ref="myFormfrist" label-width="120px" size="mini" class="demo-form-inline" :disabled=disabledBack>
          <!-- <el-row :gutter="20">  -->
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="处理结果">
                  <el-select v-model="formFristback.cljg" clearable placeholder="请选择" style="width: 100%">
                    <el-option label="成功" value="3"></el-option>
                    <el-option label="失败" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="失败原因" v-if="formFristback.cljg === '4'">
                  <el-input v-model="formFristback.sjyy" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="业务序号" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.busiid" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <!-- <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="单位账号" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.unitaccnum" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="办理日期" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.TranDate" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="个人账号" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.accnum" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="手机号码" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.relphone" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="扣款账户名称" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.accname" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="每月约定扣款日" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.day" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="月缴存额" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.monpaysum" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="所属银行" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.swtyhdm" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="账户名称" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.accnumname" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="银行账号" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.bankaccnum" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col> -->
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="经办人账号" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.jbr" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="经办人姓名" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.jbrxm" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="经办人证件号码" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.jbrzjhm" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="承诺办结时间" v-if="formFristback.cljg === '3'">
                  <el-input v-model="formFristback.promiseDate" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
        </el-form>
      </div>
    </template>
    <div class="form-tip">附件列表信息</div>
    <el-table :data="tableDataFrist" border style="width: 100%">
      <el-table-column label="序号" type="index" width="100"> </el-table-column>
      <el-table-column prop="wjlx" label="文件类型" width="300">
        <template slot-scope="scope">
          <span>{{ wjlx[scope.row.wjlx] || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="wjmc" label="文件名称" show-overflow-tooltip width="300"> </el-table-column>
      <el-table-column prop="cjsj" label="创建时间" width="300"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="downloadFile(scope.row)" type="text" size="small">下载</el-button>
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

      disabledBack:false,//控制反馈信息的表单禁用
      showBack: true, //显示反馈信息
      tableDataFrist: [], // 附件列表
      
      dialogFormVisible: false, //第一个浏览弹框
      //个人创业就业浏览-申报信息表单
      formFrist: {
        applicantIdnumber: null, // 申报对象证件号码
        applicantName: null, // 申报对象名称
        name: null, // 姓名
        idCardType: null, // 证件类型
        gender: null, // 性别
        nation: null, //民族
        maritalStatus: null, // 婚姻状况
        householdType: null, // 户口性质
        address: null, // 居住详细住址
        householdLocation: null, // 户籍所在地
        isAccountOpen: null, // 业务类型 个人开户、个人启封
        isAccountUnsealing: null, // 业务类型 个人账户启封
        profession: null, // 职业
        bankAccount: null, // 缴存银行账户
        payMethod: null, // 缴款方式
        monthlyAmount: null, // 月缴存额
        depositBase: null, // 缴存基数
        education: null, // 学历
        postalCode: null, // 邮政编码
        telephone: null, // 固定电话号码
        areaCode: null // 经办机构所在地
      },
      //个人创业就业浏览-反馈信息表单
      formFristback: {
        cljg: null, //处理结果
        busiid: null, //业务序号
        sjyy: null, //失败原因
        unitaccnum: null, //单位账号
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
        jbrsfzh: null //经办人证件号码
      }
    }
  },
  methods: {
    // 显示弹窗
    showBrowseDialog(row) {
      this.dialogFormVisible = true
      // 清空数据
      this.formFrist = {}
      this.formFristback = {
        cljg: null, // 处理结果
        sjyy: null, // 失败原因
        busiid: null, // 业务序号
        // unitaccnum: null, // 单位账号
        // TranDate: null, // 办理日期
        // accnum: null, // 个人账号
        // relphone: null, // 手机号码
        // accname: null, // 扣款账户名称
        // paymentDueDate: null, // 每月约定扣款日
        // monthlyAmount: null, // 月缴存额
        // bankName: null, // 所属银行
        // accnumname: null, // 账户名称
        // bankAccount: null, // 银行账号
        jbr: null, // 经办人账号
        jbrxm: null, // 经办人姓名
        jbrzjhm: null, // 经办人证件号码
        promiseDate: null // 承诺办结时间
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
            // 基本信息
            let dataInfo = res.data.zwbjzdxtbjData
            this.handleFormatBaseInfo(JSON.parse(dataInfo.zwqjsj))
            // 文件数据
            this.tableDataFrist = res.data.zwbjzdxtbjFileList
            console.log(this.tableDataFrist,'this.tableDataFrist===========');
            
            // 反馈信息
            this.formFristback = dataInfo.fksj ? JSON.parse(dataInfo.fksj) : this.formFristback
            if (this.formFristback.cljg === '3' || this.formFristback.cljg === '3') {
              this.disabledBack = true
            }
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
      this.formFrist = originData
      // 格式化金额
      this.formFrist.monthlyAmount = this.formatAmount(this.formFrist.monthlyAmount)
      this.formFrist.monthlyIncome = this.formatAmount(this.formFrist.monthlyIncome)
      this.formFrist.depositBase = this.formatAmount(this.formFrist.depositBase)
      this.formFrist.birthday = this.formFrist.birthday.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
      //  翻译字段
      this.formFrist.gender = this.translateDict(GENDER, this.formFrist.gender)
      this.formFrist.idCardType = this.translateDict(DOCUMENT_TYPE, this.formFrist.idCardType)
      this.formFrist.nation = this.translateDict(NATION, this.formFrist.nation)
      this.formFrist.maritalStatus = this.translateDict(MARITAL_STATUS, this.formFrist.maritalStatus)
      this.formFrist.householdType = this.translateDict(NTR_F_HSHLD_RGSTRTN, this.formFrist.householdType)
      this.formFrist.bankName = this.translateDict(DEPOSIT_INTO_BANK, this.formFrist.bankName)
      this.formFrist.education = this.translateDict(EDUCATION, this.formFrist.education)
      this.formFrist.payMethod = this.translateDict(PAYMENT_METHOD, this.formFrist.payMethod)
      this.formFrist.householdAreaCode = this.translateDict(AREA_CODE, this.formFrist.householdAreaCode)
      this.formFrist.addressAreaCode = this.translateDict(AREA_CODE, this.formFrist.addressAreaCode)
      this.formFrist.areaCode = this.translateDict(AREA_CODE, this.formFrist.areaCode)
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
