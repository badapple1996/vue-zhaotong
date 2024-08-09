<template>  
  <el-form :model="form" ref="form" label-width="120px" class="form-container">  
    <el-row :gutter="20" type="flex" justify="start" align="middle">  
      <!-- 假设你有多个输入框，我们先以9个为例，每行3个 -->  
      <el-col :span="8" v-for="(input, index) in formInputs" :key="index" :class="{'date-picker-col': index === 6}">  
        <el-form-item :label="`字段${index + 1}`">  
          <!-- 如果是第三行的第一个（即索引为6的），则显示DatePicker -->  
          <el-date-picker  
            v-if="index === 6"  
            v-model="form.date"  
            type="date"  
            placeholder="选择日期"  
            style="width: 100%;">  
          </el-date-picker>  
          <el-input  
            v-else  
            v-model="form[input]"  
            autocomplete="off"  
            style="width: 100%;">  
          </el-input>  
        </el-form-item>  
      </el-col>  
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
        input6: '',  
        input7: '',  
        input8: '',  
        // 如果需要更多输入，可以继续添加  
      },  
      // 假设你事先知道所有输入项的键名  
      formInputs: ['input1', 'input2', 'input3', 'input4', 'input5', 'input6', 'input7', 'input8'],  
    };  
  },  
  // 其他选项和方法...  
};  
</script>  
  
<style scoped>  
/* 可选：为DatePicker所在的列添加一些样式，如果需要的话 */  
/* .date-picker-col {   */
  /* 这里可以根据需要添加CSS样式，但通常Element UI的栅格系统已经足够处理布局 */  
/* }   */
  
/* 为了确保输入框在不同屏幕尺寸下都能保持整齐，  
   Element UI的栅格系统会自动调整。但如果你需要进一步的自定义，  
   可以在这里添加媒体查询来适应不同的屏幕尺寸。 */  
</style>