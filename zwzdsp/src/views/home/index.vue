<template>
  <div class="container">
    <el-header>
      <div>
        <h1 class="header-h1">政务数据直达系统</h1>
      </div>
    </el-header>
    <!-- <el-form :inline="true" :model="formInline" :label-position="labelPosition" label-width="80px" size="mini" class="demo-form-inline"> -->
    <el-form :model="formInline" size="mini" label-width="120px" ref="myForm" class="demo-form-inline">
      <!-- <el-row :gutter="20">  -->
        <div>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="申报业务类型">
              <el-select v-model="formInline.applytype" clearable placeholder="请选择" style="width: 100%">
                <el-option value="job" label="个人就业创业"></el-option>
                <el-option value="retire" label="退休一件事"></el-option>
                <el-option value="bankruptcy" label="企业破产一件事"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="申报事件ID">
              <el-input v-model="formInline.id" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="办件状态">
              <el-select v-model="formInline.status" clearable multiple placeholder="请选择" class="uniform-width">
                <el-option value="1" label="接收成功"></el-option>
                <el-option value="2" label="接收失败"></el-option>
                <el-option value="3" label="反馈成功"></el-option>
                <el-option value="4" label="反馈失败"></el-option>
                <el-option value="5" label="外呼成功"></el-option>
                <el-option value="6" label="外呼失败"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="客户名称">
              <el-input v-model="formInline.khmc" placeholder="请输入" class="uniform-width"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="证件类型">
              <el-select v-model="formInline.zjlx" clearable multiple placeholder="请选择" style="width: 100%">
                <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="证件号码">
              <el-input v-model="formInline.zjhm" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="申请日期">
              <el-date-picker
                style="width: 100%"
                format="yyyy-MM-dd"  
                value-format="yyyy-MM-dd"
                v-model="formInline.sqrq"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="经办人">
              <el-input v-model="formInline.jbr" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="业务序号">
              <el-input v-model="formInline.busiid" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </div>
      <el-form-item class="buttonHome">
        <el-button type="primary"  @click="query">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" borderstyle="width: 100%"  size="small" stripe border>
      
      <el-table-column label="序号">
        <template slot-scope="scope">  
        <!-- 计算并显示序号 -->  
        {{ (currentPage - 1) * pageSize + scope.$index + 1 + globalIndexOffset }}  
      </template>   
      </el-table-column>
      <el-table-column prop="id" label="申报事件ID" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="applytype" label="申报业务类型" width="150">
        <template slot-scope="scope">  
          <span>{{ idMap[scope.row.applytype] || '' }}</span>  
        </template>   
      </el-table-column>
      <el-table-column prop="khmc" label="客户名称" width="150"> </el-table-column>
      <el-table-column prop="zjlx" label="证件类型" width="150">
        <template slot-scope="scope">  
          <span>{{ zjlx[scope.row.zjlx] || '' }}</span>  
        </template>   
      </el-table-column>
      <el-table-column prop="zjhm" label="证件号码" width="150" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="status" label="办件状态" width="150">
        <template slot-scope="scope"> 
          <span>{{ statusMap[scope.row.status] || '' }}</span>  
        </template> 
      </el-table-column>
      <el-table-column prop="promiseDay" label="承诺办件工作日" width="150"> </el-table-column>
      <el-table-column prop="sqrq" label="申请日期" width="150"> </el-table-column>
      <el-table-column prop="cjsj" label="办结申请时间" width="150"> </el-table-column>
      <el-table-column prop="fkrq" label="反馈日期" width="150"> </el-table-column>
      <el-table-column prop="jbr" label="经办人" width="150"> </el-table-column>
      <el-table-column prop="projectType" label="办件类型" width="150">
        <template slot-scope="scope">  
          <span>{{ bjlx[scope.row.projectType] || '' }}</span>  
        </template> 
      </el-table-column>
      <el-table-column prop="busiid" label="业务序号" width="150"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="browse(scope.row)" type="text" size="small">浏览</el-button>
          <el-button
            @click="feedback(scope.row)"
            type="text"
            size="small"
            :disabled="
             scope.row.status === '2' ||  scope.row.status === '3' || scope.row.status === '4' || scope.row.status === '5' || scope.row.status === '6'
            "
            >反馈</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

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
                <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="性别">
              <el-select v-model="formFrist.gender" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in GENDER" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="民族">
              <el-select v-model="formFrist.nation" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in NATION" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="婚姻状况">
              <el-select v-model="formFrist.maritalStatus" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in MARITAL_STATUS" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="户口性质">
              <el-select v-model="formFrist.householdType" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in NTR_F_HSHLD_RGSTRTN" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                <el-option v-for="item in PERSONNEL_CATEGORY" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                <el-option v-for="item in PAYMENT_METHOD" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                <el-option v-for="item in EDUCATION" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                <el-option v-for="item in AREA_CODE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
        </el-row>
        <!-- <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
      </el-form>
      <template  v-if = "showBack">
        <div>
        <div class="form-tip">反馈信息</div>
      <el-form :model="formFristback"   ref="myFormfrist" label-width="120px" size="mini" class="demo-form-inline">
        <!-- <el-row :gutter="20">  -->
        <el-row>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="处理结果">
                <el-select v-model="formFristback.cljg" clearable placeholder="请选择" style="width: 100%">
                  <el-option label="成功" value="success"></el-option>
                  <el-option label="失败" value="fail"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="失败原因" v-if="formFristback.cljg === 'fail'">
                <el-input v-model="formFristback.sjyy" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="业务序号" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.busiid" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="单位账号" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.unitaccnum" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="办理日期" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.TranDate" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="个人账号" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.accnum" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="手机号码" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.relphone" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="扣款账户名称" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.accname" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="每月约定扣款日" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.day" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="月缴存额" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.monpaysum" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="所属银行" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.swtyhdm" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="账户名称" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.accnumname" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="银行账号" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.bankaccnum" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办人账号" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.jbr" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办人姓名" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.jbrxm" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办人证件号码" v-if="formFristback.cljg === 'success'">
                <el-input v-model="formFristback.jbrzjhm" placeholder="请输入" class="uniform-width"></el-input>
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
        <el-table-column label="序号" type="index" width="200"> </el-table-column>
        <el-table-column prop="wjlx" label="文件类型" width="200">
          <template slot-scope="scope"> 
          <span>{{ wjlx[scope.row.wjlx] || '' }}</span>  
        </template>
        </el-table-column>
        <el-table-column prop="wjmc" label="文件名称" width="200"> </el-table-column>
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

    <!-- //第2个浏览弹框 -->
    <el-dialog
      title="个人退休一件事浏览"
      width="80%"
      top="10vh"
      :visible.sync="dialogFormVisible_2"
      class="dialog-frist"
    >
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
              <el-select v-model="formFrist.idCardType" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                <el-select v-model="formSecond.bankName" placeholder="请选择" style="width: 100%">
                  
                </el-select>
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
                  <el-option v-for="item in AREA_CODE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="退休标识">
                <el-select v-model="formSecond.isRetire" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in IS_RETIRE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                  <el-option v-for="item in PERSONNEL_CATEGORY" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                <el-input
                  v-model="formSecond.personnelFileOrgTel"
                  placeholder="请输入"
                  class="uniform-width"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="人员类型">
                <el-select v-model="formSecond.personType" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in PERSONNEL_TYPE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                <el-input v-model="formSecondback.withdrawalPrincipal" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="提取利息" v-if="formSecondback.cljg === 'success'">
                <el-input v-model="formSecondback.withdrawalInterest" placeholder="请输入" class="uniform-width"></el-input>
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
        <el-table-column prop="wjmc" label="文件名称" width="200"> </el-table-column>
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
    <!-- //第3个浏览弹框-企业破产 -->
    <el-dialog
      title="企业破产核查浏览"
      width="80%"
      top="10vh"
      :visible.sync="dialogFormVisible_4"
      class="dialog-frist"
    >
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
        <el-table-column prop="wjmc" label="文件名称" width="200"> </el-table-column>
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

    <!-- 第一个反馈弹框 -->
    <el-dialog
      title="个人就业创业一件事反馈"
      width="80%"
      top="10vh"
      :visible.sync="dialogFormVisible_1"
      class="dialog-frist"
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
                <el-input v-model="formSecond.applicantIdnumber" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="申报对象名称">
                <el-input v-model="formSecond.applicantName" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="姓名">
                <el-input v-model="formSecond.name" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="证件类型">
              <el-select v-model="formSecond.idCardType" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="性别">
              <el-select v-model="formSecond.gender" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in GENDER" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="民族">
              <el-select v-model="formSecond.nation" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in NATION" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="婚姻状况">
              <el-select v-model="formSecond.maritalStatus" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in MARITAL_STATUS" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="户口性质">
              <el-select v-model="formSecond.householdType" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in NTR_F_HSHLD_RGSTRTN" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="居住详细住址">
                <el-input v-model="formSecond.address" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="户籍所在地">
                <el-input v-model="formSecond.householdLocation" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="业务类型">
                <el-select v-model="formSecond.isAccountOpen" placeholder="请选择" style="width: 100%">
                  <el-option label="个人开户、个人启封" value="isAccountOpen"></el-option>
                  <el-option label="个人账户启封" value="isAccountUnsealing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="职业">
              <el-select v-model="formSecond.profession" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PERSONNEL_CATEGORY" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="缴存银行账户">
                <el-input v-model="formSecond.bankAccount" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="缴款方式">
              <el-select v-model="formSecond.payMethod" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in PAYMENT_METHOD" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="月缴存额">
                <el-input v-model="formSecond.monthlyAmount" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="缴存基数">
                <el-input v-model="formSecond.depositBase" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="学历">
              <el-select v-model="formSecond.education" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in EDUCATION" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="邮政编码">
                <el-input v-model="formSecond.postalCode" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="固定电话号码">
                <el-input v-model="formSecond.telephone" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办机构所在地">
              <el-select v-model="formSecond.areaCode" clearable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in AREA_CODE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="form-tip">反馈信息</div>
      <el-form :model="formThirdback" ref="myFormfrist" label-width="120px" size="mini" class="demo-form-inline">
        <!-- <el-row :gutter="20">  -->
        <el-row>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="处理结果">
                <el-select v-model="formThirdback.cljg" clearable placeholder="请选择" style="width: 100%">
                  <el-option label="成功" value="success"></el-option>
                  <el-option label="失败" value="fail"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="失败原因" v-if="formThirdback.cljg === 'fail'">
                <el-input v-model="formThirdback.sjyy" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="业务序号" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.busiid" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="单位账号" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.unitaccnum" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="办理日期" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.TranDate" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="个人账号" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.accnum" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="手机号码" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.relphone" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="扣款账户名称" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.accname" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="每月约定扣款日" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.day" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="月缴存额" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.monpaysum" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="所属银行" v-if="formThirdback.cljg === 'success'">
                <el-select v-model="formThirdback.swtyhdm" clearable placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in DEPOSIT_INTO_BANK" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="账户名称" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.accnumname" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办人账号" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.jbr" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办人姓名" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.jbrxm" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办人证件号码" v-if="formThirdback.cljg === 'success'">
                <el-input v-model="formThirdback.jbrzjhm" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">反馈提交</el-button>
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
        <el-table-column prop="wjmc" label="文件名称" width="200"> </el-table-column>
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

    <!-- 第二个反馈弹框 -->
    <el-dialog
      title="个人退休一件事反馈"
      width="80%"
      top="10vh"
      :visible.sync="dialogFormVisible_3"
      class="dialog-frist"
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
                <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                <el-select v-model="formFourth.bankName" placeholder="请选择" style="width: 100%">
                  
                </el-select>
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
                  <el-option v-for="item in AREA_CODE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="退休标识">
                <el-select v-model="formFourth.isRetire" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in IS_RETIRE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                  <el-option v-for="item in PERSONNEL_CATEGORY" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                <el-input
                  v-model="formFourth.personnelFileOrgTel"
                  placeholder="请输入"
                  class="uniform-width"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="人员类型">
                <el-select v-model="formFourth.personType" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in PERSONNEL_TYPE" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
      <el-form :model="formFourthback" ref="myFormfrist" label-width="120px" size="mini" class="demo-form-inline">
        <!-- <el-row :gutter="20">  -->
        <el-row>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="处理结果">
                <el-select v-model="formFourthback.cljg" clearable placeholder="请选择" style="width: 100%">
                  <el-option label="成功" value="success"></el-option>
                  <el-option label="失败" value="fail"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="失败原因" v-if="formFourthback.cljg === 'fail'">
                <el-input v-model="formFourthback.sjyy" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="业务序号" v-if="formFourthback.cljg === 'success'">
                <el-input v-model="formFourthback.busiid" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="单位账号" v-if="formFourthback.cljg === 'success'">
                <el-input v-model="formFourthback.unitaccnum" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="办理日期" v-if="formFourthback.cljg === 'success'">
                <el-input v-model="formFourthback.date" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="提取本金" v-if="formFourthback.cljg === 'success'">
                <el-input v-model="formFourthback.withdrawalPrincipal" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="提取利息" v-if="formFourthback.cljg === 'success'">
                <el-input v-model="formFourthback.withdrawalInterest" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="咨询电话" v-if="formFourthback.cljg === 'success'">
                <el-input v-model="formFourthback.reviewOrgTel" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办人账号" v-if="formFourthback.cljg === 'success'">
                <el-input v-model="formFourthback.jbr" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办人姓名" v-if="formFourthback.cljg === 'success'">
                <el-input v-model="formFourthback.jbrxm" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="经办人证件号码" v-if="formFourthback.cljg === 'success'">
                <el-input v-model="formFourthback.jbrsfzh" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">反馈提交</el-button>
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
        <el-table-column prop="wjmc" label="文件名称" width="200"> </el-table-column>
        <el-table-column prop="cjsj" label="创建时间" width="200"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="downloadFile(scope.row)" type="text" size="small">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 第三个反馈弹框 企业破产-->
    <el-dialog
      title="企业破产核查反馈"
      width="80%"
      top="10vh"
      :visible.sync="dialogFormVisible_5"
      class="dialog-frist"
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
              <el-form-item label="申报对象证件号码">
                <el-input v-model="formSix.applicantIdnumber" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="申报对象名称">
                <el-input v-model="formSix.applicantName" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="联系电话">
                <el-input v-model="formSix.mobile" placeholder="请输入" class="uniform-width"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="form-tip">反馈信息</div>
      <el-form :model="formSixback" ref="myFormfrist" label-width="120px" size="mini" class="demo-form-inline">
        <!-- <el-row :gutter="20">  -->
        <el-row>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="处理结果">
                <el-select v-model="formSixback.cljg" clearable placeholder="请选择" style="width: 100%">
                  <el-option label="成功" value="success"></el-option>
                  <el-option label="失败" value="fail"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item label="失败原因" v-if="formSixback.cljg === 'fail'">
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
          <el-button type="primary" @click="onSubmit">反馈提交</el-button>
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
        <el-table-column prop="wjmc" label="文件名称" width="200"> </el-table-column>
        <el-table-column prop="cjsj" label="创建时间" width="200"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="downloadFile(scope.row)" type="text" size="small">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
  <!-- <FristDialog :visible.sync="dialogVisible"></FristDialog> -->
</template>
<script>
import { listSq, listQq, getSq, listOb } from '@/api/sq'
// 导入JSON文件
import bank from '@/data/bank.json'
import * as constants from '@/data/constants.js';  
import zjlx from '@/data/zjlx.json'
import wjlx from '@/data/wjlx.json'
import bjlx from '@/data/bjlx.json'
import city from '@/data/city.json'
import statusMap from '@/data/statusMap.json'
import idMap from '@/data/idMap.json'

// import FristDialog from './FristDialog.vue'
export default {
  name: 'HomePage',
  components: {
    // 注册子组件，使其可以在模板中使用
    // FristDialog
  },
  data() {
    return {
      zxbh:null,//中心编号
      idCardNumber:null,//id
      fileList: [], // 已选文件列表  
      fileBase64: '', // 存储文件的Base64编码  
      fileName: '', // 存储文件名  
      globalIndexOffset:0,
      disabledButton: false, //禁用反馈
      disabledButton: false, //禁用反馈
      // 字典数据对象
      wjlx:wjlx,
      bank: bank,
      DOCUMENT_TYPE: constants.DOCUMENT_TYPE,// 证件类型
      GENDER: constants.GENDER,// 性别
      NATION: constants.NATION,// 民族
      MARITAL_STATUS: constants.MARITAL_STATUS,// 婚姻状态
      NTR_F_HSHLD_RGSTRTN: constants.NTR_F_HSHLD_RGSTRTN,// 户口性质
      DEPOSIT_INTO_BANK: constants.DEPOSIT_INTO_BANK,// 缴存银行
      EDUCATION: constants.EDUCATION,// 学历
      PAYMENT_METHOD: constants.PAYMENT_METHOD,// 缴款方式
      PERSONNEL_TYPE: constants.PERSONNEL_TYPE,// 人员类型
      PERSONNEL_CATEGORY: constants.PERSONNEL_CATEGORY,// 人员类别
      APPLY_TYPE: constants.APPLY_TYPE,// 申请业务类型
      PROCESS_STATUS: constants.PROCESS_STATUS,// 办件状态
      AREA_CODE: constants.AREA_CODE,// 行政区划
      IS_RETIRE: constants.IS_RETIRE,// 退休标识

      zjlx: zjlx,
      // idCardType: zjlx,
      bjlx: bjlx,
      city: city,
      statusMap: statusMap,
      idMap: idMap,

      dialogFormVisible: false, //第一个浏览弹框
      dialogFormVisible_2: false, //第二个浏览弹框
      dialogFormVisible_4: false, //第三个浏览弹框
      dialogFormVisible_1: false, //第一个反馈弹框
      dialogFormVisible_3: false, //第二个反馈弹框
      dialogFormVisible_5: false, //第三个反馈弹框
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      showBack:true,//隐藏反馈信息
      formLabelWidth: '120px',
      dialogVisible: false, //第一个弹框
      labelPosition: 'right',
      value: '',
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的条数
      total: 0, // 总记录数，从后端获取
      // 首页表单
      formInline: {
        sqrq: [this.formatDate(),this.formatDate1()],
        id: null,
        applytype: null,
        khmc: null,
        zjlx: [],
        zjhm: null,
        status: [],
        // ksrq: sqrq[0],
        // jsrq: sqrq[1],
        jbr: null,
        busiid: null
      },
      //个人创业就业浏览-申报信息表单
      formFrist: {
        applicantIdnumber:null,// 申报对象证件号码
        applicantName:null,// 申报对象名称
        name:null,// 姓名
        idCardType:null,// 证件类型
        gender:null,// 性别
        nation:null,//民族 
        maritalStatus:null,// 婚姻状况
        householdType:null,// 户口性质
        address:null,// 居住详细住址
        householdLocation:null,// 户籍所在地
        isAccountOpen:null,// 业务类型 个人开户、个人启封
        isAccountUnsealing:null,// 业务类型 个人账户启封
        profession:null,// 职业
        bankAccount:null,// 缴存银行账户
        payMethod:null,// 缴款方式
        monthlyAmount:null,// 月缴存额
        depositBase:null,// 缴存基数
        education:null,// 学历
        postalCode:null,// 邮政编码
        telephone:null,// 固定电话号码
        areaCode:null,// 经办机构所在地
      },
      //个人创业就业浏览-反馈信息表单
      formFristback: {
        cljg: null,//处理结果
        busiid: null,//业务序号
        sjyy: null,//失败原因
        unitaccnum:null,//单位账号
        TranDate: null,//办理日期
        accnum: null,//个人账号 扣款账户名称 
        relphone: null,//手机号码
        certinum: null,
        accname: null,
        day: null,//每月约定扣款日
        monpaysum: null,//月缴存额
        swtyhdm: null,//所属银行
        accnumname: null,//账户名称
        jbr:null,//经办人账号
        jbrxm:null,//经办人姓名
        jbrsfzh:null,//经办人证件号码
      },
      //个人退休浏览-申报信息表单
      formSecond: {
        applicantIdnumber:null,//申报对象证件号码
        applicantName:null,//申报对象名称
        mobile:null,//联系电话
        name:null,//姓名
        idCardType:null,//证件类型
        idCardNumber:null,//证件号码
        bankAccount:null,//缴存银行卡号
        bankName:null,//公积金缴存银行
        bankName:null,//公积金缴存银行名称
        companyName:null,//单位名称
        socialCreditCode:null,//单位统一社会信用代码
        householdAreaCode:null,//户籍所在地
        isRetire:null,//退休标识
        companyName:null,//主管单位名称
        socialCreditCode:null,//主管单位统一社会信用代码
        personalStatus:null,//人员类别
        personnelFileOrg:null,//人事档案保管机构名称
        personnelFileOrgTel:null,//人事档案保管机构联系电话
        personType:null,//人员类型
        isOnleyChild:null,//是否独生子女父母
        Txsj:null,//退休时间
        createtime:null,//创建时间
      },
      //企业破产核查浏览-申报信息表单
      formFifth: {
        qymc:null,//企业名称
        tyshxydm:null,//统一社会信用代码
        jbrsfzh:null,//经办人身份证号
        jbr_sfzh:null,//经办人身份证号
      },
      //企业破产核查浏览-反馈信息表单
      formFifthback: {
        zxbh:'',
        id:'',
        cljg:'',
        sjyy:'',
      },
      //个人退休浏览-反馈信息表单
      formSecondback: {
        applicantIdnumber:null,//申报对象证件号码
        applicantName:null,//申报对象名称
        mobile:null,//联系电话
        name:null,//姓名
        idCardType:null,//证件类型
        idCardNumber:null,//证件号码
        bankAccount:null,//缴存银行卡号
        bankName:null,//公积金缴存银行
        bankName:null,//公积金缴存银行名称
        companyName:null,//单位名称
        socialCreditCode:null,//单位统一社会信用代码
        householdAreaCode:null,//户籍所在地
        isRetire:null,//退休标识
        companyName:null,//主管单位名称
        socialCreditCode:null,//主管单位统一社会信用代码
        personalStatus:null,//人员类别
        personnelFileOrg:null,//人事档案保管机构名称
        personnelFileOrgTel:null,//人事档案保管机构联系电话
        personType:null,//人员类型
        isOnleyChild:null,//是否独生子女父母
        Txsj:null,//退休时间
        createtime:null,//创建时间
      },
      //个人创业就业反馈-申报信息表单
      formThird: {
        applicantIdnumber:null,// 申报对象证件号码
        applicantName:null,// 申报对象名称
        name:null,// 姓名
        idCardType:null,// 证件类型
        gender:null,// 性别
        nation:null,//民族 
        maritalStatus:null,// 婚姻状况
        householdType:null,// 户口性质
        address:null,// 居住详细住址
        householdLocation:null,// 户籍所在地
        isAccountOpen:null,// 业务类型 个人开户、个人启封
        isAccountUnsealing:null,// 业务类型 个人账户启封
        profession:null,// 职业
        bankAccount:null,// 缴存银行账户
        payMethod:null,// 缴款方式
        monthlyAmount:null,// 月缴存额
        depositBase:null,// 缴存基数
        education:null,// 学历
        postalCode:null,// 邮政编码
        telephone:null,// 固定电话号码
        areaCode:null,// 经办机构所在地
      },
      //个人创业就业反馈-反馈信息表单
      formThirdback: {
        cljg: null,//处理结果
        busiid: null,//业务序号
        sjyy: null,//失败原因
        TranDate: null,//办理日期
        accnum: null,//个人账号 扣款账户名称 
        relphone: null,//手机号码
        certinum: null,
        accname: null,
        day: null,//每月约定扣款日
        monpaysum: null,//月缴存额
        swtyhdm: null,//所属银行
        accnumname: null,//账户名称
        jbr:null,//经办人账号
        jbrxm:null,//经办人姓名
        jbrsfzh:null,//经办人证件号码
      },
      //个人退休反馈-申报信息表单
      formFourth: {
        applicantIdnumber:null,//申报对象证件号码
        applicantName:null,//申报对象名称
        mobile:null,//联系电话
        name:null,//姓名
        idCardType:null,//证件类型
        idCardNumber:null,//证件号码
        bankAccount:null,//缴存银行卡号
        bankName:null,//公积金缴存银行
        bankName:null,//公积金缴存银行名称
        companyName:null,//单位名称
        socialCreditCode:null,//单位统一社会信用代码
        householdAreaCode:null,//户籍所在地
        isRetire:null,//退休标识
        companyName:null,//主管单位名称
        socialCreditCode:null,//主管单位统一社会信用代码
        personalStatus:null,//人员类别
        personnelFileOrg:null,//人事档案保管机构名称
        personnelFileOrgTel:null,//人事档案保管机构联系电话
        personType:null,//人员类型
        isOnleyChild:null,//是否独生子女父母
        Txsj:null,//退休时间
        createtime:null,//创建时间
      },
      //个人退休反馈-反馈信息表单
      formFourthback: {
        cljg: null,//处理结果
        busiid: null,//业务序号
        sjyy: null,//失败原因
        TranDate: null,//办理日期
        accnum: null,//个人账号 扣款账户名称 
        relphone: null,//手机号码
        certinum: null,
        accname: null,
        day: null,//每月约定扣款日
        monpaysum: null,//月缴存额
        swtyhdm: null,//所属银行
        accnumname: null,//账户名称
        jbr:null,//经办人账号
        jbrxm:null,//经办人姓名
        jbrsfzh:null,//经办人证件号码

        withdrawalPrincipal:null,//提取本金
        withdrawalInterest:null,//提取利息
        reviewOrgTel:null,//咨询电话
      },
      //企业破产核查-申报信息表单
      formSix: {
        qymc:null,//企业名称
        tyshxydm:null,//统一社会信用代码
        jbrsfzh:null,//经办人身份证号
        jbr_sfzh:null,//经办人身份证号
      },
      //企业破产核查-反馈信息表单
      formSixback: {
        zxbh: '',
        id: '',
        cljg: '',
        busiid: '',
        sjyy: '',
      },
      tableData: [],
      //个人就业创业一件事浏览
      tableDataFrist: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        zxbh: null,
        id: null,
        applytype: null,
        applytypedesc: null,
        khmc: null,
        zjlx: [],
        zjlxdesc: null,
        zjhm: null,
        status: ['1'],
        statusdesc: null,
        sqrq: null,
        cjsj: null,
        fkrq: null,
        fksj: null,
        whrq: null,
        whsj: null,
        jbr: null,
        jbrxm: null,
        jbrzjhm: null,
        busiid: null,
        whsbcs: null
      },
      // 假设的MIME类型映射（实际应用中可能需要更完整的映射）
      mimeTypeMap: {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        pdf: 'application/pdf'
        // ... 其他文件类型
      }
    }
  },
  computed: {  
    // 计算开始时间  
    defaultStartTime() {  
      const now = new Date();  
      now.setMonth(now.getMonth() - 1); // 设置为一个月前  
      console.log(now,'now-----');
      
      return this.formatDate(now);  
    },  
    // 计算结束时间（当前日期）  
    defaultEndTime() {  
      const now = new Date();  
      console.log(now,'now=====');
      return this.formatDate(now);  
    },  
    
  },
  created() {
    // 组件创建时，将计算出的时间赋值给表单模型  
    // this.formInline.sqrq[0] = this.formatDate();  
    // this.formInline.sqrq[1] = this.formatDate1(); 
    this.getList()
  },
  mounted() {
    // this.formInline.sqrq[0] = this.formatDate();  
    // this.formInline.sqrq[1] = this.formatDate1(); 
    // this.init()
  },
  methods: {
     // 格式化日期  
     formatDate() { 
      const date = new Date();  
      date.setMonth(date.getMonth() - 1); // 设置为一个月前  
      const year = date.getFullYear().toString().padStart(4, '0');  
      const month = (date.getMonth() + 1).toString().padStart(2, '0');  
      const day = date.getDate().toString().padStart(2, '0');  
      console.log(year,month,day,'date111111==================');
      return `${year}-${month}-${day}`;  
    },
    formatDate1() { 
      const date = new Date();   
      const year = date.getFullYear().toString().padStart(4, '0');  
      const month = (date.getMonth() + 1).toString().padStart(2, '0');  
      const day = date.getDate().toString().padStart(2, '0');  
      console.log(year,month,day,'date2222==================');
      return `${year}-${month}-${day}`;  
    },
     // 在文件上传前执行（但我们不立即上传，所以这里主要为了显示错误消息）  
    beforeUpload(file) {  
      const isLt2M = file.size / 1024 / 1024 < 2;  
      if (!isLt2M) {  
        this.$message.error('上传文件大小不能超过 2MB!');  
        return false;  
      }  
      // 注意：这里不直接返回false，因为我们想在onChange中处理文件  
      return true; // 或者直接不返回（隐式返回undefined），因为我们已经处理了大小限制  
    },  
  
    // 文件状态改变时（文件被选中）  
    handleChange(file, fileList) {  
      // 清除之前的Base64和文件名（如果有的话）  
      this.fileBase64 = '';  
      this.fileName = '';  
  
      // 检查文件类型  
      if (!file.raw.type.match('image/jpeg|image/png|application/pdf')) {  
        this.$message.error('上传文件只能是 JPG、PNG、PDF 格式!');  
        this.handleRemove()
        return;  
      }  
  
      // 读取文件为Base64  
      const reader = new FileReader();  
      reader.onload = e => {  
        this.fileBase64 = e.target.result;  
        this.fileName = file.raw.name; // 使用file.raw来获取原始的File对象  
        console.log( this.fileName, ' this.fileName==========');
        
      };  
      reader.readAsDataURL(file.raw);  
  
      // 更新fileList（可选，取决于你是否需要在界面上显示文件列表）  
      this.fileList = fileList.slice(-1); // 只保留最新选择的文件  
    },  
  
    // 处理文件移除（可选）  
    handleRemove(file, fileList) {  
      this.fileList = fileList;  
      this.fileBase64 = '';  
      this.fileName = '';  
    },
    // 附件下载
    downloadFile(e) {
      console.log(e,'0000000');
      // 推断MIME类型（这里简单通过文件名后缀）
      const fileExtension = e.wjmc.split('.').pop().toLowerCase()
      const mimeType = this.mimeTypeMap[fileExtension] || 'application/octet-stream' // 默认MIME类型

      // 将base64字符串转换为Blob对象（注意：这里base64已经是纯编码，无需去除前缀）
      const byteCharacters = atob(e.wjsj)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: mimeType })

      // 创建一个指向该blob的URL并下载
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', e.wjmc)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },

    // 下载所有文件的方法（假设你从某个地方获取了files数组）
    downloadAllFiles(files) {
      files.forEach(file => {
        this.downloadFile(file.base64, file.fileName)
      })
    },

    /** 查询初始化 */
    getList() {
      this.loading = true
      listSq(this.queryParams).then(response => {
        if (response.code == '200' && response.rows) {
          this.tableData = response.rows
          this.total = response.total
        } else {
          Message.error('系统错误，请联系管理员！')
        }
      })
    },
    // 查询
    query() {
      console.log('query!')
      let params 
      let status1 = this.formInline.status.join()
      console.log(status1,'办件类型==');
      
      params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ksrq: this.formInline.sqrq ? this.formInline.sqrq[0] : null,
        jsrq: this.formInline.sqrq ? this.formInline.sqrq[1] : null,
        ...this.formInline,
        status:status1 || null
      }
      delete params.sqrq
      console.log(params,'canshu======');
      
      listSq(params).then(response => {
        if (response.code == '200' && response.rows) {
          this.tableData = response.rows
          // this.queryInfo = response.rows
          this.total = response.total
        } else {
          Message.error('系统错误，请联系管理员！')
        }
      })
    },
    // 浏览
    browse(e) {
      console.log(e, 'eeeeeee')
      // if (e.status == '1' | e.status == '2') {
      //   this.showBack =false
      // } else {
      //   this.showBack =true
      // }
      this.showBack = true
      let params ={
        zxbh:e.zxbh,
        id:e.id
      }
      console.log(e,'canshu======');
      listQq(params).then(response => {
        console.log(response,'=============');
        
        if (response.code == '200' && response.data) {
          let bb = JSON.parse(response.data.zwbjzdxtbjData.zwqjsj)
          console.log(bb,'========');
          //个人就业创业一件事浏览-列表
          this.tableDataFrist = response.data.zwbjzdxtbjFileList
          this.fileData = response.data.zwbjzdxtbjFileList.wjsj
          this.fileDataName = response.data.zwbjzdxtbjFileList.wjmc

          console.log(this.tableDataFrist,this.fileDataName, '列表=====');
          
          this.formFrist = 
          { 
              id: bb.id,
              applyType: bb.applyType,
              applicantIdnumber: bb.applicantIdnumber,
              applicantName: bb.applicantName,
              name: bb.name,
              mobile: bb.mobile,
              idCardType: bb.idCardType,
              idCardNumber: bb.idCardNumber,
              gender: bb.gender,
              nation: bb.nation,
              birthday: bb.birthday,
              maritalStatus: bb.maritalStatus,
              householdType: bb.householdType,
              householdLocation: bb.householdLocation,
              address: bb.address,
              householdAreaCode: bb.householdAreaCode,
              addressAreaCode: bb.addressAreaCode,
              isAccountOpen: bb.isAccountOpen,
              isAccountUnsealing: bb.isAccountUnsealing,
              profession: bb.profession,
              bankName: bb.bankName,
              bankAccount: bb.bankAccount,
              payMethod: bb.payMethod,
              monthlyAmount: bb.monthlyAmount,
              paymentDueDate: bb.monthlyAmount,
              depositBase: bb.depositBase,
              depositRatio: bb.depositRatio,
              education: bb.education,
              postalCode: bb.postalCode,
              monthlyIncome: bb.monthlyIncome,
              telephone: bb.telephone,
              areaCode: bb.areaCode,
              createtime: bb.createtime,
              status: bb.status,
              sign: bb.sign,
              attachmentList: bb.attachmentList,
              eventId: bb.eventId,
              attName: bb.attName,
              attType: bb.attType,
              applyPage: bb.applyPage,
              createDate: bb.createDate,
              fileBase64: bb.fileBase64,
              sign: bb.sign
          },
          this.formSecond = 
          {
              id: bb.id,
              applyType: bb.applyType,
              applicantIdnumber: bb.applicantIdnumber,
              applicantName: bb.applicantName,
              name: bb.name,
              mobile: bb.mobile,
              idCardType: bb.idCardType,
              idCardNumber: bb.idCardNumber,
              gender: bb.gender,
              nation: bb.nation,
              birthday: bb.birthday,
              maritalStatus: bb.maritalStatus,
              householdType: bb.householdType,
              householdLocation: bb.householdLocation,
              address: bb.address,
              householdAreaCode: bb.householdAreaCode,
              addressAreaCode: bb.addressAreaCode,
              isAccountOpen: bb.isAccountOpen,
              isAccountUnsealing: bb.isAccountUnsealing,
              profession: bb.profession,
              bankName: bb.bankName,
              bankAccount: bb.bankAccount,
              payMethod: bb.payMethod,
              monthlyAmount: bb.monthlyAmount,
              paymentDueDate: bb.paymentDueDate,
              depositBase: bb.depositBase,
              depositRatio: bb.depositRatio,
              education: bb.education,
              postalCode: bb.postalCode,
              monthlyIncome: bb.monthlyIncome,
              telephone: bb.telephone,
              areaCode: bb.areaCode,
              createtime: bb.createtime,
              status: bb.status,
              sign: bb.sign,
              attachmentList: bb.attachmentList,
              eventId: bb.eventId,
              attName: bb.attName,
              attType: bb.attType,
              applyPage: bb.applyPage,
              createDate: bb.createDate,
              fileBase64: bb.fileBase64,
              sign: bb.sign,
              companyName: bb.companyName,
              socialCreditCode: bb.socialCreditCode,
              isRetire: bb.isRetire,
              personalStatus: bb.personalStatus,
              personnelFileOrg: bb.personnelFileOrg,
              personnelFileOrgTel: bb.personnelFileOrgTel,
              personType: bb.personType,
              isOnleyChild: bb.isOnleyChild,
              Txsj: bb.Txsj,
          },
          this.formFifth = {
            qymc:bb.qymc,
            tyshxydm:bb.tyshxydm,
            jbr_sfzh:bb.jbr_sfzh,
          }  
        } else {
          Message.error('系统错误，请联系管理员！')
        }
      })
      if (e.applytype == 'job') {
        this.dialogFormVisible = true //第一个弹框
      } else if (e.applytype == 'retire') {
        this.dialogFormVisible_2 = true //第二个浏览弹框
      } else {
        this.dialogFormVisible_4 = true //第三个浏览弹框
      }
    },
    // 反馈提交
    onSubmit() {
      // formThirdback:个人创业发聩
      let jsonString_1 = {
        cljg: null,//处理结果
        busiid: null,//业务序号
        sjyy: null,//失败原因
        TranDate: null,//办理日期
        unitaccnum:null,//单位账号
        accnum: null,//个人账号 扣款账户名称 
        relphone: null,//手机号码
        certinum: null,
        accname: null,
        day: null,//每月约定扣款日
        monpaysum: null,//月缴存额
        swtyhdm: null,//所属银行
        accnumname: null,//账户名称
        jbr:null,//经办人账号
        jbrxm:null,//经办人姓名
        jbrsfzh:null,//经办人证件号码

        withdrawalPrincipal:null,//提取本金
        withdrawalInterest:null,//提取利息
        reviewOrgTel:null,//咨询电话
      }
      let jsonstring = JSON.stringify(jsonString_1); 
      let params = {
        // sq表 更新
        sqData:{
        jbr:null,
        jbrxm:null,
        jbrzjhm:null,
        busiid:null,
        fkrq:null,
        fksj:null,
        status:null,
        zxbh:this.zxbh,
        id:this.id,
        },
        //  更新 data
        fbData:{
        zxbh:null,
        id:null,
        fksj:jsonstring
        },
        // file 新增
        fbFile:{
        wjlx:'1',
        wjmc:null,
        wjsj:null,
        zxbh:null,
        id:null,
        cjsj:null,
        }
      }
      listOb(params).then(response => {
        console.log(response,'反馈提交');
        if (response.code == '200' && response.data) {
          Message.success('反馈提交成功！')
        } else {
          Message.error('反馈提交失败！')
        }
      })
    },
    // 反馈 办件状态 为 3-反馈成功 4-反馈失败 5-外呼成功 6-外呼失败' 时，才显示。
    feedback(e) {
      console.log('反馈--', e)
      this.zxbh = e.zxbh
      this.id = e.id
      let params ={
        zxbh:e.zxbh,
        id:e.id
      }
      console.log(e,'canshu======');
      listQq(params).then(response => {
        console.log(response,'=============');
        
        if (response.code == '200' && response.data) {
          let bb = JSON.parse(response.data.zwbjzdxtbjData.zwqjsj)
          console.log(bb,'========');
          //个人就业创业一件事浏览-列表
          this.tableDataFrist = response.data.zwbjzdxtbjFileList
          this.fileData = response.data.zwbjzdxtbjFileList.wjsj
          this.fileDataName = response.data.zwbjzdxtbjFileList.wjmc

          console.log(this.tableDataFrist,this.fileDataName, '列表=====');
          
          this.formSecond = 
          { id: bb.id,
            applyType: bb.applyType,
            applicantIdnumber: bb.applicantIdnumber,
            applicantName: bb.applicantName,
            name: bb.name,
            mobile: bb.mobile,
            idCardType: bb.idCardType,
            idCardNumber: bb.idCardNumber,
            gender: bb.gender,
            nation: bb.nation,
            birthday: bb.birthday,
            maritalStatus: bb.maritalStatus,
            householdType: bb.householdType,
            householdLocation: bb.householdLocation,
            address: bb.address,
            householdAreaCode: bb.householdAreaCode,
            addressAreaCode: bb.addressAreaCode,
            isAccountOpen: bb.isAccountOpen,
            isAccountUnsealing: bb.isAccountUnsealing,
            profession: bb.profession,
            bankName: bb.bankName,
            bankAccount: bb.bankAccount,
            payMethod: bb.payMethod,
            monthlyAmount: bb.monthlyAmount,
            paymentDueDate: bb.monthlyAmount,
            depositBase: bb.depositBase,
            depositRatio: bb.depositRatio,
            education: bb.education,
            postalCode: bb.postalCode,
            monthlyIncome: bb.monthlyIncome,
            telephone: bb.telephone,
            areaCode: bb.areaCode,
            createtime: bb.createtime,
            status: bb.status,
            sign: bb.sign,
            attachmentList: bb.attachmentList,
            eventId: bb.eventId,
            attName: bb.attName,
            attType: bb.attType,
            applyPage: bb.applyPage,
            createDate: bb.createDate,
            fileBase64: bb.fileBase64,
            sign: bb.sign 
          },
          this.formFourth = {
            id: bb.id,
            applyType: bb.applyType,
            applicantIdnumber: bb.applicantIdnumber,
            applicantName: bb.applicantName,
            name: bb.name,
            mobile: bb.mobile,
            idCardType: bb.idCardType,
            idCardNumber: bb.idCardNumber,
            birthday: bb.birthday,
            householdAreaCode: bb.householdAreaCode,
            takeInsuranceAreaCode: bb.takeInsuranceAreaCode,
            companyName: bb.companyName,
            socialCreditCode: bb.socialCreditCode,
            companyNumber: bb.companyNumber,
            personNumber: bb.personNumber,
            personType: bb.personType,
            isOnleyChild: bb.isOnleyChild,
            personnelFileOrg: bb.personnelFileOrg,
            personnelFileOrgTel: bb.personnelFileOrgTel,
            bankName: bb.bankName,
            bankAccount: bb.bankAccount,
            reason: bb.reason,
            areaCode: bb.areaCode,
            createtime: bb.createtime,
            status: bb.status,
            sign: bb.sign,
            attachmentList: bb.attachmentList,
            eventId: bb.eventId,
            attName: bb.attName,
            attType: bb.attType,
            applyPage: bb.applyPage,
            createDate: bb.createDate,
            fileBase64: bb.fileBase64,
            sign: bb.sign,
            Sftx: bb.Sftx,
            Txsj: bb.Txsj,
            isRetire: bb.isRetire,
            personalStatus: bb.personalStatus,
          },
          this.formSix = {
            applicantIdnumber:bb.applicantIdnumber,
            applicantName:bb.applicantName,
            mobile:bb.mobile,
          }
        } else {
          Message.error('系统错误，请联系管理员！')
        }
      })
      if (e.applytype == 'job') {
        this.dialogFormVisible_1 = true
      } else if (e.applytype == 'retire') {
        this.dialogFormVisible_3 = true
      } else {
        this.dialogFormVisible_5 = true //第三个反馈弹框
      }
    },

    // 重置
    reset() {
      this.formInline = {
        sqrq: [this.formatDate(),this.formatDate1()],
        id: null,
        applytype: null,
        khmc: null,
        zjlx: null,
        zjhm: null,
        status: null,
        // ksrq: sqrq[0],
        // jsrq: sqrq[1],
        jbr: null,
        busiid: null
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.query() // 分页大小改变时重新加载数据
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.query() // 当前页码改变时重新加载数据
    }
  }
}
</script>
<style scoped>
.header-h1 {
  margin-top: 1px;
}
.el-header {
  height: 80px;
  background-image: url('../../../static/banner.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #fefefe;
  text-shadow: 0px 1px 0px #c0c0c0, 0px 2px 0px #b0b0b0, 0px 3px 0px #a0a0a0, 0px 4px 0px #909090,
    0px 5px 10px rgba(0, 0, 0, 0.9);

  font-size: large;
  margin-bottom: 10px;
}
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
  margin-top: 20px
}
</style>
