<template>
  <el-container style="border: 1px solid #eeeeee">
    <div class="aside">
      <el-menu class="el-menu-vertical" :collapse="isCollapse"
               background-color="#545c64" text-color="#fff" active-text-color="#409EFF">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span slot="title">Home</span>
          </template>
          <el-menu-item-group>
            <router-link to="/HelloWorld" style="color: #FFFFFF">
              <el-menu-item index="1-1" route="true">helloWorld</el-menu-item>
            </router-link>
            <router-link to="/video" style="color: #FFFFFF">
              <el-menu-item index="1-2">vip视频</el-menu-item>
            </router-link>
            <router-link to="/ocr" style="color: #FFFFFF">
              <el-menu-item index="1-3">图片文字识别</el-menu-item>
            </router-link>
            <router-link to="/birthday" style="color: #FFFFFF">
              <el-menu-item index="1-4">What is it?</el-menu-item>
            </router-link>
            <router-link to="/excel" style="color: #FFFFFF">
              <el-menu-item index="1-5">excel</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">图书系统</span>
          </template>
          <el-menu-item-group>
            <router-link to="/category" style="color: #FFFFFF">
              <el-menu-item index="2-1">分类信息</el-menu-item>
            </router-link>
            <router-link to="/book" style="color: #FFFFFF">
              <el-menu-item index="2-2">书籍信息</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
   </div>

  <el-container>
  <el-header style="text-align: right; font-size: 12px">
    <div style="display: inline-block;float: left;font-size: 30px;" @click="isCollapse = !isCollapse">
        <i v-if="!isCollapse" class="el-icon-s-fold"></i>
        <i v-if="isCollapse" class="el-icon-s-unfold"></i>
    </div>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>余肥肥</span>
  </el-header>

  <el-main>
    <div id="App">
      <router-view></router-view>
    </div>
  </el-main>
  </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>

<style>
  html,body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .aside {
    min-height: 100vh;
    background-color: #545c64;
  }

  .el-menu-vertical {
    color: #FFFFFF;
    height: 100%;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    color: #FFFFFF;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }
</style>
