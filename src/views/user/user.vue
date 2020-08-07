<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
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
        align="right"
      >
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete
          </el-button>
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
import dateFtt from '@/utils/dateFtt';
export default {
  name: 'User',
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
      pageSize: 10
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserList();
    },
    getUserList() {
      this.loading = true;
      this.axios({
        method: 'GET',
        url: 'server/user/allUser',
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }).then((res) => {
        this.loading = false;
        this.tableData = res.data.data.user;
        this.total = res.data.data.total;
      });
    },
    toLocalDate(row, column, cellValue, index) {
      return dateFtt('yyyy-MM-dd hh:mm:ss', new Date(cellValue));
    }
  }
};
</script>

<style scoped>

</style>
