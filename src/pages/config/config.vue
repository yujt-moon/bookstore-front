<template>
  <div style="justify-content: space-between; flex-wrap: wrap;">
    <div>
      <el-card class="card-style">
        <svg width="120" height="120" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="euiIcon euiIcon--large" focusable="false" role="img" aria-hidden="true"><g fill="none" fill-rule="evenodd"><path fill="#F04E98" d="M4 0v28.789L28.935.017z"></path><path class="euiIcon__fillNegative" d="M4 12v16.789l11.906-13.738A24.721 24.721 0 004 12"></path><path fill="#00BFB3" d="M18.479 16.664L6.268 30.754l-1.073 1.237h23.191c-1.252-6.292-4.883-11.719-9.908-15.327"></path></g></svg>
        <br/>
        <a href="http://localhost:5601" target="_blank">kibana</a>
      </el-card>
      <el-card class="card-style">
        <a href="http://localhost:9100" target="_blank"><i class="el-icon-link"></i>elasticsearch-head</a>
      </el-card>
      <el-card class="card-style">
        <img src="../../assets/jenkins.svg" />
        <br/>
        <a @click="startApp('/home/yujt/software/apache-tomcat-8.5.66/bin/startup.sh')"><i class="el-icon-video-play"></i>启动Jenkins</a><br/>
        <a href="http://localhost:7070/jenkins" target="_blank"><i class="el-icon-link"></i>访问Jenkins</a>
      </el-card>
    </div>
    <div>
      <el-card class="card-style">
        <el-form>
          <span>命令行</span>
          <el-form-item>
            <el-input v-model="command" @keyup.enter.native="executeCmd" clearable />
          </el-form-item>
          <el-form-item>
            <el-input type="textarea" v-model="result" :autosize="{ minRows: 4, maxRows: 8}" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="executeCmd">执行</el-button>
            <el-button @click="clearResult">清空</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="card-style">
        <a href="http://localhost:9999/druid/index.html">druid 监控页面</a>
      </el-card>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    name: "config",
    data() {
      return {
        command: "",
        result: ""
      }
    },
    methods: {
      executeCmd() {
        let that = this;
        Axios.post(that.PUBLIC_PARAM.ipAndHost + "/api/public/command", {command:that.command})
          .then(rsp => {
            let {data} = rsp.data;
            that.result = data;
        })
      },
      clearResult() {
        this.result = "";
      },
      startApp(command) {
        Axios.post(this.PUBLIC_PARAM.ipAndHost + "/api/public/command", {command: command})
          .then(rsp => {
            console.log(rsp);
          })
      }
    }
  }
</script>

<style>
  .card-style {
    width: 25%;
    height: 320px;
    display: inline-block;
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 10px;
  }

  .jenkins-log {
    background: url("../../assets/jenkins.svg");
  }

  a {
    cursor: pointer;
  }
</style>
