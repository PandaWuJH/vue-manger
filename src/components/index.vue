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
          active-text-color="#409efd"
        >
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/index/list">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="1aaaa">
            <template slot="title">
              <i class="el-icon-lock"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/index/roleList">角色列表</el-menu-item>
            <el-menu-item index="/index/powerList">权限列表</el-menu-item>
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
          <span class="myicon myicon-menu toggle-btn" @click="iscollapse = !iscollapse" style="color:white"></span>
          <span class="system-title" style="font-size:30px;color:white">电商后台管理系统</span>
          <a href="javascrpt:;" class="welcome" style="color:white">退出</a>
        </el-header>
        <el-main><router-view></router-view></el-main>

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
    // height: 100%;
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
.toggle-btn{
  font-size: 30px;
}
</style>
