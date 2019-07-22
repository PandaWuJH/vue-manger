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
      <el-input
        placeholder="请输入内容"
        style="width:300px"
        v-model="usersObj.query"
        @keyup.enter.native="init"
      >
        <el-button slot="append" icon="el-icon-search" @click.native="init"></el-button>
      </el-input>
      <el-button type="success" round class="searchbtn" @click="addUserdiglog">添加用户</el-button>
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
                <i class="el-icon-edit" @click="editUserdiglog(scope.row)"></i>
              </el-tooltip>
              <el-tooltip content="分享" placement="top" effect="light">
                <i class="el-icon-share"></i>
              </el-tooltip>
              <el-tooltip content="删除" placement="top" effect="light">
                <i class="el-icon-delete" @click="deleteById(scope.row.id)"></i>
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
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="添加用户" :visible.sync="dialogAddVisible">
      <el-form :model="addUser" :rules="rules" ref="addUser">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="addUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible=false">取 消</el-button>
        <el-button type="primary" @click="addUsertosql">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="dialogEditVisible">
      <el-form :model="editUser" :rules="rules" ref="editUser">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username" style="width:280px">
          <el-input v-model="editUser.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="editUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editUser.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <p>{{editUser.email}}</p>
      <p>{{editUser.mobile}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible=false">取 消</el-button>
        <el-button type="primary" @click="editUserById">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUsers,
  addUsertosql,
  editUserById,
  deleteById
} from '@/api/user.js'
export default {
  data () {
    return {
      addUser: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        addmobile: '',
        addemail: ''
      },
      editUser: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        addmobile: '',
        addemail: '',
        id: 0
      },
      rules: {
        mobile: [{ required: true, message: '请输入电话 ', trigger: 'blur' }],
        email: [
          {
            required: true,
            message: '请输入邮箱 ',
            trigger: 'blur'
          }
        ],
        username: [
          { required: true, message: '请输入用户名 ', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码 ', trigger: 'blur' }]
      },
      id: 0,
      // scope: '',
      formLabelWidth: '120px',
      dialogAddVisible: false,
      dialogEditVisible: false,
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
    },
    // 点击显示新增用户对话框
    addUserdiglog () {
      this.dialogAddVisible = true
    },
    // 新增用户
    addUsertosql () {
      this.$refs['addUser'].validate(valid => {
        if (valid) {
          addUsertosql(this.addUser)
            .then(res => {
              console.log(res)
              if (res.data.meta === 200) {
                this.$refs['addUser'].resetFields()
                this.init()
                this.dialogAddVisible = false
                this.$message({
                  showClose: true,
                  message: '添加用户成功',
                  type: 'success'
                })
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                showClose: true,
                message: '添加用户失败',
                type: 'error'
              })
            })
        }
      })
    },
    // 点击编辑弹出对话框并显示当前用户信息
    editUserdiglog (row) {
      this.dialogEditVisible = true
      this.editUser.id = row.id
      this.editUser.username = row.username
      this.editUser.password = row.password
      this.editUser.mobile = row.mobile
      this.editUser.email = row.email
    },
    // 编辑用户
    async editUserById () {
      console.log(this.editUser)
      var res = await editUserById(this.editUser)
      this.dialogEditVisible = false
      this.init()
      this.$refs['editUser'].resetFields()
      console.log(res)
    },
    // 删除用户
    deleteById (id) {
      this.$confirm('此操作将永久删除id为' + id + '的用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(id)
          this.id = id
          deleteById(this.id)
            .then(res => {
              console.log(res)
              this.init()
            })
            .catch(err => {
              console.log(err)
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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
.table {
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
