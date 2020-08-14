<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" @opened="dialogOpen">
    <el-form ref="userSettingForm" v-loading="loading" :model="form" :rules="rules">
      <el-form-item label="用户名称" :label-width="formLabelWidth" prop="nickname">
        <el-input v-model="form.nickname" type="text" name="nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
        <el-input v-model="form.tel" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.gender" placeholder="性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="出生年月" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择日期"
        />
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
    userName: { type: String, default: '' },
    dialogTitle: { type: String, default: '修改用户信息' }
  },
  data() {
    /** 判断是否是手机号**/
    function isPhoneNumber(rule, value, callback) {
      var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/
      if (reg) {
        callback()
      } else {
        callback(new Error('请输入正确手机号码'))
      }
    }

    return {
      visible: false,
      loading: true,
      form: {
        nickname: '',
        tel: '',
        email: '',
        gender: '',
        birthday: ''
      },
      formLabelWidth: '120px',
      rules: {
        nickname: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        tel: [
          { validator: isPhoneNumber, trigger: 'blur', message: '请输入正确的手机号' }
        ],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
      },
      username: ''
    }
  },
  computed: {},

  methods: {
    dialogOpen() {
    },
    cancel() {
      this.visible = false
    },
    sure() {
      // 修改用户信息提交
      this.$refs.userSettingForm.validate((valid) => {
        if (valid) {
          this.axios.post('server/user/info', { ...(this.form), username: this.username }).then(res => {
            this.$emit('sure', { type: 'sure', res: 0, message: '更新成功' })
            this.visible = false
          })
        } else {
          return false
        }
      })
    },
    show(username) {
      this.visible = true
      this.username = username
      this.loading = true
      this.$nextTick(() => {
        this.$refs.userSettingForm.resetFields()
        this.axios.get('server/user/findUser?username=' + username).then(res => {
          this.loading = false
          if (res.code !== 1) {
            const { nickname, tel, email, gender, birthday } = res.data.data
            Object.assign(this.form, { nickname, tel, email, gender, birthday })
            console.log(this.form)
          } else {
            this.$message('接口错误')
          }
        })
      })
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
