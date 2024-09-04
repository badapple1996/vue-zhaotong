<template>
  <!-- //第2个浏览弹框 -->
  <el-dialog title="个人退休一件事浏览" width="80%" top="10vh" :visible.sync="dialogFormVisible_2" class="dialog-frist">
    <div class="form-tip">申报信息</div>
    <el-form
      :model="formSecond"
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
            <el-form-item label="申报对象证件号码">
              <el-input v-model="formSecond.applicantIdnumber" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="申报对象名称">
              <el-input v-model="formSecond.applicantName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="联系电话">
              <el-input v-model="formSecond.mobile" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="姓名">
              <el-input v-model="formSecond.name" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="证件类型">
              <el-select v-model="formSecond.idCardType" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="证件号码">
              <el-input v-model="formSecond.idCardNumber" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="缴存银行卡号">
              <el-input v-model="formSecond.bankAccount" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="公积金缴存银行">
              <el-select v-model="formSecond.bankName" placeholder="请选择" style="width: 100%"> </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="公积金缴存银行名称">
              <el-input v-model="formSecond.bankName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="单位名称">
              <el-input v-model="formSecond.companyName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="单位统一社会信用代码">
              <el-input v-model="formSecond.socialCreditCode" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="户籍所在地">
              <el-select v-model="formSecond.householdAreaCode" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in AREA_CODE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="退休标识">
              <el-select v-model="formSecond.isRetire" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in IS_RETIRE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="主管单位名称">
              <el-input v-model="formSecond.companyName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="主管单位统一社会信用代码">
              <el-input v-model="formSecond.socialCreditCode" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="人员类别">
              <el-select v-model="formSecond.personalStatus" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PERSONNEL_CATEGORY" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="人事档案保管机构名称">
              <el-input v-model="formSecond.personnelFileOrg" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="人事档案保管机构联系电话">
              <el-input v-model="formSecond.personnelFileOrgTel" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="人员类型">
              <el-select v-model="formSecond.personType" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PERSONNEL_TYPE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="是否独生子女父母">
              <el-input v-model="formSecond.isOnleyChild" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="退休时间">
              <el-input v-model="formSecond.Txsj" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="创建时间">
              <el-input v-model="formSecond.createtime" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!-- <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
    </el-form>
    <div class="form-tip">反馈信息</div>
    <el-form :model="formSecondback" ref="myFormfrist" label-width="120px" size="mini" class="demo-form-inline">
      <!-- <el-row :gutter="20">  -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="处理结果">
              <el-select v-model="formSecondback.cljg" clearable placeholder="请选择" style="width: 100%">
                <el-option label="成功" value="success"></el-option>
                <el-option label="失败" value="fail"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="失败原因" v-if="formSecondback.cljg === 'fail'">
              <el-input v-model="formSecondback.sjyy" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="业务序号" v-if="formSecondback.cljg === 'success'">
              <el-input v-model="formSecondback.busiid" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="单位账号" v-if="formSecondback.cljg === 'success'">
              <el-input v-model="formSecondback.unitaccnum" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="办理日期" v-if="formSecondback.cljg === 'success'">
              <el-input v-model="formSecondback.date" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="提取本金" v-if="formSecondback.cljg === 'success'">
              <el-input
                v-model="formSecondback.withdrawalPrincipal"
                placeholder="请输入"
                class="uniform-width"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="提取利息" v-if="formSecondback.cljg === 'success'">
              <el-input
                v-model="formSecondback.withdrawalInterest"
                placeholder="请输入"
                class="uniform-width"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="咨询电话" v-if="formSecondback.cljg === 'success'">
              <el-input v-model="formSecondback.reviewOrgTel" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="经办人账号" v-if="formSecondback.cljg === 'success'">
              <el-input v-model="formSecondback.jbr" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="经办人姓名" v-if="formSecondback.cljg === 'success'">
              <el-input v-model="formSecondback.jbrxm" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="经办人证件号码" v-if="formSecondback.cljg === 'success'">
              <el-input v-model="formSecondback.jbrsfzh" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
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
      dialogFormVisible_2: false, //第二个浏览弹框
      //个人退休浏览-申报信息表单
      formSecond: {
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
      //个人退休浏览-反馈信息表单
      formSecondback: {
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
      }
    }
  },
  mounted() {},
  methods: {
    // 显示弹窗
    showBrowseDialog(row) {
      this.dialogFormVisible_2 = true
      // 清空数据
      this.formSecond = {
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
      this.formSecondback = {
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
            // 基本信息
            let dataInfo = res.data.zwbjzdxtbjData
            this.handleFormatBaseInfo(JSON.parse(dataInfo.zwqjsj))
            // 文件数据
            this.tableDataFrist = res.data.zwbjzdxtbjFileList
            // 反馈信息
            this.formSecondback = dataInfo.fksj ? JSON.parse(dataInfo.fksj) : this.formSecondback
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
      this.formSecond = originData
      //  翻译字段
      this.formSecond.idCardType = this.translateDict(DOCUMENT_TYPE, this.formSecond.idCardType)
      this.formSecond.personalStatus = this.translateDict(PERSONNEL_CATEGORY, this.formSecond.personalStatus)
      this.formSecond.personType = this.translateDict(PERSONNEL_TYPE, this.formSecond.personType)
      this.formSecond.householdType = this.translateDict(NTR_F_HSHLD_RGSTRTN, this.formSecond.householdType)
      this.formSecond.bankName = this.translateDict(DEPOSIT_INTO_BANK, this.formSecond.bankName)
      this.formSecond.householdAreaCode = this.translateDict(AREA_CODE, this.formSecond.householdAreaCode)
      this.formSecond.addressAreaCode = this.translateDict(AREA_CODE, this.formSecond.addressAreaCode)
      this.formSecond.areaCode = this.translateDict(AREA_CODE, this.formSecond.areaCode)
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
