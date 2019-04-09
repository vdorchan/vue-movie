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

export default {
  name: 'App',

  data () {
    return {
      transitionName: 'slide-fade',
      isShowNav: true
    }
  },

  created () {
    this.$store.dispatch('getUser')
  },

  watch: {
    '$route' (to, from) {
      this.isShowNav = !to.matched.some(record => record.meta.hideBottomNav)
    }
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
