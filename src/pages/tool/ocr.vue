<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="this.PUBLIC_PARAM.ipAndHost + '/api/ocr/image'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-input
      type="textarea"
      :autosize="{ minRows: 5, maxRows: 20}"
      v-model="textarea"
      class="content">
    </el-input>
    <el-button type="primary" class="copy" data-clipboard-action="copy" data-clipboard-target=".content">
      拷贝到剪切板
    </el-button>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
    width: 178px;
    height: 178px;
    display: block;
  }

  .copy {
    margin-top: 5px;
    float: right;
  }
</style>

<script>
  import ClipboardJS from 'clipboard'

  export default {
    data() {
      return {
        imageUrl: '',
        textarea: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res);
        if(res.code === '0000') {
          this.textarea = res.data;
        }
      },
      beforeAvatarUpload(file) {
        const isImage = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImage) {
          this.$message.error('只能上传图片格式！');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isImage && isLt2M;
      }
    },
    mounted() {
      let clipboard = new ClipboardJS('.copy');
      let that = this;

      clipboard.on('success', function(e) {
        if(that.textarea == null || that.textarea == '') {
          that.$message.warning("暂无内容可以拷贝！");
        } else {
          that.$message.success("拷贝成功！");
        }
      });

      clipboard.on('error', function(e) {
        that.$message.error("拷贝失败！")
      });
    }
  }
</script>
