<template>
  <transition name="slide">
    <section class="search-wrapper" v-show="show">
      <input class="search-ipt" type="text" v-focus="show">
      <a href="javascript:" class="search-btn" @click="closeSearch"><font-awesome-icon class="search-icon" :icon="['fas', 'times']" /></a>
    </section>
  </transition>
</template>

<script>
import fontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  props: ['show'],
  // data() {
  //   return {
  //     show: true
  //   }
  // },
  mounted() {

  },
  methods: {
    closeSearch() {
      if (!this.show) return
      // this.show = false

      this.$emit('update:show', false)
    }
  },
  components: {
    fontAwesomeIcon
  },
  directives: {
    focus: {
      update(el, {value}) {
        if (value) {
          el.focus()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  &-wrapper {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 50px;
    line-height: 50px;
    background: #202025;
    z-index: 9;
    display: flex;
  }
  &-ipt {
    padding: 0 60px 0 20px;
    height: 100%;
    background: none;
    outline: none;
    border: none;
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
    flex-grow: 1;
  }
  &-btn {
    text-align: center;
    padding: 0 20px;
    font-size: 20px;
    vertical-align: top;
  }
}

.slide-enter-active {
  animation: slide-up-in 0.5s linear;
}
.slide-leave-active {
  animation: slide-up-in 0.5s linear reverse;
}
.slide-leave-to {
  transform:translateY(-100%);
}
@keyframes slide-up-in {
  0% {
    transform:translateY(-100%);
  }
  100% {
    transform:translateY(0)
  }
}
</style>
