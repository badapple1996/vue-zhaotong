<template>
    <div class="container">
        <!-- <el-form :inline="true" :model="formInline" :label-position="labelPosition" label-width="80px" size="mini" class="demo-form-inline"> -->
        <el-form   :model="formInline"  size="mini" label-width="120px"  class="demo-form-inline">
          <!-- <el-row :gutter="20">  -->
            <el-row>
              <el-col :span="8">
                <div class="grid-content">
                  <el-form-item label="申报业务类型">
                  <el-select v-model="formInline.status" placeholder="请选择" style="width: 100%;" >
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
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
      <el-form-item>
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
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
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
    </div>
</template>
  <script>
// import { from } from 'core-js/core/array';

  export default {
    data() {
      return {
        form: {  
        date: '',  
        input1: '',  
        input2: '',  
        input3: '',  
        input4: '',  
        input5: '',  
        input6: '',  
        input7: '',  
        input8: '',  
        // 如果需要更多输入，可以继续添加  
        },  
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
        }]
      };
    },
    methods: {
      onSubmit() {
        console.log("submit!");
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
    </style>