<template>
  <div style="padding:20px;">
    <el-upload
      class="avatar-uploader"
      action="/bdApi/FaceDetect"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <el-row v-loading="loading">
      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <span class="lable-left">错误码：</span>
          {{ result.error_code }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <span class="lable-left">错误信息：</span>
          {{ result.error_msg }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <span class="lable-left">日志id：</span>
          {{ result.log_id }}
        </div>
      </el-col>
      <el-col v-if="!result.error_code" :span="24">
        <div class="grid-content bg-purple-dark">
          <span class="lable-left">数字行数：</span>
          {{ result.words_result_num }}
        </div>
      </el-col>
      <template v-if="!result.error_code">
        <el-table :data="result.words_result" style="width: 100%">

          <el-table-column label="文字" prop="words" />
          <el-table-column label="行置信度平均值" prop="probability.average" />

        </el-table>
      </template>
    </el-row>
    <p v-if="result">{{ result }}</p>
  </div>
</template>
<script>
 import qs from 'querystring';

export default {
  name: 'Orc',
  data() {
    return {
        imageUrl: '',
        result: {
          words_result_num: '',
          words_result: [],
          log_id: '',
          error_code: 0,
          error_msg: ''
        },
        loading: false
      };
  },
  methods: {
    /**
     * asdasd assdsada assdadas asdasd
     */
    handleAvatarSuccess(res, file) {
      console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file.raw);
      fileReader.onload = () => {
        this.imageUrl = fileReader.result;
        const data = {
          image: this.imageUrl.replace(/data:image\/(jpeg|png);base64,/, ''),
          detect_language: true, // 是否检测语言，默认不检测
          paragraph: true, // 是否输出段落信息
          probability: true // 是否返回识别结果中每一行的置信度
        };
        // console.log(data);
        this.loading = true;
        this.$store.dispatch('bdToken/getBdToken', 'orc').then(res => {
          // console.log("token", res.token);
          const url = '/bdApiP/ocr/v1/general_basic?access_token=' + res.data.token;
          this.axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url
          }).then(res => {
              // console.log(res);
              this.result = res.data;
              this.loading = false;
            }).catch(err => {
              console.log(err);
              //  a'asa'.slice(0,1);
            });
        });
      };
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(file);
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG PNG格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  /*width: 178px;*/
  /*height: 178px;*/
  max-width: 100%;
  display: block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-col {
  border-radius: 4px;
  margin: 10px 0;
}
</style>
