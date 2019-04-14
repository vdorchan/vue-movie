import Vue from 'vue'
import Vuex from 'vuex'
import { UPDATE_FAVORITES, LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE, REFRESH_TOKEN } from './mutation-types'

import { login, register, addToFavorites, removeFromFavorites, getUser } from '../store/api'

import router from '../router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {},
    auth: false,
    token: ''
  },

  getters: {},

  mutations: {
    [UPDATE_FAVORITES] (state, { favorites }) {
      state.user.favorites = favorites
    },

    [LOGIN_SUCCESS] (state, { data }) {
      this.commit(UPDATE_PROFILE, data.userInfo)
      this.commit(REFRESH_TOKEN, data)
    },

    [REFRESH_TOKEN] (state, { token }) {
      state.token = token
      axios.defaults.headers.common['Authorization'] = token
      localStorage.setItem('token', token)
    },

    [UPDATE_PROFILE] (state, user) {
      state.auth = true
      state.user = user
    },

    [LOGOUT] (state) {
      state.auth = false
      state.user = {}
      localStorage.removeItem('token')
      router.replace({ path: '/' })
    }
  },

  actions: {
    async login ({ commit }, { nickname, password, rt } = {}) {
      if (!nickname) return alert('用户名不能为空')
      if (!password) return alert('密码不能为空')

      const { data } = await login(nickname, password)
      if (data.success) {
        commit(LOGIN_SUCCESS, { data })
        rt ? router.replace({ path: rt }) : router.replace({ path: '/' })
      } else {
        alert(data.msg)
      }
    },

    async register ({ commit }, { email, nickname, password, captcha } = {}) {
      if (!nickname || nickname.length < 5) return alert('账号名不能为空，至少5个字符！')
      if (!password || password.length < 5) return alert('密码不能为空，至少5个字符！')
      if (!email) return alert('邮箱不能为空')
      if (!captcha) return alert('验证码不能为空')

      const { data } = await register(email, nickname, password, captcha)

      alert(data.msg)

      if (data.success) {
        router.push({
          path: 'login'
        })
      }
    },

    async getUser ({ commit }) {
      try {
        const { data } = await getUser()
        data.success && commit(UPDATE_PROFILE, data.user)
      } catch (error) {
        console.log(error.response.data)
      }
    },

    async addToFavorites ({ commit }, { movie }) {
      const { data } = await addToFavorites(movie)
      data.success && commit(UPDATE_FAVORITES, data)
    },

    async removeFromFavorites ({ commit }, { movieId }) {
      const { data } = await removeFromFavorites(movieId)

      data.success && commit(UPDATE_FAVORITES, data)
    }
  }
})
