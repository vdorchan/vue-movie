<template>
  <div class="container">
    <div class="user-main">
      <router-link :to="user ? 'setting' : 'login'">
        <img
          v-if="user && user.avatar"
          class="user-avatar"
          :src="user.avatar"
          alt=""
        >
        <div
          class="user-avatar"
          v-else
        >
          <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <div>
          <strong class="user-nickname">{{ user ? user.nickname : '未登录' }}</strong>
          <p
            class="user-id"
            v-if="user"
          >ID: {{ user.id }}</p>
        </div>
      </router-link>
    </div>
    <div
      class="user-favorites"
      v-if="user"
    >
      <h3>喜欢的电影({{ $store.state.userInfo.favorites.length }}部)</h3>
      <template v-if="$store.state.userInfo.favorites">
        <router-link
          v-for="movie in $store.state.userInfo.favorites"
          :to="'/movie/' + movie.id"
          :key="movie.id"
        >
          <div class="movie-poster">
            <img
              :src="movie.images.large"
              alt=""
            >
          </div>
          <div class="movie-info">
            <h4>{{ movie.title}} </h4>
            <p>{{ movie.casts.map(cast => `${cast.name}`).join(' ') }}</p>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
// import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import fontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  data () {
    return {
      user: null
    }
  },
  watch: {
    '$store.state.userInfo' (to, from) {
      this.user = this.$store.state.userInfo
    }
  },
  created () {
    this.user = this.$store.state.userInfo
  },
  activated () { },
  methods: {},
  name: 'Me',
  components: {
    BottomNav,
    fontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/var";
.container {
  // position: absolute;
  // width: 100%;
  padding-top: 0;
}

.user {
  &-main {
    height: 260px;
    padding-top: 60px;
    display: flex;
    background: #ffffff;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    text-align: center;
  }
  &-avatar {
    display: flex;
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
    border-radius: 100%;
    color: #bbb;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    background: #ddd;
  }
  &-nickname {
    color: #333;
    font-size: 20px;
    line-height: 32px;
  }
  &-id {
    font-size: 14px;
    color: #888;
  }
  &-favorites a {
    display: flex;
    text-decoration: none;
    padding: 10px 20px;
    &:first-child {
      padding-top: 20px;
    }
  }
}

.movie {
  &-poster {
    width: 80px;
    height: auto;
    flex-shrink: 0;
  }
  &-info {
    display: flex;
    padding-left: 10px;
    flex-grow: 1;
    text-align: left;
    justify-content: center;
    flex-direction: column;
    p {
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      line-height: 20px;
      color: #676971;
      margin: 0;
      max-height: 40px;
      overflow: hidden;
    }
  }
}

h3 {
  display: inline-block;
  margin: 15px 20px;
  font-size: 16px;
  color: $c-red;
  height: 20px;
  line-height: 20px;
  border-bottom: 2px solid $c-red;
}

h4 {
  margin: 0 0 10px;
  font-size: 20px;
  color: #ffffff;
}
</style>
