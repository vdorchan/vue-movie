<template>
  <div id="app">
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="child-view" v-if="$route.meta.keepAlive"></router-view>
      </transition>
    </keep-alive>
    <transition :name="transitionName">
      <router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
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
      // const toDepth = to.path.split('/').length
      // const fromDepth = from.path.split('/').length
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
/* .fade-enter-active, .fade-leave-active {
  transition: opacity 5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.child-view {
  transition: all 5s cubic-bezier(.55,0,.1,1);
  min-height: 100%;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
} */
/* .slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: all .3s;
    position: absolute;
    width:100%;
    left:0;
}
.slide-right-enter {
    transform: translateX(-100%);
}
.slide-right-leave-active {
    transform: translateX(100%);
}
.slide-left-enter {
    transform: translateX(100%);
}
.slide-left-leave-active {
    transform: translateX(-100%);
}
.child-view {
  min-height: 100%;
} */
.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;
  right: 0;
  /* transform: translateY(100px); */
  opacity: 0;
}
.child-view {
  min-height: 100%;
}
</style>
