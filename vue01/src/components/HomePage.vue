<template>
    <div>
        <el-form :inline="true" :model="formInline" :label-position="labelPosition" class="demo-form-inline">
            <el-form-item label="申报业务类型">
            <el-input v-model="formInline.user" placeholder="审批人" label-width="328px"></el-input>
            </el-form-item>
            <el-form-item label="业务申报ID">
                <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
      <el-form-item label="办件状态">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请日期">
        <el-date-picker
            v-model="value"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
        <!-- <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="经办人">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务序号">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button>取消</el-button>
       </el-form-item>
    </el-form>
        <el-table :data="tableData" borderstyle="width: 100%">
            <el-table-column fixed prop="date" label="日期" width="150">
            </el-table-column>
        <el-table-column
        prop="name"
        label="姓名"
        width="120">
        </el-table-column>
        <el-table-column
        prop="province"
        label="省份"
        width="120">
        </el-table-column>
        <el-table-column
        prop="city"
        label="市区"
        width="120">
        </el-table-column>
        <el-table-column
        prop="address"
        label="地址"
        width="300">
        </el-table-column>
        <el-table-column
        prop="zip"
        label="邮编"
        width="120">
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
</template>
  <script>
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
        // 假设你事先知道所有输入项的键名  
        formInputs: ['input1', 'input2', 'input3', 'input4', 'input5', 'input6', 'input7', 'input8'],  
        labelPosition:'right',
        value: '',
        currentPage4: 4,

        formInline: {
          user: "",
          region: "",
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
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
    .input-wrapper {  
      display: flex;  
      flex-wrap: wrap;  
      justify-content: space-between; /* 根据需要调整间距 */  
    }  
      
    .el-form-item {  
      /* 宽度设置为33.333%以确保每行三个 */  
      width: calc(100% / 3 - 20px); /* 减去一些间距，具体值根据实际样式调整 */  
      margin-bottom: 20px; /* 根据需要调整间距 */  
    }  
      
    /* 如果label不需要显示，或者你想自定义label的位置，可以进一步调整 */  
    .el-form-item__label {  
      /* 隐藏label，如果不需要的话 */  
      display: none;  
    }  
    </style>