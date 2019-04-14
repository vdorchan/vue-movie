<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
    <bottom-nav v-show="isShowNav"></bottom-nav>
  </div>
</template>

<script>
import BottomNav from './components/BottomNav'
import { REFRESH_TOKEN } from '@/store/mutation-types'

export default {
  name: 'App',

  data () {
    return {
      transitionName: 'slide-fade'
    }
  },

  computed: {
    isShowNav () {
      return !this.$route.meta.hideBottomNav
    }
  },

  created () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit(REFRESH_TOKEN, { token })
      this.$store.dispatch('getUser')
    }

    this.axios.interceptors.response.use(res => {
      const { token } = res.data
      if (token) {
        this.$store.commit(REFRESH_TOKEN, { token })
      }

      return res
    }, error => Promise.reject(error))
  },

  components: {
    BottomNav
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  right: 0;
  opacity: 0;
}
.child-view {
  min-height: 100%;
}
</style>
