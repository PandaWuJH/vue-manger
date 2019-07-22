<template>
<div class="login">
    <div class="container">
        <img src="../assets/avatar.jpg" alt="" class="avatar">
  <el-form :model="loginForm" :rules="rules" ref="loginForm">
  <el-form-item prop="username">
    <el-input v-model="loginForm.username" prefix-icon="myicon myicon-user"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input v-model="loginForm.password" prefix-icon="myicon myicon-key"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login" class="login-btn">登录</el-button>

  </el-form-item>
</el-form></div>
</div>
</template>

<script>
// import axios from '../utils/axios.js'
import { login } from '../api/user.js'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        usename: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          var data = this.loginForm
          // console.log(data)

          // axios({
          //   url: 'login',
          //   method: 'post',
          //   data
          // })
          login(data).then(res => {
            // console.log(data)
            if (res.data.meta.status === 200) {
              localStorage.setItem('itcast_manger', res.data.data.token)
              this.$router.push({ name: 'index' })

              console.log(res.data)
            } else if (res.data.meta.status === 400) {
              this.$message({
                showClose: true,
                message: res.data.meta.msg,
                type: 'error'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message({
            showClose: true,
            message: '输入数据不合法',
            type: 'error'
          })
          return false
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      margin-bottom: 20px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
