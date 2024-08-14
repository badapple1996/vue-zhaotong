<template>
  <div class="container">
      <el-header height="120px">
        <div>
          <h1>政务数据直达系统</h1>
        </div>
      </el-header>
      <!-- <el-form :inline="true" :model="formInline" :label-position="labelPosition" label-width="80px" size="mini" class="demo-form-inline"> -->
        <el-form   :model="formInline"  size="mini" label-width="120px" ref="myForm"  class="demo-form-inline">
        <!-- <el-row :gutter="20">  -->
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="申报业务类型">
                  <el-select v-model="formInline.status" clearable placeholder="请选择" style="width: 100%;" >
                    <el-option  
                      v-for="bank in bank"  
                      :key="bank.value"  
                      :label="bank.label"  
                      :value="bank.value">  
                    </el-option>
                </el-select>
              </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="申报事件ID">
                  <el-input v-model="formInline.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="办件状态">
                  <el-select v-model="formInline.status" placeholder="请选择" class="uniform-width" >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
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
                  <el-select v-model="formInline.zjlx" placeholder="请选择" style="width: 100%;" >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
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
                <el-form-item label="申请日期" >
                  <el-date-picker
                  style="width: 100%;"
                  v-model="formInline.sqrq"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
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
    <el-form-item class="buttonHome">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="reset">重置</el-button>
     </el-form-item>
  </el-form>
      <el-table :data="tableData" borderstyle="width: 100%">
          <el-table-column fixed prop="" label="序号" width="150">
          </el-table-column>
          <el-table-column  prop="id" label="申报事件ID" width="150">
          </el-table-column>
          <el-table-column  prop="applytype" label="申报业务类型" width="150">
          </el-table-column>
          <el-table-column  prop="khmc" label="客户名称" width="150">
          </el-table-column>
          <el-table-column  prop="zjlx" label="证件类型" width="150">
          </el-table-column>
          <el-table-column  prop="zjhm" label="证件号码" width="150">
          </el-table-column>
          <el-table-column  prop="status" label="办件状态" width="150">
          </el-table-column>
          <el-table-column  prop="sqrq" label="申请日期" width="150">
          </el-table-column>
          <el-table-column  prop="cjsj" label="办结申请时间" width="150">
          </el-table-column>
          <el-table-column  prop="fkrq" label="反馈日期" width="150">
          </el-table-column>
          <el-table-column  prop="jbr" label="经办人" width="150">
          </el-table-column>
          <el-table-column  prop="busiid" label="业务序号" width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button @click="browse(scope.row)" type="text" size="small">浏览</el-button>
                <el-button @click="feedback()" type="text" size="small">反馈</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40">
    </el-pagination>

    <!-- //第一个浏览弹框 -->

    <el-dialog title="个人就业创业一件事浏览" width="80%" top="10vh" :visible.sync="dialogFormVisible" class="dialog-frist">
      <div class="form-tip">申报信息</div>
      <el-form   :model="formFrist" ref="myFormfrist" label-width="150px"  class="demo-form-inline">
        <!-- <el-row :gutter="20">  -->
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="申报对象证件号码">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="申报对象名称">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="姓名">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="证件类型">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="性别">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="民族">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="婚姻状况">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="户口性质">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="居住详细住址">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="户籍所在地">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="业务类型">
                  <el-select v-model="formFrist.status" placeholder="请选择" style="width: 100%;" >
                    <el-option label="个人开户、个人启封" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="职业">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="缴存银行账户">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="缴款方式">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="月缴存额">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="缴存基数">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="学历">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="邮政编码">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="固定电话号码">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="经办机构所在地">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
        </el-row>
        <!-- <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
      </el-form> 
      <div class="form-tip">反馈信息</div>
      <el-form   :model="formFrist" ref="myFormfrist" label-width="120px"  class="demo-form-inline">
        <!-- <el-row :gutter="20">  -->
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="处理结果">
                  <el-select v-model="formFrist.status" placeholder="请选择" style="width: 100%;" >
                    <el-option label="成功" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="失败原因">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="单位账号">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="办理日期">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="手机号码">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="扣款账户名称">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="月缴存额">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="所属银行">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="银行账号">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="经办人账号">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="经办人证件号码">
                  <el-input v-model="formFrist.khmc" placeholder="请输入" class="uniform-width"></el-input>
                </el-form-item>
              </div>
            </el-col>
        </el-row>
        <!-- <el-form-item class="dialog-button">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
      </el-form>
      <div class="form-tip">附件列表信息</div>
      <el-table
        :data="tableDataFrist"
        border
        style="width: 100%">
        <el-table-column
          prop="xh"
          label="序号"
          width="300">
        </el-table-column>
        <el-table-column
          prop="wjlx"
          label="文件类型"
          width="300">
        </el-table-column>
        <el-table-column
          prop="wjmc"
          label="文件名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="创建时间"
          width="300">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
          </template>
        </el-table-column>
      </el-table> 
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
  <!-- <FristDialog :visible.sync="dialogVisible"></FristDialog> -->
</template>
<script>
import { listSq, getSq } from '@/api/sq'
// 导入JSON文件  
import bank from '@/data/bank.json';  
import city from '@/data/city.json';   

// import FristDialog from './FristDialog.vue'
export default {
  name: 'HomePage',  
  components: {  
    // 注册子组件，使其可以在模板中使用  
    // FristDialog  
  },  
  data() {
    return {
      // 字典数据对象  
      bank: bank,  
      city: city,  
      
      dialogFormVisible: false,//弹框
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
      formLabelWidth: '120px',
      dialogVisible: false,//第一个弹框 
      labelPosition:'right',
      value: '',
      currentPage4: 4,

      formInline: {
        id: "",
        applytype: "",
        khmc: "",
        zjlx: "",
        zjhm: "",
        status: "",
        sqrq: "",
        jbr: "",
        busiid: "",
      },
      //第一个弹框表单
      formFrist: {
        id: "",
        applytype: "",
        khmc: "",
        zjlx: "",
        zjhm: "",
        status: "",
        sqrq: "",
        jbr: "",
        busiid: "",
      },
      tableData: [{
        id: '2016-05-02',
        applytype: '王小虎',
        khmc: '上海',
        zjlx: '普陀区',
        zjhm: '上海市普陀区金沙江路 1518 弄',
        status: 200333,
        sqrq: 200333,
        cjsj: 200333,
        fkrq: 200333,
        fksj: 200333,
        jbr: 200333,
        busiid: 200333,
      }, {
        id: '2016-05-02',
        applytype: '王小虎',
        khmc: '上海',
        zjlx: '普陀区',
        zjhm: '上海市普陀区金沙江路 1518 弄',
        status: 200333,
        sqrq: 200333,
        cjsj: 200333,
        fkrq: 200333,
        fksj: 200333,
        jbr: 200333,
        busiid: 200333,
      },
       {
        id: '2016-05-02',
        applytype: '王小虎',
        khmc: '上海',
        zjlx: '普陀区',
        zjhm: '上海市普陀区金沙江路 1518 弄',
        status: 200333,
        sqrq: 200333,
        cjsj: 200333,
        fkrq: 200333,
        fksj: 200333,
        jbr: 200333,
        busiid: 200333,
      },
       {
        id: '2016-05-02',
        applytype: '王小虎',
        khmc: '上海',
        zjlx: '普陀区',
        zjhm: '上海市普陀区金沙江路 1518 弄',
        status: 200333,
        sqrq: 200333,
        cjsj: 200333,
        fkrq: 200333,
        fksj: 200333,
        jbr: 200333,
        busiid: 200333,
      }],
      //个人就业创业一件事浏览
      tableDataFrist: [{
        xh: '2016-05-03',
        wjlx: '王小虎',
        wjmc: '上海',
        cjsj: '普陀区',
      }],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 20,
          zxbh: null,
          id: null,
          applytype: null,
          applytypedesc: null,
          khmc: null,
          zjlx: null,
          zjlxdesc: null,
          zjhm: null,
          status: null,
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
    };
  },
  created() {
     this.getList()
  },
  methods: {
      /** 查询政务数据直达系统办件申请信息列表 */
      getList() {
      this.loading = true
      listSq(this.queryParams).then(response => {
        console.log("121212",response)
        this.sqList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 浏览
    browse() {
       this.dialogFormVisible = true//第一个弹框
    },
    // 反馈
    feedback() {

    },
    // 查询
    onSubmit() {
      console.log("submit!");
    },
    // 重置
    reset() {
      this.$refs.myForm.reset();
      // 使用Element UI的resetFields方法重置表单  
    // 这里的ref属性要与el-form上的ref属性值对应  
    this.$refs.myForm.resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
};
</script>
  <style scoped>
  .el-header {
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
    /* 确保父容器有足够的宽度 */  
    width: 100%;  
    position: relative; /* 设置相对定位 */  
    /* 可以在这里添加其他样式，如padding等 */  
  }
  /* 使用绝对定位将Pagination组件定位到右侧 */  
  .container .el-pagination {  
    position: absolute;  
    right: 0; /* 定位到右侧 */  
    bottom: -60px; /* 定位到底部，根据实际需求调整 */  
    /* 如果需要，可以添加margin来避免紧贴边缘 */  
    margin-right: 20px;  
    margin-bottom: 20px;  
  }  
  .container .buttonHome {
      text-align: center;
    }
  /* .input-wrapper {  
    display: flex;  
    flex-wrap: wrap;  
    justify-content: space-between;  
  }  
    
  .el-form-item {  
    
    width: calc(100% / 3 - 10px);  
    margin-bottom: 20px; 
  }  
  
  .el-form-item__label {  
     
    display: none;  
  }   */
  .uniform-width {
    width: 100%;
  }
  .dialog-frist {
    text-align: center;
  }
  /* 定位提示文字到表单的左上方 */  
  .dialog-frist .form-tip {  
    /* position: absolute; 绝对定位   */
    /* top: -20px; 向上偏移20px（根据需要调整）   */
    text-align: left;
    margin-bottom: 20px;
    left: 10px; /* 左偏移量与表单的label-width一致（或根据需要调整） */  
    color: #070707; /* 提示文字颜色 */  
    font-size: 24px; /* 提示文字大小 */  
  } 
  </style>