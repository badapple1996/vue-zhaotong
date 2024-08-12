<template>

    <!-- Form -->
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="收货地址" :visible.sync="dialogVisible">
    <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
    </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
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
        formLabelWidth: '120px'
      };
    },
    props: ['visible'],  
    methods: {  
        confirm() {  
        // 处理确认逻辑  
        this.$emit('update:visible', false); // 如果不使用.sync，则需要这样手动触发事件  
        }  
    }  
  };
</script>
