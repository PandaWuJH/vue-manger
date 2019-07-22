<template>
  <div class="users">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="input">
      <el-input placeholder="请输入内容" style="width:300px" v-model="usersObj.query" @keyup.enter.native="init">
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" round class="searchbtn">添加用户</el-button>
    </div>

    <div class="table">
      <el-table border :data="usersData" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="280" align="center"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="280" align="center"></el-table-column>
        <el-table-column prop="address" label="用户状态" align="center" width="180">
          <template slot-scope="scope">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
            <div class="icon-font">
              <el-tooltip content="编辑" placement="top" effect="light">
                <i class="el-icon-edit"></i>
              </el-tooltip>
              <el-tooltip content="分享" placement="top" effect="light">
                <i class="el-icon-share"></i>
              </el-tooltip>
              <el-tooltip content="删除" placement="top" effect="light">
                <i class="el-icon-delete"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="usersObj.pagenum"
      :page-sizes="[1, 2, 3, 4,5]"
      :page-size="usersObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { getUsers } from '@/api/user.js'
export default {
  data () {
    return {
      total: 5,
      usersObj: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      value: true,
      usersData: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleSizeChange (val) {
      this.usersObj.pagesize = val
      this.init()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.usersObj.pagenum = val
      this.init()
      console.log(`当前页: ${val}`)
    },
    init () {
      getUsers(this.usersObj)
        .then(res => {
          if (res.data.meta.status === 200) {
            console.log(res)
            this.usersData = res.data.data.users
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.breadcrumb {
  margin: 15px 0;
}
.input,
 .table{
  margin-bottom: 10px;
}
.table,
.input,
.breadcrumb,
.pagination {
  margin-left: 10px;
}
.searchbtn {
  margin-left: 10px !important;
}
.icon-font {
  i {
    font-size: 22px;
    margin-right: 20px;
    &:hover {
      color: skyblue;
      cursor: pointer;
    }
  }
}
.el-table {
  th {
    /deep/ div.cell {
      text-align: center;
      font-size: 30px;
    }
  }
}
</style>
