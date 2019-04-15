<template>
  <div class="container">
    <top-bar
      :class="[]"
      :page-title="$route.meta.isLogin?'登录':'注册'"
      hideSearch=true
      showBack=true
    ></top-bar>
    <form class="form-wrapper">
      <input
        class="form-control"
        type="text"
        name="nickname"
        placeholder="账号名"
        v-model="nickname"
      >
      <input
        class="form-control"
        type="password"
        name="password"
        placeholder="密码"
        v-model="password"
      >
      <template v-if="!$route.meta.isLogin">
        <input
          class="form-control"
          type="email"
          name="email"
          placeholder="邮箱"
          v-model="email"
        >
        <div class="captcha-row">
          <input
            class="form-control"
            type="captcha"
            name="captcha"
            placeholder="验证码,6666是万能"
            v-model="captcha"
          >
          <a
            class="captcha-button"
            href="javascript:"
            @click="sendCaptcha"
          >{{captchaButtonLabel}}</a>
        </div>
      </template>
      <input
        class="form-submit"
        type="button"
        :value="$route.meta.isLogin?'登录':'注册'"
        @click="submitForm({email, nickname, password, captcha, rt:$route.query.rt})"
      >
    </form>
    <div class="form-link">
      <template v-if="$route.meta.isLogin">
        <router-link
          class="form-link"
          to="register"
          replace
        >注册</router-link> | <router-link
          class="form-link"
          to="forgetPasword"
        >忘记密码</router-link>
      </template>
      <template v-else>
        <router-link
          class="form-link"
          to="login"
          replace
        >有账号了，去登陆</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import { mapActions } from 'vuex'
import { sendCaptcha } from '@/store/api'

export default {
  data () {
    return {
      nickname: '',
      password: '',
      email: '',
      captcha: '',
      captchaButtonLabel: '发送验证码'
    }
  },
  created () {
    this.updateSubmitForm()
  },
  watch: {
    '$route' (to, from) {
      this.updateSubmitForm()
      if (!to.meta.isLogin) {
        this.nickname = ''
        this.password = ''
        this.email = ''
        this.captcha = ''
      }
    }
  },
  activated () { },
  destroyed () {
    clearInterval(this.captchaTimer)
  },
  methods: {
    submitForm () { },
    updateSubmitForm () {
      this.submitForm = this.$route.meta.isLogin ? this.login : this.register
    },
    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    async sendCaptcha () {
      if (this.captchaDisabled) {
        return
      }
      clearInterval(this.captchaTimer)

      const { email } = this
      if (!email || !this.validEmail(email)) return alert('邮箱格式不正确')
      this.captchaDisabled = true
      const { data } = await sendCaptcha(email)
      if (data.success) {
        alert('验证码发送成功')
        let i = 60
        this.captchaTimer = setInterval(() => {
          this.captchaButtonLabel = --i
          if (i <= 0) {
            this.captchaButtonLabel = '发送验证码'
            clearInterval(this.captchaTimer)
            this.captchaDisabled = false
          }
        }, 1000)
      }
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
    height: 28px;
    line-height: 28px;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-sizing: border-box;
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
.captcha {
  &-row {
    display: flex;
  }
  &-button {
    display: block;
    margin-left: 10px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    width: 160px;
    background: #9f56dc;
    border-radius: 5px;
    font-size: 0.8em;
    text-decoration: none;
  }
}
</style>
