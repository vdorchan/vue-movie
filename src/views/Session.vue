<template>
  <div class="container">
    <top-bar :class="[]" :page-title="$route.meta.isLogin?'登录':'注册'" hideSearch=true showBack=true></top-bar>
    <form class="form-wrapper">
      <input class="form-control" type="text" name="nickname" placeholder="账号名" v-model="nickname">
      <input class="form-control" type="password" name="password" placeholder="密码" v-model="password">
      <input class="form-submit" type="button" :value="$route.meta.isLogin?'登录':'注册'" @click="submitForm({nickname, password, rt:$route.query.rt})">
    </form>
    <div class="form-link">
      <template v-if="$route.meta.isLogin">
        <router-link class="form-link" to="register" replace>注册</router-link> | <router-link class="form-link" to="forgetPasword">忘记密码</router-link>
      </template>
      <template v-else>
        <router-link class="form-link" to="login" replace>有账号了，去登陆</router-link> 
      </template>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      nickname: '',
      password: ''
    }
  },
  created() {
    this.updateSubmitForm()
  },
  watch: {
    '$route'(to, from) {
      this.updateSubmitForm()
    }
  }, 
  activated() {},
  methods: {
    submitForm() {},
    updateSubmitForm() {
      this.submitForm = this.$route.meta.isLogin ? this.login : this.register
    },
    ...mapActions([
      'login',
      'register'
    ])
  },
  name: 'Me',
  components: {
    BottomNav,
    TopBar
  }
}
</script>

<style lang="scss" scoped>
.container {
          height: 100%;
          padding-top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fff;
}
.form {
          &-wrapper {
                    margin-top: -10%;
                    width: 70%;
          }
          &-control {
                    display: block;
                    width: 100%;
                    padding: 6px 10px;
                    margin-bottom: 10px;
                    font-size: 18px;
                    line-height: 1.5;
                    color: #495057;
                    background-color: #fff;
                    background-clip: padding-box;
                    border: 1px solid #ced4da;
                    border-radius: 0.25rem;
                    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          &-submit {
                    display: block;
                    margin: 0 auto;
                    text-align: center;
                    white-space: nowrap;
                    border: 1px solid transparent;
                    padding: 6px 50px;
                    font-size: 18px;
                    line-height: 1.5;
                    border-radius: 5px;
                    background: #9f56dc;
                    color: #ffffff;
          }
          &-link {
                    margin-top: 10px;
                    color: #333;
                    a {
                              color: #9f56dc;
                    }
          }
}
</style>


