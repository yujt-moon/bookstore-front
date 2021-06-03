<template>
  <div>
    <div>
      <el-select v-model="baseSite" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="url" type="text" placeholder="请输入网址：" class="el-input" style="width: 300px;" clearable></el-input>
      <el-button type="primary" @click="goto">解析</el-button>
      <el-button type="primary" @click="genateParts">生成剧集</el-button>
    </div>
    <div style="margin-top: 5px;">
      <template v-for="(item, index) in urlParts">
        <el-tag style="margin-right: 5px; margin-bottom: 5px;"><a :href="baseSite + item" target="_blank">{{index+1}}</a></el-tag>
      </template>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    data() {
      return {
        url: '',
        baseSite: '',
        options: [{
          label: '地址一（最佳）',
          value: 'https://cdn.yangju.vip/k/?url='
        }, {
          label: '地址二',
          value: 'https://jx.lache.me/cc/?url='
        },{
          label: '地址三',
          value: 'https://api.653520.top/vip/?url='
        },{
          label: '地址四',
          value: 'https://jx.ab33.top/vip/?url='
        },{
          label: '地址五',
          value: 'https://vip.mpos.ren/v/?url='
        },{
          label: '地址六',
          value: 'https://jx.000180.top/jx/?url='
        },{
          label: '地址七',
          value: 'https://jx.km58.top/jx/?url='
        }],
        urlParts: []
      }
    },
    methods: {
      goto() {
        if(this.baseSite === '') {
          this.$message.error('请选择线路！');
          return;
        }
        if(this.url === '') {
          this.$message.error('请输入网址');
          return;
        }
        let targetUrl = this.baseSite + this.url;
        window.open(targetUrl, "_blank");
        //window.location.href = 'https://cdn.yangju.vip/k/?url=' + this.site;
      },
      genateParts() {
        if(this.baseSite === '') {
          this.$message.error('请选择线路！');
          return;
        }
        if(this.url === '') {
          this.$message.error('请输入网址');
          return;
        }
        let that = this;
        Axios.post(that.PUBLIC_PARAM.ipAndHost + "/api/video/showParts", {url: that.url})
          .then(resp => {
            let {data} = resp.data;
            that.urlParts = data || [];
          })
      }
    }
  }
</script>

<style>

</style>
