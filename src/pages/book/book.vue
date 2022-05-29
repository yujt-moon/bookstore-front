<template>
  <div>
    <div class="search_div">
      <el-input
        class="search"
        placeholder="请输入内容"
        v-model="keyword"
        clearable>
      </el-input>
      <el-button @click="search()">搜索</el-button>
      <el-button @click="batchInsertEs()">导入到es</el-button>
    </div>
    <div style="text-align: right">
      <template v-if="listType === 'card'">
        <i class="el-icon-s-operation" @click="showTypeChange('list')"></i>
      </template>
      <template v-if="listType === 'list'">
        <i class="el-icon-menu" @click="showTypeChange('card')"></i>
      </template>
    </div>
    <div style="justify-content: space-between;flex-wrap: wrap" v-bind:style="{'display': cardShow}" class="book_div">
      <div v-for="book in books" :key="book.id" style="width: 30%; margin-bottom: 10px;">
        <el-card shadow="hover">
          <div style="display: flex; width: 100%">
            <div style="width: 50%;">
              <img :src="book.bookCover" class="image">
              <el-link type="primary" :underline="false" style="font-size: 15px;" @click="chapterlist(book.id)" v-html="book.name"></el-link>
            </div>
            <div class="intro">
              <div><i class="el-icon-user-solid"></i><span v-html="book.authorId"></span></div>
              <div style="color: gray;margin-top: 2px;">
                {{book.categoryId}}<i v-if="book.subCategoryId !== null && book.subCategoryId !== ''">·</i>{{book.subCategoryId}} | {{book.status}}
              </div>
              <div style="margin-top: 4px;">
                <el-tooltip placement="right" v-if="book.intro.length > 70">
                  <div slot="content" style="width: 150px;" v-html="book.intro"></div>
                  <span>简介：<span v-html="book.intro.substring(0, 70)"></span>...</span>
                </el-tooltip>
                <span v-if="book.intro.length <= 70">简介：<span v-html="book.intro"></span>...</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-table
      :data="books"
      border
      highlight-current-row
      stripe
      style="width: 100%"
      v-bind:style="{'display': listShow}">
      <el-table-column
        label="书名">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" style="font-size: 15px;" @click="chapterlist(scope.row.id)" v-html="scope.row.name">
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="作者">
        <template slot-scope="scope">
          <span v-html="scope.row.authorId"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="categoryId"
        label="分类">
      </el-table-column>
      <el-table-column
        label="简介"
        width="800">
        <template slot-scope="scope">
          <span v-html="scope.row.intro"></span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pager.pageSize"
      :total="total"
      :current-page="pager.pageNo"
      @current-change="pageChange" style="float: right;margin-top: 5px;">
    </el-pagination>
  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    data() {
      return {
        books: [],
        total: 0,
        keyword: '',
        pager: {pageNo: 1, pageSize: 6},
        tempIntro: '',
        listType: 'card',
        cardShow: 'flex',
        listShow: 'none'
      }
    },
    methods: {
      page(params) {
        let that = this;
        Axios.post(that.PUBLIC_PARAM.ipAndHost +'/api/book/page', params)
          .then(resp => {
            console.log(resp);
          let {data} = resp.data;
          console.log(data.records);
          that.books = data.records || [];
          that.total = data.total;
        })
      },
      pageChange(val) {
        this.pager.pageNo = val;
        if(this.keyword === '' || this.keyword === null) {
          this.page(this.pager);
        } else {
          this.search();
        }
      },
      search() {
        let that = this;
        if(this.keyword === '') {
          this.pager.pageNo = 1;
          this.page(this.pager);
          return;
        }
        let param = {
          keyword: this.keyword,
          pageNo: this.pager.pageNo,
          pageSize: this.pager.pageSize
        };

        Axios.post(that.PUBLIC_PARAM.ipAndHost + '/api/book/search', param)
          .then(resp => {
            console.log(resp);
            let {data} = resp.data;
            this.books = resp.data.data.records || [];
            this.total = resp.data.data.total;
          })
      },
      batchInsertEs() {
        Axios.get(this.PUBLIC_PARAM.ipAndHost + '/api/book/insertAllEs')
          .then(resp => {
            if(resp.data.code === "0000") {
              if(resp.data.success) {
                this.$message.success("导入成功！");
              } else {
                this.$message.error("导入失败！")
              }
            } else {
              this.$message.success("导入失败！")
            }
          })
      },
      showTypeChange(type) {
        if(type === 'list') {
          // 隐藏卡片式的显示方式
          this.cardShow = 'none';
          this.listType = 'list';
          // 显示表格形式
          this.listShow = 'block';
        } else {
          // 隐藏表格式的显示
          this.listShow = 'none';
          this.listType = 'card';
          // 显示卡片形式
          this.cardShow = 'flex';
        }
      },
      chapterlist(bookId) {
        this.$router.push({path: '/chapter', query:{bookId: bookId}});
      }
    },
    mounted() {
      this.page(this.pager);
    }
  }
</script>

<style>
  .book_div:after {
    content: "";
    width: 30%;
  }

  .intro {
    width: 50%;
    font-size: 14px;
    display: none;
    margin-left: 5px;
  }

  @media only screen and (min-width: 1380px)  {
    .intro {
      display: block;
    }
  }

  .image {
    width: 100%;
  }

  .search {
    width: 250px;
    margin-bottom: 5px;
  }

  .search_div {
    justify-content: right;
  }
</style>
