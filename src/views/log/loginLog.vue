<template>
  <div style="padding: 20px;">
    <div class="block">
      <el-form ref="logForm" :model="logForm" :rules="rules" class="demo-form-inline" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称" prop="username">
              <el-input v-model="logForm.username" placeholder="名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间" prop="time">
              <el-date-picker
                v-model="logForm.time"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              />
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      :border="true"
    >
      <el-table-column
        label="创建时间"
        prop="time"
        :formatter="toLocalDate"
      />
      <el-table-column
        label="姓名"
        prop="username"
      />
      <el-table-column
        label="IP"
        prop="IP"
      />
      <el-table-column
        label="浏览器版本"
        prop="browser"
      />
      <el-table-column
        align="right"
      >
        <template v-slot:header>
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="" style="padding-top: 20px;">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout=" prev, pager, next,sizes, jumper,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import dateFtt from '@/utils/dateFtt'

export default {
  name: 'LoginLog',
  data() {
    return {
      tableData: [],
      search: '',
      currentPage: 1,
      total: 0,
      loading: true,
      pageSize: 10,
      logForm: {
        username: this.$store.getters.name,
        time: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        time: [{ required: true, trigger: 'blur', message: '请选择时间' }]
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    getUserList() {
      this.loading = true
      this.axios({
        method: 'post',
        url: 'server/log/log002',
        data: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          ...this.logForm
        }
      }).then((res) => {
        this.loading = false;
        this.tableData = res.data.data.logData;
        this.total = res.data.data.total;
      })
    },
    toLocalDate(row, column, cellValue) {
      return dateFtt('yyyy-MM-dd hh:mm:ss', new Date(cellValue))
    },
    onQuery() {
      console.log(this.logForm)
      this.$refs.logForm.validate((valid) => {
          if (valid) {
             this.getUserList();
          } else {
              this.$message('请输入正确的格式')
          }
      })
    }
  }
}
</script>

<style scoped>

</style>
