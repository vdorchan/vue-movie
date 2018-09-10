import Vue from 'vue'
import Vuex from 'vuex'
import {
  TO_VIP,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  UPDATE_FAVORITES,
  LOGIN_SUCCESS,
  REGISTER,
  UPDATE_SESSION
} from './mutation-types'

import {
  login,
  register,
  addToFavorites,
  removeFromFavorites,
  getUser
  
} from '../store/api'

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },

  getters: {},

  mutations: {
    [UPDATE_FAVORITES](state, {
      favorites
    }) {
      state.userInfo.favorites = favorites
    },

    [UPDATE_SESSION](state, { data }) {
      state.userInfo = data.userInfo
    }
  },

  actions: {
    async login({ commit }, { nickname, password, rt } = {}) {
      if (!nickname) return alert('用户名不能为空')
      if (!password) return alert('密码不能为空')

      const { data } = await login(nickname, password)
      if (data.success) {
        commit(UPDATE_SESSION, { data })
        rt ? router.replace({ path: rt }) : router.replace({ path: '/' })
      } else {
        alert(data.msg)
      }
    },

    async register({ commit }, { nickname, password } = {}) {
      if (!nickname || nickname.length < 5) return alert('账号名不能为空，至少5个字符！')
      if (!password || password.length < 5) return alert('密码不能为空，至少5个字符！')

      const { data } = await register(nickname, password)
      
      alert(data.msg)

      if (data.success) {
        router.push({
          path: 'login'
        })
      }

    },

    async getUser({ commit }) {
      const { data } = await getUser()
      data.success && commit(UPDATE_SESSION, { data })
    },

    async addToFavorites({ commit }, { movie }) {
      const { data } = await addToFavorites(movie)
      data.success && commit(UPDATE_FAVORITES, data)
    },

    async removeFromFavorites({ commit }, { movieId }) {
      const { data } = await removeFromFavorites(movieId)

      data.success && commit(UPDATE_FAVORITES, data)
    }
  }



})