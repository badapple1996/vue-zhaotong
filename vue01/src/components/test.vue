<template>  
  <el-form :model="form" label-width="100px" class="form-container">  
    <el-row :gutter="20">  
      <!-- 第一行 -->  
      <el-col :span="8" v-for="(input, index) in ['input1', 'input2', 'input3']" :key="index">  
        <el-form-item :label="`字段${index + 1}`">  
          <el-input v-model="form[input]" autocomplete="off"></el-input>  
        </el-form-item>  
      </el-col>  
  
      <!-- 第二行（如果需要更多行，可以复制并粘贴下面的代码块） -->  
      <!-- 注意：这里省略了第二行的示例，因为它与第一行完全相同，只是字段名不同 -->  
  
      <!-- 第三行 -->  
      <el-col :span="8">  
        <el-form-item label="选择日期">  
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>  
        </el-form-item>  
      </el-col>  
      <el-col :span="8">  
        <el-form-item label="字段4">  
          <el-input v-model="form.input4" autocomplete="off"></el-input>  
        </el-form-item>  
      </el-col>  
      <el-col :span="8">  
        <el-form-item label="字段5">  
          <el-input v-model="form.input5" autocomplete="off"></el-input>  
        </el-form-item>  
      </el-col>  
  
      <!-- 注意：这里只展示了三行的情况，如果输入项超过这些，你可以继续添加更多的行 -->  
    </el-row>  
  </el-form>  
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
        // 如果需要更多输入，可以继续添加  
      },  
    };  
  },  
  // 其他选项和方法...  
};  
</script>  
  
<style scoped>  
/* 你可以在这里添加一些自定义样式 */  
</style>