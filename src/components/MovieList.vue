<template>
  <section class="movie-list-container" v-loading.fullscreen="!movies[0]" @scroll="loadNextPage" v-scroll="{cb: handleScroll, trigger: true}">
    <div class="movie-list">
      <router-link v-for="movie in movies" :to="'/movie/' + movie.id" :key="movie.id">
        <div class="movie-poster">
          <img :src="movie.images.large" alt="">
        </div>
        <div class="movie-info">
          <h4>{{ movie.title}} </h4>
          <p>{{ movie.genres.map(genre => `${genre}`).join('/')}}</p>
          <p>{{ movie.year }} - <rating :average="movie.rating.average"></rating></p>
          <p>导演：{{ movie.directors.map(director => `${director.name}`).join(' ') }}</p>
          <p>主演：{{ movie.casts.map(cast => `${cast.name}`).join(' ') }}</p>
        </div>
      </router-link>
      <div class="movie-loading" v-show="!isLoadFinal&&movies[0]">加载中<loader></loader></div>
      <div class="movie-final" v-if="isLoadFinal">没有更多啦</div>
    </div>
  </section>
</template>

<script>
import Rating from './Rating'
import Loader from './Loader'
import { getInTheater, getComingSoon } from '../store/api.js'

export default {
  data () {
    return {
      movieArr: [],
      movies: [],
      pageIndex: 0,
      pageCount: 10,
      isLoading: false,
      isLoadFinal: false,
      getComingSoon,
      getInTheater
    }
  },
  props: ['type'],
  mounted () {
    this.loadMovies()
  },
  // watch: {
  //   '$route' (to, from) {
  //     console.log(to, from);
  //     console.log(this.loadMovies);
  //     this.loadMovies()
  //   },
  //   '$props.type' () {
  //     console.log(11);
  //     this.loadMovies()
  //   }
  // },
  methods: {
    async loadMovies (n = 0) {
      console.log(this.$props)
      if ((this.movies[0] && this.pageIndex === 0) || this.isLoading || this.isLoadFinal) {
        return false
      }

      this.isLoading = true

      const { data } = await this[(this.$props.type === 0 ? 'getInTheater' : 'getComingSoon')](this.pageIndex * this.pageCount, this.pageCount)

      if ((this.pageIndex + 1) * this.pageCount >= data.total) {
        this.isLoadFinal = true
      }

      this.movies = this.movies.concat(data.subjects)
      this.pageIndex++

      this.isLoading = false
    },
    innerHeight (elem) {
      const style = window.getComputedStyle(elem)
      return parseInt(style.height) - parseInt(style.paddingTop) - parseInt(style.paddingBottom)
    },
    loadNextPage (e) {
      console.log(111)
      const tar = e.target
      if (tar.scrollTop + tar.clientHeight === tar.scrollHeight) {
        this.loadMovies()
      }
    },
    handleScroll () {
      console.log('jj')
    }
  },
  components: {
    Rating,
    Loader
  }
}
</script>

<style lang="scss" scoped>
.movie {
  &-list {
    &-container {
      // height: 100%;
      // overflow-y: auto;
      // -webkit-overflow-scrolling: touch;
      // box-sizing: border-box;
    }
    a {
      display: flex;
      text-decoration: none;
      background: #111215;

      &:nth-child(even) {
        background: #0c0d0f;
      }
    }
  }

  &-poster {
    width: 130px;
    height: auto;
    flex-shrink: 0;
  }
  &-info {
    padding-left: 15px;
    flex-grow: 1;
    text-align: left;

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
  &-loading,
  &-final {
    width: 100%;
    display: flex;
    color: #ffffff;
    line-height: 40px;
    justify-content: center;
    align-items: center;
  }
  &-final {
    opacity: 0.6;
  }
}
h4 {
  margin: 15px 0 10px;
  font-size: 20px;
  color: #ffffff;
}
</style>
