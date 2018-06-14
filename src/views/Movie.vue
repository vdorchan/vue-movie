<template>
  <div class="container" v-loading.fullscreen="!movie">
    <div class="movie" v-if="movie">
      <top-bar :class="['gradient', {'show-title': showTitle}]" :page-title="showTitle?movie.title:'电影'" hideSearch=true showBack=true></top-bar>
      <section class="movie-info">
        <img class="movie-poster" :src="movie.images.large" alt="">
        <div class="movie-info-inner">
          <p><i class="c-red">Movie</i> {{ movie.year }}</p>
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.countries.map(c => c).join('，') }} - {{ movie.durations[0] }} {{ movie.pubdate }}</p>
          <p>{{ movie.genres.map(g => g).join('，')}}</p>
          <p>{{ movie.directors.map(d => `${d.name}(导演)`).join('/') }}</p>
          <p>{{ movie.casts.map(c => c.name).join('/') }}</p>
          <div class="movie-rate-wrapper">
            <div>
              <p>{{ movie.reviews_count }} 人看过了</p>
              <p>{{ movie.comments_count }} 条评论</p>
            </div>
            <div class="movie-rate">
              <i class="c-red">{{ movie.rating.average }}</i>/10
            </div>
          </div>
        </div>
      </section>
      <section class="movie-synopsis">
        <p>概要：</p>
        <p>{{ movie.summary }}</p>
      </section>
      <section class="movie-casts">
        <p>影人：</p>
        <celebrities-list :casts="movie.casts" :directors="movie.directors"></celebrities-list>
      </section>
      <movie-recommand-list :id="movie.id"></movie-recommand-list>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar'
import CelebritiesList from '../components/CelebritiesList'
import MovieRecommandList from '../components/MovieRecommandList'
import {getMovieById} from '../store/api'

// const TopBar = () => ({
//   component: import('../components/TopBar.vue'),
//   loading() {
//     console.log('jj');
//   },
//   delay: 3000,
//   timeout: 3000
// })

export default {
  name: 'Movie',
  data() {
    return {
      movie: null,
      recommandMovies: null,
      showTitle: false,
    }
  },
  created() {
    this.loadMovie()
  },
  watch: {
    '$route'(to, from) {
      this.loadMovie(to.params.id)
    }
  }, 
  methods: {
    async loadMovie() {
      this.movie = null
      const {data: movie} = await getMovieById(this.$route.params.id)
      this.movie = movie
      this.$nextTick(this.bindScroll)
    },
    handleScroll(evt, el) {
      console.log(el.scrollTop);
    },
    getAbsPoint(e) {
      //再封装个函数吧。传进来的e可以是字符串类型（即id）,也可以是htmlElement对象。觉得getEL是个累赘的话，就把它删除掉。
      var x = e.offsetLeft
      var y = e.offsetTop
      while (e = e.offsetParent) {
        x += e.offsetLeft
        y += e.offsetTop
      }
      return {
        "x": x,
        "y": y
      }
    },
    bindScroll() {
      const absY = this.getAbsPoint(document.querySelector('h2')).y
      this.showTitle = window.scrollY > absY
      window.onscroll = () => this.showTitle = window.scrollY > absY
    }
  },
  components: {
    TopBar,
    CelebritiesList,
    MovieRecommandList
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/var';

.container {
  padding-top: 0;
}
.header {
  &.gradient {
    background: linear-gradient(to top, rgba(255, 255, 255, 0.1) 0%,rgba(0, 0, 0, 0.5) 100%); 
  }
  &.show-title {
    background: $c-red;
  }
}
.movie {
  &-info-inner,
  &-synopsis {
    padding: 0 35px;
  }
  &-poster {
    width: 100%;
  }
  &-info {
    position: relative;
    color: #ffffff;
    font-size: 12px;
    overflow: hidden;
    text-align: left;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%,rgba(0, 0, 0, 0.5) 50%, #000000 90%, #000000 100%); 
    }
    &-inner {
      position: absolute;
      width: 100%;
      bottom: 0;
      z-index: 2;
      box-sizing: border-box;
    }

    p {
      margin: 0;
      height: 24px;
      line-height: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &-rate{
    width: 73px;
    height: 73px;
    line-height: 73px;
    border: 1px solid #ef1a51;
    border-radius: 100%;
    font-size: 10px;
    text-align: center;

    &-wrapper {
      position: relative;
      margin: 12px 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #676971;
      font-size: 13px;
      line-height: 2;
      font-weight: bold;

      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 40px;
        height: 2px;
        background: #ef1a51;
        left: 0;
        top: 0;
      }
    }
    .c-red {
      font-size: 25px;
      color: $c-red;
    }
  }
  &-synopsis {
    padding-top: 30px;
    padding-bottom: 20px;
    font-style: 22px;
    color: #676971;
    background: #ffffff;
    line-height: 1.5;
    text-align: left;
  }
  &-casts {
    padding-bottom: 20px;
    font-style: 22px;
    color: #ffffff;
    line-height: 1.5;
    text-align: left;
    background: #000;

    p {
      padding: 10px 10px 0;
    }
  }
}

h2 {
  margin: 12px 0;
  text-align: left;
  font-size: 26px;
  line-height: 1;
}
</style>

