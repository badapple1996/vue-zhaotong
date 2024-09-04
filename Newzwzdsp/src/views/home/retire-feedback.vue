<template>
  <t-dialog
    :visible.sync="openFeedback"
    attach="body"
    header="个人退休一件事反馈"
    destroyOnClose
    :footer="false"
    width="85%"
    top="5%"
    theme="warning"
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
        <t-descriptions v-if="feedbackInfo.cljg == null" :column="3" bordered colon size="small">
          <t-descriptions-item label="处理结果">
            <t-space>
              <t-radio-group v-model="feedbackInfo.cljg" @onChange="handleResultChange">
                <t-radio value="3">成功</t-radio>
                <t-radio value="4">失败</t-radio>
              </t-radio-group>
            </t-space>
          </t-descriptions-item>
        </t-descriptions>
        <div v-if="feedbackInfo.cljg == '3'">
          <t-form
            :data="feedbackInfo"
            :rules="rules"
            ref="feedbackForm"
            @submit="handleSubmitFeedback"
            class="feedback-form"
          >
            <t-descriptions :column="3" bordered colon size="small">
              <t-descriptions-item label="处理结果">
                <t-space>
                  <t-radio-group v-model="feedbackInfo.cljg" @onChange="handleResultChange">
                    <t-radio value="3">成功</t-radio>
                    <t-radio value="4">失败</t-radio>
                  </t-radio-group>
                </t-space>
              </t-descriptions-item>

              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>业务序号</span>
                </template>
                <t-form-item label="" name="busiid">
                  <t-input v-model="feedbackInfo.busiid" placeholder="请输入业务序号"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <!-- <t-descriptions-item label="单位账号">
                <t-form-item label="" name="unitaccnum">
                  <t-input v-model="feedbackInfo.unitaccnum" placeholder="请输入单位账号"></t-input>
                </t-form-item>
              </t-descriptions-item> -->
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>办理日期</span>
                </template>
                <t-form-item label="" name="date">
                  <t-date-picker
                    style="width: 100%"
                    v-model="feedbackInfo.date"
                    :disable-date="{
                      before: dayjs()
                        .subtract(diffDays + 1, 'day')
                        .format()
                      // after: dayjs().add(3, 'day').format()
                    }"
                    placeholder="请选择办理日期"
                  />
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>提取本金</span>
                </template>
                <t-form-item label="" name="withdrawalPrincipal">
                  <t-input-number
                    placeholder="请输入提取本金"
                    style="width: 100%"
                    theme="normal"
                    v-model="feedbackInfo.withdrawalPrincipal"
                    large-number
                    :format="format"
                  ></t-input-number>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>提取利息</span>
                </template>
                <t-form-item label="" name="withdrawalInterest">
                  <t-input-number
                    style="width: 100%"
                    theme="normal"
                    v-model="feedbackInfo.withdrawalInterest"
                    large-number
                    :format="format"
                    placeholder="请输入提取利息"
                  ></t-input-number>
                </t-form-item>
              </t-descriptions-item>

              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>经办人账号</span>
                </template>
                <t-form-item label="" name="jbr">
                  <t-input v-model="feedbackInfo.jbr" placeholder="请输入经办人账号"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>经办人姓名</span>
                </template>
                <t-form-item label="" name="jbrxm">
                  <t-input v-model="feedbackInfo.jbrxm" placeholder="请输入经办人姓名"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>经办人证件号码</span>
                </template>
                <t-form-item label="" name="jbrzjhm">
                  <t-input v-model="feedbackInfo.jbrzjhm" placeholder="请输入经办人证件号码"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>承诺办结工作日</span>
                </template>
                <t-form-item label="" name="promiseDay">
                  <t-input v-model="feedbackInfo.promiseDay" placeholder="请输入承诺办结工作日"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item :span="1">
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>承诺办结时间</span>
                </template>
                <t-form-item label="" name="promiseDate">
                  <t-date-picker
                    enable-time-picker
                    allow-input
                    style="width: 100%"
                    v-model="feedbackInfo.promiseDate"
                    placeholder="请选择承诺办结时间"
                    clearable
                    :disable-date="{
                      before: dayjs()
                        .subtract(diffDays + 1, 'day')
                        .format()
                    }"
                    :time-picker-props="timePickerProps"
                    @pick="date => (pickDate = dayjs(date).format('YYYY-MM-DD'))"
                  />
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item :span="2">
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>咨询电话</span>
                </template>
                <t-form-item label="" name="reviewOrgTel">
                  <t-input v-model="feedbackInfo.reviewOrgTel" placeholder="请输入咨询电话"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item label="上传文件">
                <!-- <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>上传文件</span>
                </template> -->
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
            <div style="width: 100%; margin-top: 20px; display: flex; justify-content: center">
              <t-space>
                <t-button :loading="btnLoading" type="submit"><GestureUpIcon slot="icon" />提交反馈</t-button>
              </t-space>
            </div>
          </t-form>
        </div>

        <div v-if="feedbackInfo.cljg == '4'">
          <t-form
            :data="feedbackInfo"
            :rules="rules"
            ref="feedbackForm"
            @submit="handleSubmitFeedback"
            class="feedback-form"
          >
            <t-descriptions :column="3" bordered colon size="small" class="feedback-form">
              <t-descriptions-item label="处理结果">
                <t-space>
                  <t-radio-group v-model="feedbackInfo.cljg" @onChange="handleResultChange">
                    <t-radio value="3">成功</t-radio>
                    <t-radio value="4">失败</t-radio>
                  </t-radio-group>
                </t-space>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>业务序号</span>
                </template>
                <t-form-item label="" name="busiid">
                  <t-input v-model="feedbackInfo.busiid" placeholder="请输入业务序号"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>办理日期</span>
                </template>
                <t-form-item label="" name="date">
                  <t-date-picker
                    style="width: 100%"
                    v-model="feedbackInfo.date"
                    :disable-date="{
                      before: dayjs()
                        .subtract(diffDays + 1, 'day')
                        .format()
                      // after: dayjs().add(3, 'day').format()
                    }"
                    placeholder="请选择办理日期"
                  />
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>提取本金</span>
                </template>
                <t-form-item label="" name="withdrawalPrincipal">
                  <t-input-number
                    placeholder="请输入提取本金"
                    style="width: 100%"
                    theme="normal"
                    v-model="feedbackInfo.withdrawalPrincipal"
                    large-number
                    :format="format"
                  ></t-input-number>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>提取利息</span>
                </template>
                <t-form-item label="" name="withdrawalInterest">
                  <t-input-number
                    style="width: 100%"
                    theme="normal"
                    v-model="feedbackInfo.withdrawalInterest"
                    large-number
                    :format="format"
                    placeholder="请输入提取利息"
                  ></t-input-number>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>经办人账号</span>
                </template>
                <t-form-item label="" name="jbr">
                  <t-input v-model="feedbackInfo.jbr" placeholder="请输入经办人账号"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>经办人姓名</span>
                </template>
                <t-form-item label="" name="jbrxm">
                  <t-input v-model="feedbackInfo.jbrxm" placeholder="请输入经办人姓名"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>经办人证件号码</span>
                </template>
                <t-form-item label="" name="jbrzjhm">
                  <t-input v-model="feedbackInfo.jbrzjhm" placeholder="请输入经办人证件号码"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>承诺办结工作日</span>
                </template>
                <t-form-item label="" name="promiseDay">
                  <t-input v-model="feedbackInfo.promiseDay" placeholder="请输入承诺办结工作日"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item>
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>承诺办结时间</span>
                </template>
                <t-form-item label="" name="promiseDate">
                  <t-date-picker
                    enable-time-picker
                    allow-input
                    style="width: 100%"
                    v-model="feedbackInfo.promiseDate"
                    placeholder="请选择承诺办结时间"
                    clearable
                    :disable-date="{
                      before: dayjs()
                        .subtract(diffDays + 1, 'day')
                        .format()
                    }"
                    :time-picker-props="timePickerProps"
                    @pick="date => (pickDate = dayjs(date).format('YYYY-MM-DD'))"
                  />
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item :span="2">
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>咨询电话</span>
                </template>
                <t-form-item label="" name="reviewOrgTel">
                  <t-input v-model="feedbackInfo.reviewOrgTel" placeholder="请输入咨询电话"></t-input>
                </t-form-item>
              </t-descriptions-item>
              <t-descriptions-item :span="3">
                <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>失败原因</span>
                </template>
                <t-textarea v-model="feedbackInfo.sjyy" placeholder="请输入失败原因" />
              </t-descriptions-item>
              <t-descriptions-item label="上传文件">
                <!-- <template v-slot:label>
                  <span style="color: red; margin-right: 2px">*</span> <span>上传文件</span>
                </template> -->
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
            <div style="width: 100%; margin-top: 20px; display: flex; justify-content: center">
              <t-space>
                <t-button :loading="btnLoading" @click="handleSubmitFailFeedback"
                  ><GestureUpIcon slot="icon" />提交反馈</t-button
                >
              </t-space>
            </div>
          </t-form>
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
import { CloudDownloadIcon, GestureUpIcon } from 'tdesign-icons-vue'
import dayjs from 'dayjs'
export default {
  components: { CloudDownloadIcon, GestureUpIcon },
  data() {
    return {
      disSqrq: '', //承诺办结时间
      diffDays: '', //天数
      date: new Date().toLocaleString(),
      files: [],
      // isRequired: 'false',
      //按钮加载
      btnLoading: false,
      btnLoading111: true,

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
        reviewOrgTel: '0871-12329',
        // 经办人账号
        jbr: null,
        // 经办人姓名
        jbrxm: null,
        // 经办人证件号码
        jbrzjhm: null,
        //承诺办结时间
        promiseDate: null,
        //承诺办结工作日
        promiseDay: '3'
      },
      // 附件列表
      fileList: [],
      columns: [
        { colKey: 'serial-number', title: '序号', width: '30', align: 'center' },
        { colKey: 'wjlx', title: '文件类型', width: '100', align: 'center' },
        { colKey: 'wjmc', title: '文件名称', width: '200', align: 'center' },
        { colKey: 'cjsj', title: '创建时间', width: '150', align: 'center' },
        { colKey: 'download', title: '下载', width: '50', align: 'center' }
      ],
      // 校验规则
      rules: {
        busiid: [{ required: true, message: '', type: 'error' }],
        unitaccnum: [{ required: false, message: '', type: 'error' }],
        date: [{ required: true, message: '', type: 'error' }],
        withdrawalPrincipal: [{ required: true, message: '', type: 'error' }],
        withdrawalInterest: [{ required: true, message: '', type: 'error' }],
        reviewOrgTel: [{ required: true, message: '', type: 'error' }],
        jbr: [{ required: true, message: '', type: 'error' }],
        jbrxm: [{ required: true, message: '', type: 'error' }],
        jbrzjhm: [{ required: true, message: '', type: 'error' }],
        promiseDate: [{ required: true, message: '', type: 'error' }],
        promiseDay: [{ required: true, message: '', type: 'error' }]
      },
      pickDate: '',
      dayjs
    }
  },
  computed: {
    timePickerProps() {
      return {
        disableTime: () => {
          if (this.pickDate === dayjs().format('YYYY-MM-DD')) {
            return {
              hour: [0, 1, 2, 3, 4, 5, 6]
            }
          }
          return {}
        }
      }
    }
  },
  mounted() {},
  methods: {
    // 计算并返回两个日期之间的天数差（字符串格式）
    getDaysDifference(dateStr) {
      // dateStr为申请日期
      // 将目标日期字符串转换为Date对象
      const targetDate = new Date(dateStr)
      // 获取当前日期
      const now = new Date()

      // 为了计算天数差，我们只关心年和月日部分，因此将时间部分设置为00:00:00
      targetDate.setHours(0, 0, 0, 0)
      now.setHours(0, 0, 0, 0)

      // 计算时间差（毫秒）
      const diff = now - targetDate

      // 将毫秒转换为天数
      this.diffDays = Math.ceil(diff / (1000 * 3600 * 24))
      console.log(this.diffDays, 'this.diffDays++++++++')

      // 根据天数差返回相应的字符串
      // return `${diffDays}天`;
    },
    // 切换处理结果
    handleResultChange(value) {
      this.feedbackInfo.cljg = value
      this.files = []
      // 重置表单
      this.$refs.feedbackForm.reset()
      // 重置失败原因
      this.feedbackInfo.sjyy = null
      this.feedbackInfo.reviewOrgTel = '0871-12329'
      this.feedbackInfo.promiseDay = '3'
    },
    // 显示弹窗
    showFeedbackDialog(row) {
      this.openFeedback = true
      // 赋值
      this.parentParams = row
      // 清空数据
      this.files = []
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
        reviewOrgTel: '0871-12329',
        // 经办人账号
        jbr: null,
        // 经办人姓名
        jbrxm: null,
        // 经办人证件号码
        jbrzjhm: null,
        // 承诺办结时间
        promiseDate: null,
        // 承诺办结工作日
        promiseDay: '3'
      }
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
              this.disSqrq = res.data.zwbjzdxtbjSq.sqrq
              this.getDaysDifference(this.disSqrq)
              // 反馈数据
              // this.feedbackInfo = {}
              // this.feedbackInfo.reviewOrgTel = '0871-12329'
              // this.feedbackInfo.promiseDay = '3'
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
    format(val) {
      return val.replace(/\d{1,3}(?=(\d{3})+(\.|$))/g, '$&,')
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
          // this.btnLoading = true
          this.handleSubmit()
        }
      }
    },
    // 提交
    async handleSubmit() {
      // 上传文件校验
      let isFiles
      let base64Data
      let base64Data1
      if (this.files.length === 0) {
        // this.$message.error('请上传反馈文件')
        isFiles = {}
        // return
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
      // console.log(isFiles, this.uploadImgToBase64(this.files[0].raw), 'isFiles有文件上传吗')
      // 处理反馈信息
      var feedbackData = {
        sqData: {
          zxbh: this.parentParams.zxbh,
          id: this.parentParams.id,
          jbr: this.feedbackInfo.jbr,
          jbrxm: this.feedbackInfo.jbrxm,
          jbrzjhm: this.feedbackInfo.jbrzjhm,
          promiseDate: this.feedbackInfo.promiseDate,
          promiseDay: this.feedbackInfo.promiseDay,
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
      console.log('2212121', JSON.parse(JSON.stringify(feedbackData)))
      feedbackOp(feedbackData)
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.$message.success('反馈提交成功')
              this.btnLoading = false
              this.btnLoading111 = false
              this.openFeedback = false
              this.$emit('refresh')
            }, 2000)
          } else {
            this.btnLoading = false
            this.btnLoading111 = false
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
      // await setTimeout(() => {
      //   if (this.btnLoading111) {
      //     console.log(this.btnLoading111,'this.btnLoading111_____');

      //     this.btnLoading = false
      //     this.$message.error('系统错误，请稍后重试')
      //   }
      // }, 4000)
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
  // .feedback-form {
  //   .t-descriptions__label::before {
  //     content: '*';
  //     color: red;
  //     margin-right: 2px;
  //   }
  //   .t-descriptions__label:nth-last-child(1)::before {
  //     content: ''; /* 移除内容 */
  //     // display: none; /* 或者直接不显示 */
  //   }
  // }
}
</style>
