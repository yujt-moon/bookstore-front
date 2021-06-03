<template>
  <div class="container">
    <h3>{{name}}</h3>
    <div class="selectArea">
      <el-select v-model="value" placeholder="字体颜色" style="width: 100px;">
        <el-option
          v-for="item in colors"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="content" v-html="content" :style="{'color':value}">

    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    data() {
      return {
        name: '',
        content: '',
        value: '',
        colors: [
          {
            name: '默认',
            value: '#555'
          },
          {
            name: '暗紫',
            value: '#9370DB'
          },
          {
            name: '藻绿',
            value: '#2E8B57'
          },
          {
            name: '深灰',
            value: '#2F4F4F'
          },
          {
            name: '青灰',
            value: '#778899'
          },
          {
            name: '栗色',
            value: '#800000'
          },
          {
            name: '青蓝',
            value: '#6A5ACD'
          },
          {
            name: '玫褐',
            value: '#BC8F8F'
          },
          {
            name: '黄褐',
            value: '#F4A460'
          },
          {
            name: '米色',
            value: '#F5F5DC'
          },
          {
            name: '雾白',
            value: '#F5F5F5'
          }
        ]
      }
    },
    mounted() {
      let id = this.$route.query.id
      this.getChapter(id)
    },
    methods: {
      getChapter(id) {
        let that = this;
        Axios.get(that.PUBLIC_PARAM.ipAndHost + "/api/chapter/detail/" + id)
          .then(resp => {
            let {success} = resp.data;
            let data = resp.data.data;
            if(success) {
              if(data != null) {
                that.name = data.name
                that.content = data.content
              }
            } else {
              that.$message.error("查询失败！")
            }
          })
      }
    }
  }
</script>

<style scoped>
  .container {

  }

  .content {
    padding: 20px;
    margin-top: 5px;
    background-color: #ecf6fd;
  }

  .selectArea {
    text-align: right;
  }
</style>
