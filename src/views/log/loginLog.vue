<template>
  <div style="padding: 20px;">
    <div class="block">
      <el-form :model="logForm" class="demo-form-inline" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input v-model="logForm.username" placeholder="名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间">
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
        prop="create_at"
        :formatter="toLocalDate"
      />
      <el-table-column
        label="姓名"
        prop="username"
      />
      <el-table-column
        label="电话"
        prop="tel"
      />
      <el-table-column
        label="email"
        prop="email"
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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      search: '',
      currentPage: 1,
      total: 0,
      loading: true,
      pageSize: 10,
      logForm: {
        username: '',
        time: ''
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
        this.loading = false
        this.tableData = res.data.data.user
        this.total = res.data.data.total
      })
    },
    toLocalDate(row, column, cellValue) {
      return dateFtt('yyyy-MM-dd hh:mm:ss', new Date(cellValue))
    },
    onQuery() {
      console.log(this.logForm)
      this.getUserList()
    }
  }
}
</script>

<style scoped>

</style>
