<template>
  <div>
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
          <span class="lable-left">人脸数目：</span>
          {{ result.result.face_num }}
        </div>
      </el-col>
      <template v-if="!result.error_code">
        <el-table :data="result.result.face_list" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="人脸置信度">
                  <span>{{ props.row.face_probability }}</span>
                </el-form-item>
                <el-form-item label="年龄">
                  <span>{{ props.row.age }}</span>
                </el-form-item>
                <el-form-item label="美丑">
                  <span>{{ props.row.beauty }}</span>
                </el-form-item>
                <el-form-item label="表情">
                  <span>{{ props.row.expression.type }}</span>
                </el-form-item>
                <el-form-item label="表情可信度">
                  <span>{{ props.row.expression.probability }}</span>
                </el-form-item>
                <el-form-item label="左边界的距离">
                  <span>{{ props.row.location.left }}</span>
                </el-form-item>
                <el-form-item label="上边界的距离">
                  <span>{{ props.row.location.top }}</span>
                </el-form-item>
                <el-form-item label="宽度">
                  <span>{{ props.row.location.width }}</span>
                </el-form-item>
                <el-form-item label="高度">
                  <span>{{ props.row.location.height }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.gender.type }}</span>
                </el-form-item>
                <el-form-item label="性别可信度">
                  <span>{{ props.row.gender.probability }}</span>
                </el-form-item>
                <el-form-item label="人脸类型">
                  <span>{{ props.row.face_type.type }}({{ props.row.face_type.probability }})</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age" />
          <el-table-column label="beauty，美丑打分" prop="beauty" />
          <el-table-column label="face_probability，人脸置信度" prop="face_probability" />
        </el-table>
      </template>
    </el-row>
    <p v-if="result">{{ result }}</p>
  </div>
</template>
<script>
// import qs from 'querystring';

export default {
  name: 'Orc',
  data() {
    return {
        imageUrl: '',
        result: {
          face_num: '',
          result: [],
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
          image: this.imageUrl.replace(/data:image\/(jpeg|png);base64,/, '')
        };
        // console.log(data);
        this.loading = true;
        this.$store.dispatch('bdToken/getBdToken', 'orc').then(res => {
          // console.log("token", res.token);
          const url = '/bdApiP/ocr/v1/general_basic?access_token=' + res.data.token;
          this.axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
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
