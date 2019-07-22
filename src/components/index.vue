<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu
          :router="true"
          :collapse="iscollapse"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="/index/list">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="1aaaa">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-3asdasd">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="1dfds">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-3dasdas">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="1fdsfewf">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-3adasdsa">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn" @click="iscollapse = !iscollapse"></span>
          <span class="system-title">电商后台管理系统</span>
          <a href="javascrpt:;" class="welcome">退出</a>
        </el-header>
        <!-- <el-main>Main</el-main> -->
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      true: true,
      iscollapse: false
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu {
    width: auto;
  }
  // 如果是展开状态,那么宽度就是200px,如果是合并状态,宽度:auto

  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;

    // span {
    //  padding-left: 400px;
    //  flex: 1;
    //  text-align:center
    // }
  }
  .logo {
    height: 60px;
    // width: 200px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
}
</style>
