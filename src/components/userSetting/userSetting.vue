<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @opened="dialogOpen">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'UserSetting',
  props: {
    dialogFormVisible: Boolean,
    userName: { type: String, default: '' },
    dialogTitle: { type: String, default: '修改用户信息' }
  },
  data() {
    return {
      Visible: this.dialogFormVisible,
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
    }
  },

  methods: {
    dialogOpen() {
      console.log(this.userName)
    },
    cancel() {
      this.$emit('sure', { type: 'cancel' })
    },
    sure() {
      // 修改用户信息
      this.$emit('sure', { type: 'sure', res: 0, message: '更新成功' })
    }
  }
}
</script>

<style scoped>

</style>
