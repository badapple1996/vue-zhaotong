<template>
  <!-- 第一个反馈弹框 -->
  <el-dialog
    title="个人就业创业一件事反馈"
    width="80%"
    top="10vh"
    :visible.sync="dialogFormVisible_1"
    class="dialog-frist"
    :before-close="handleClose"
  >
    <div class="form-tip">申报信息</div>
    <el-form
      :model="formThird"
      ref="myFormfrist"
      :disabled="true"
      size="mini"
      label-width="150px"
      class="demo-form-inline"
    >
      <!-- <el-row :gutter="20">  -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="申报对象证件号码">
              <el-input v-model="formThird.applicantIdnumber" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="申报对象名称">
              <el-input v-model="formThird.applicantName" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="姓名">
              <el-input v-model="formThird.name" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="证件类型">
              <el-select v-model="formThird.idCardType" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="性别">
              <el-select v-model="formThird.gender" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in GENDER" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="民族">
              <el-select v-model="formThird.nation" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in NATION" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="婚姻状况">
              <el-select v-model="formThird.maritalStatus" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in MARITAL_STATUS" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="户口性质">
              <el-select v-model="formThird.householdType" clearable placeholder="请选择" style="width: 100%">
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
              <el-input v-model="formThird.address" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="户籍所在地">
              <el-input v-model="formThird.householdLocation" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="业务类型">
              <el-select v-model="formThird.isAccountOpen" placeholder="请选择" style="width: 100%">
                <el-option label="个人开户、个人启封" value="isAccountOpen"></el-option>
                <el-option label="个人账户启封" value="isAccountUnsealing"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="职业">
              <el-select v-model="formThird.profession" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PERSONNEL_CATEGORY" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="缴存银行账户">
              <el-input v-model="formThird.bankAccount" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="缴款方式">
              <el-select v-model="formThird.payMethod" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PAYMENT_METHOD" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="月缴存额">
              <el-input v-model="formThird.monthlyAmount" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="缴存基数">
              <el-input v-model="formThird.depositBase" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="学历">
              <el-select v-model="formThird.education" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in EDUCATION" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="邮政编码">
              <el-input v-model="formThird.postalCode" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="固定电话号码">
              <el-input v-model="formThird.telephone" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="经办机构所在地">
              <el-select v-model="formThird.areaCode" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in AREA_CODE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-tip">反馈信息</div>
    <el-form
      :model="formThirdback"
      ref="myFormThirdback"
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
              <el-select v-model="formThirdback.cljg" clearable placeholder="请选择" style="width: 100%">
                <el-option label="成功" value="success"></el-option>
                <el-option label="失败" value="fail"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item
              label="业务序号"
              prop="busiid"
              v-if="formThirdback.cljg === 'success' || formThirdback.cljg === 'fail'"
            >
              <el-input v-model="formThirdback.busiid" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <!-- <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="单位账号" prop="unitaccnum" v-if="formThirdback.cljg === 'success'">
              <el-input v-model="formThirdback.unitaccnum" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="办理日期" prop="TranDate" v-if="formThirdback.cljg === 'success'">
              <el-input v-model="formThirdback.TranDate" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="个人账号" prop="accnum" v-if="formThirdback.cljg === 'success'">
              <el-input v-model="formThirdback.accnum" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="手机号码" prop="relphone" v-if="formThirdback.cljg === 'success'">
              <el-input v-model="formThirdback.relphone" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="扣款账户名称" prop="accname" v-if="formThirdback.cljg === 'success'">
              <el-input v-model="formThirdback.accname" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="每月约定扣款日" prop="day" v-if="formThirdback.cljg === 'success'">
              <el-input v-model="formThirdback.day" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="月缴存额" prop="monpaysum" v-if="formThirdback.cljg === 'success'">
              <el-input v-model="formThirdback.monpaysum" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="所属银行" prop="swtyhdm" v-if="formThirdback.cljg === 'success'">
              <el-select v-model="formThirdback.swtyhdm" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in DEPOSIT_INTO_BANK" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="账户名称" prop="accnumname" v-if="formThirdback.cljg === 'success'">
              <el-input v-model="formThirdback.accnumname" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col> -->
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item
              label="经办人账号"
              prop="jbr"
              v-if="formThirdback.cljg === 'success' || formThirdback.cljg === 'fail'"
            >
              <el-input v-model="formThirdback.jbr" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item
              label="经办人姓名"
              prop="jbrxm"
              v-if="formThirdback.cljg === 'success' || formThirdback.cljg === 'fail'"
            >
              <el-input v-model="formThirdback.jbrxm" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item
              label="经办人证件号码"
              prop="jbrzjhm"
              v-if="formThirdback.cljg === 'success' || formThirdback.cljg === 'fail'"
            >
              <el-input v-model="formThirdback.jbrzjhm" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item
              label="承诺办结时间"
              prop="promiseDate"
              v-if="formThirdback.cljg === 'success' || formThirdback.cljg === 'fail'"
            >
              <el-date-picker
                v-model="formThirdback.promiseDate"
                type="datetime"
                class="uniform-width"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="grid-content">
            <el-form-item label="失败原因" prop="sjyy" v-if="formThirdback.cljg === 'fail'">
              <el-input
                v-model="formThirdback.sjyy"
                type="textarea"
                placeholder="请输入"
                class="uniform-width"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          
          <el-upload
            v-if="formThirdback.cljg === 'success' || formThirdback.cljg === 'fail'"
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
      <el-form-item class="dialog-button">
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
      openFeedback: false,
      // 申报信息
      // formThird: {},
      // 反馈信息
      feedbackInfo: {
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
      },
      // 附件列表
      fileList: [],
      //个人创业就业反馈-申报信息表单
      formThird: {
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
      //个人创业就业反馈-反馈信息表单
      formThirdback: {
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
        promiseDate: null //承诺办结时间
      },
      // 校验规则
      rules: {
        busiid: [{ required: true, message: '请输入业务序号', trigger: 'change' }],
        sjyy: [{ required: true, message: '请输入失败原因', trigger: 'change' }],
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
    // 关闭弹框
    handleClose() {
      this.dialogFormVisible_1 = false
    },
    // 切换处理结果
    handleResultChange(value) {
      this.feedbackInfo.cljg = value
      this.files = []
      // 重置表单
      this.$refs.feedbackForm.reset()
      // 重置失败原因
      this.feedbackInfo.sjyy = null
    },

    // 显示弹窗
    showFeedbackDialog(row) {
      this.dialogFormVisible_1 = true
      // 赋值
      this.parentParams = row
      // 清空数据
      this.files = []
      this.formThird = {}
      this.feedbackInfo = {
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
            // data数据
            let dataInfo = res.data.zwbjzdxtbjData
            this.handleFormatBaseInfo(JSON.parse(dataInfo.zwqjsj))
            // 文件数据
            this.tableDataFrist = res.data.zwbjzdxtbjFileList
            // 反馈数据
            // this.feedbackInfo = {}
            this.formThirdback = dataInfo.fksj ? JSON.parse(dataInfo.fksj) : this.formThirdback
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
      this.formThird = originData
      // 格式化金额
      this.formThird.monthlyAmount = this.formatAmount(this.formThird.monthlyAmount)
      this.formThird.monthlyIncome = this.formatAmount(this.formThird.monthlyIncome)
      //  翻译字段
      this.formThird.gender = this.translateDict(GENDER, this.formThird.gender)
      this.formThird.idCardType = this.translateDict(DOCUMENT_TYPE, this.formThird.idCardType)
      this.formThird.nation = this.translateDict(NATION, this.formThird.nation)
      this.formThird.maritalStatus = this.translateDict(MARITAL_STATUS, this.formThird.maritalStatus)
      this.formThird.householdType = this.translateDict(NTR_F_HSHLD_RGSTRTN, this.formThird.householdType)
      this.formThird.bankName = this.translateDict(DEPOSIT_INTO_BANK, this.formThird.bankName)
      this.formThird.education = this.translateDict(EDUCATION, this.formThird.education)
      this.formThird.payMethod = this.translateDict(PAYMENT_METHOD, this.formThird.payMethod)
      this.formThird.householdAreaCode = this.translateDict(AREA_CODE, this.formThird.householdAreaCode)
      this.formThird.addressAreaCode = this.translateDict(AREA_CODE, this.formThird.addressAreaCode)
      this.formThird.areaCode = this.translateDict(AREA_CODE, this.formThird.areaCode)
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
    downloadFile(row) {
      this.downloadBase64File(row.wjsj, row.wjmc)
    },
    // 提交反馈
    // handleSubmitFeedback({ validateResult }) {
    handleSubmitFeedback() {
      this.$refs.myFormThirdback.validate(valid => {
        console.log(valid, '检验---')
        this.handleSubmit()
      })
      // console.log(this.$refs.myFormThirdback.validate(),'检验---');

      // this.$refs.myFormThirdback.validate()
      // if (validateResult === true) {
      //   // this.btnLoading = true
      //   this.feedbackInfo.sjyy = '同意'
      //   this.handleSubmit()
      // } else {
      //   this.$message.error('请检查必填项')
      // }
    },
    // 失败反馈提交
    handleSubmitFailFeedback() {
      // 处理失败原因
      if (this.feedbackInfo.cljg == '4') {
        if (this.feedbackInfo.sjyy == null || this.feedbackInfo.sjyy == '') {
          this.$message.error('请输入失败原因')
          return
        } else {
          // this.btnLoading = true
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
