<template>
  <header class="header">
    <a href="javascript:" class="btn-back" @click="back" v-if="showBack"><font-awesome-icon :icon="['fas', 'chevron-left']" /></a>
    {{ pageTitle }}
    <a href="javascript:" class="btn-search" @click="showSearch" v-if="!hideSearch"><font-awesome-icon :icon="['fas', 'search']" /></a>
    <div class="header-sub">
      <slot></slot>
    </div>
    <search-bar :show.sync="show" v-if="!hideSearch"></search-bar>
  </header>
</template>

<script>
import fontAwesomeIcon from '@fortawesome/vue-fontawesome'
import SearchBar from './SearchBar'

export default {
  data() {
    return {
      show: false
    }
  },
  props: [
    'pageTitle',
    'hideSearch',
    'showBack'
  ],
  components: {
    fontAwesomeIcon,
    SearchBar
  }, 
  mounted() {
  },
  methods: {
    showSearch() {
      this.show = true
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/var';

.header {
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 50px;
  line-height: 50px;
  font-size: 24px;
  // color: $c-red;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
  background: rgba(22, 23, 27, 0.95);
  z-index: 9;
  &-sub {
    display: flex;
    justify-content: center;
  }
  &-sub a {
    display: block;
    height: 11px;
    line-height: 1;
    padding: 5px 0;
    margin: 0 20px;
    font-size: 14px;
    color: #ffffff;
    text-decoration: none;

    &.current {
      color: $c-red;
      border-bottom: 2px solid $c-red;
    }
  }
}
.btn-search {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 20px;
}
.btn-back {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 20px;
}
</style>

