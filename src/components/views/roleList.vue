<template>
  <div class="roleList">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-button
      type="primary"
      round
      class="searchbtn"
      @click="addRolediglog"
      style="margin-bottom:10px"
    >添加角色</el-button>
    <!-- 表格 -->
    <el-table border :data="roleData" style="width: 100%">
      <!-- 插入展开列 -->
      <el-table-column type="expand" label="权限" width="50px">
        <template slot-scope="scope">
          <el-col v-for="item in scope.row.children">
            <el-col :span="4">
              <el-tag
                closable
                :type="'success'"
                @close="handleClose(scope.row,item.id)"
              >{{item.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-col v-for="second in item.children">
                <el-col :span="4">
                  <el-tag
                    closable
                    :type="''"
                    @close="handleClose(scope.row,second.id)"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="handleClose(scope.row,third.id)"
                    closable
                    :type="'warning'"
                    v-for="third in second.children"
                    style="margin:0px 5px 10px 0"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="280" align="center"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="280" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <div class="icon-font">
            <el-tooltip content="编辑" placement="top" effect="light">
              <!-- 编辑按钮 -->
            <el-button type="primary" icon="el-icon-edit" @click="submitEditRole(scope.row)"></el-button>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip content="权限分配" placement="top" effect="light">
              <el-button type="primary" icon="el-icon-s-check" @click="opendialogPower(scope.row)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip content="删除" placement="top" effect="light">
              <el-button type="primary" icon="el-icon-delete"></el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限分配对话框 -->
    <el-dialog title="权限分配" :visible.sync="dialogPowerVisible">
      <!-- data绑定要显示的数据，show-checkbox显示已选框，node-key数据的唯一标志，
        :default-expanded-keys默认展开的数据，:default-checked-keys默认已选数据，
      props children下一级数据与label要展现到页面的数据-->
      <el-tree
        :data="tree"
        ref="tree"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="defaultCheckedKeys"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPowerVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPowerSumbit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogaddRoleVisible">
      <el-form :model="addRoleForm" :rules="rules" ref="addRoleForm">
        <el-form-item label="用户名" prop="roleName">
          <el-input v-model="addRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="addRoleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogaddRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editFormVisible">
  <el-form :model="editForm" ref="editForm">
    <el-form-item label="角色名称" >
      <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" >
      <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitEdit()">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getRole, addRole, editRole } from '@/api/role.js'
import { delPower, getAllPower, impower } from '@/api/power.js'
export default {
  data () {
    return {
      rules: {
        roleName: [ { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      editForm: {
        roleName: '',
        roleDesc: ''
      },
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      rid: '',
      id: '',
      defaultCheckedKeys: [],
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      editFormVisible: false,
      dialogaddRoleVisible: false,
      dialogPowerVisible: false,
      tags: [{ name: '标签一', type: '' }, { name: '标签二', type: 'success' }],
      roleData: []
    }
  },
  methods: {
    //   取消权限
    async handleClose (row, powerId) {
      console.log(row, powerId)
      let res = await delPower(row.id, powerId)
      console.log(res)
      this.$message({
        type: 'success',
        message: '取消权限成功'
      })
      //   this.init()
      row.children = res.data.data
    },
    // 获取角色列表熏染页面
    initRole () {
      getRole()
        .then(res => {
          // console.log(res)
          this.roleData = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 显示权限分配对话框及显示选中权限
    opendialogPower (row) {
      this.initPower()
      this.defaultCheckedKeys.length = 0
      this.dialogPowerVisible = true
      this.rid = row.id
      // console.log(row)
      if (row.children && row.children.length > 0) {
        row.children.forEach((first, index) => {
          if (first.children && first.children.length > 0) {
            first.children.forEach((second, index) => {
              if (second.children && second.children.length > 0) {
                second.children.forEach((third, index) => {
                  this.defaultCheckedKeys.push(third.id)
                })
              }
            })
          }
        })
      }

      console.log(this.defaultCheckedKeys)
    },
    // 权限分配
    async addPowerSumbit () {
      this.dialogPowerVisible = false
      // var obj = this.$refs.tree.getCheckedKeys()
      var obj = this.$refs.tree.getCheckedNodes()
      // obj={[id:131,pid:"110,125"],[id:132,pid:"110,125"]}
      // ["131","110","125","132","110","125"]
      // ["131","110","125","132"]
      // "131,110,125,132"
      // ==>"131,132,110,125"
      var arr = []
      obj.forEach(function (item, index) {
        arr.push(item.id)
        arr.push(item.pid)
      })
      // console.log(arr)
      var str1 = arr.join(',')
      // console.log(str1)
      var arr1 = str1.split(',')
      // console.log(arr1)
      var set = new Set(arr1)
      // console.log(set)
      var arr2 = [...set]
      // console.log(arr2)
      var rids = arr2.join(',')
      // console.log(obj)
      var res = await impower(this.rid, rids)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '授权成功'
        })
        this.initPower()
      }
    },
    // 获取权限列表
    initPower () {
      getAllPower('tree')
        .then(res => {
          // console.log(res)
          this.tree = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addRolediglog () {
      this.dialogaddRoleVisible = true
      console.log(this.addRoleForm)
    },
    addRoleSubmit () {
      this.$refs.addRoleForm.validate(valid => {
        if (valid) {
          addRole(this.addRoleForm).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.initRole()
            this.dialogaddRoleVisible = false
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    submitEditRole (row) {
      console.log(row)
      this.id = row.id
      this.editForm.roleName = row.roleName
      this.editForm.roleDesc = row.roleDesc
      this.editFormVisible = true
    },
    async submitEdit () {
      let res = await editRole(this.id, this.editForm)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '编辑角色成功'
        })
        this.editFormVisible = false
        this.initRole()
      }
    }
  },
  mounted () {
    this.initRole(), this.initPower()
  }
}
</script>
<style scoped>
.el-col {
  margin-bottom: 10px;
}
</style>
