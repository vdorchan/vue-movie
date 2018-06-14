import Vue from 'vue'
import Vuex from 'vuex'
import {
  TO_VIP
} from './mutation-types'

Vue.use(vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },

  getters: {
    isVip: state => state.userInfo.vip
  },

  mutations: {
    [TO_VIP](state) {
      state.userInfo.vip = true
    }
  },

  actions:{
    asyncToVip({commit}) {
      setTimeout(() => {
        commit(TO_VIP)
      }, 1000);
    }
  }



})