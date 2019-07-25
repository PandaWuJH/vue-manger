<template>
  <div class="power">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表格 -->

      <el-table border :data="powerList" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180" align="center"></el-table-column>
        <el-table-column prop="path" label="路径" width="280" align="center"></el-table-column>
        <el-table-column prop="level" label="层级" width="280" align="center">
               <template slot-scope="scope">
                   {{scope.row.level|changelevel}}
                    </template>
        </el-table-column>
      </el-table>

  </div>
</template>

<script>
import { getAllPower } from '@/api/power.js'
export default {
  data () {
    return {
      powerList: []
    }
  },
  filters: {
    changelevel: function (value) {
      if (value === '0') {
        return '一级'
      } else if (value === '1') {
        return '二级'
      } else if (value === '2') {
        return '三级'
      }
    }
  },
  mounted () {
    getAllPower('list')
      .then(res => {
        console.log(res)
        this.powerList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
</style>
