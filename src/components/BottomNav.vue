<template>
  <footer class="">
    <router-link
      to="/"
      replace
    >
      <font-awesome-icon :icon="['far', 'calendar']" />热映</router-link>
    <router-link
      to="/movies"
      replace
    >
      <font-awesome-icon :icon="['fas', 'film']" />电影</router-link>
    <router-link
      to="/me"
      replace
    >
      <font-awesome-icon :icon="['far', 'user']" />我</router-link>
  </footer>
</template>

<script>
import fontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  components: {
    fontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: rgba(22, 23, 27, 0.9);
  z-index: 9;

  a {
    display: flex;
    text-decoration: none;
    font-size: 14px;
    color: #ffffff;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    overflow: hidden;
    line-height: 1;
  }

  svg {
    font-size: 18px;
  }
}
.router-link-exact-active {
  color: $c-red;
}
</style>
