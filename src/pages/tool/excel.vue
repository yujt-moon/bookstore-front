<template>
    <div>
      <el-button type="primary" @click="downloadTemplate()" class="space">
        下载模板
      </el-button>

      <a :href="this.PUBLIC_PARAM.ipAndHost + '/api/excel/download'" class="space" style="display:block;">下载模板</a>

      <div class="space">
        <el-upload
          class="upload-demo"
          :action="this.PUBLIC_PARAM.ipAndHost + '/api/excel/upload'"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
</template>

<script>
    export default {
      name: "excel",
      data() {
        return {
          fileList: []
        }
      },
      methods: {
        downloadTemplate() {
          window.location.href = this.PUBLIC_PARAM.ipAndHost + '/api/excel/download';
        }
      }
    }
</script>

<style scoped>
  .space {
    margin-bottom: 10px;
  }
</style>
