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
          <el-submenu :index="first.id+''" v-for="first in menus">
            <template slot="title" :index="'/index/'+first.path">
              <i class="el-icon-user-solid"></i>
              <span>{{first.authName}}</span>
            </template>
            <el-menu-item v-for="second in first.children" :index="'/index/'+second.path">{{second.authName}}</el-menu-item>
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
import { getMenus } from '@/api/power.js'
export default {
  data () {
    return {
      menus: [],
      true: true,
      iscollapse: false
    }
  },
  mounted () {
    getMenus().then(res => {
      console.log(res)
      if (res.data.meta.status === 200) {
        this.menus = res.data.data
        console.log(this.menus)
      }
    }).catch(err => {
      console.log(err)
    })
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
