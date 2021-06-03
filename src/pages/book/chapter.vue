<template>
    <div class="list">
      <el-button type="primary" @click="back">返回小说列表</el-button>
      <div class="bookInfo">
        <img :src="imgUrl"/>
        <div style="display: inline-block;margin-left: 20px;">
          <h2>{{bookName}}</h2>
          <label>作者：</label>{{author}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label>类别：</label>{{category}}
          <el-divider></el-divider>
          {{intro}}
        </div>
      </div>

      <div class="chapter_list" v-if="chapterlist.length > 0">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(chapter, index) in chapterlist" :key="chapter.id">
            <router-link :to="'/detail?id=' + chapter.id">{{chapter.name}}</router-link>
          </el-col>
        </el-row>
      </div>
      <el-backtop></el-backtop>
    </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    data() {
      return {
        imgUrl: '',
        bookName: '',
        author: '',
        category: '',
        intro: '',
        chapterlist: []
      }
    },
    mounted() {
      let bookId = this.$route.query.bookId;
      this.getBookInfo(bookId)
      this.getChapterList(bookId)
    },
    methods: {
      getBookInfo(bookId) {
        let that = this
        Axios.get(that.PUBLIC_PARAM.ipAndHost + '/api/book/getOne/' + bookId)
          .then(resp => {
            let {success} = resp.data;
            if(success) {
              if(!resp.data.data) {
                this.$message.warning("暂无该书籍信息");
              } else {
                that.imgUrl = resp.data.data.bookCover
                that.bookName = resp.data.data.name
                that.author = resp.data.data.authorId
                that.category = resp.data.data.categoryId
                that.intro = resp.data.data.intro
              }
            } else {
              this.$message.error("读取书籍信息失败！")
            }
          })
      },
      getChapterList(bookId) {
        let that = this
        Axios.get(that.PUBLIC_PARAM.ipAndHost + "/api/chapter/list/" + bookId)
          .then(resp => {
            let {success} = resp.data
            if(success) {
              let data = resp.data.data
              if(data != null) {
                that.chapterlist = data
              }
            } else {
              that.$message.error("查询章节列表失败！");
            }
          })
      },
      back() {
        this.$router.push({path: "/book"})
      }
    }
  }
</script>

<style scoped>
  .bookInfo {
    margin-top: 20px;
    display: flex;
    width: 100%;
    border: 1px solid #409EFF;
    padding: 2px;
  }

  .chapter_list {
    margin-top: 10px;
    width: 100%;
    border: 1px solid #409EFF;
    background-color: #9de2c3;
    padding: 2px;
  }
</style>
