<template>
  <div
    class="container"
    v-loading.fullscreen="!movie"
  >
    <div
      class="movie"
      v-if="movie"
    >
      <top-bar
        :class="['gradient', {'show-title': showTitle}]"
        :page-title="showTitle?movie.title:'电影'"
        hideSearch=true
        showBack=true
      ></top-bar>
      <section class="movie-info">
        <img
          class="movie-poster"
          :src="movie.bigPoster"
          alt=""
        >
        <div class="movie-info-inner">
          <p><i class="c-red">Movie</i> {{ movie.year }}</p>
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.countries.map(c => c).join('，') }} - {{ movie.durations[0] }} {{ movie.pubdate }}</p>
          <p>{{ movie.genres.map(g => g).join('，')}}</p>
          <p>{{ movie.directors.map(d => `${d.name}(导演)`).join('/') }}</p>
          <p>{{ movie.casts.map(c => c.name).join('/') }}</p>
          <div class="movie-rate-wrapper">
            <div>
              <p>
                <font-awesome-icon
                  class="movie-collect"
                  :icon="['far', 'heart']"
                  @click="addMovie"
                  v-show="!isFavorite"
                />
                <font-awesome-icon
                  class="movie-collect is-favorite"
                  :icon="['fas', 'heart']"
                  @click="removeMovie"
                  v-show="isFavorite"
                />{{ movie.collect_count }} 人收藏了该电影 </p>
              <p>
                <font-awesome-icon
                  class="movie-comment"
                  :icon="['far', 'comment-dots']"
                />{{ movie.comments_count }} 条评论</p>
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
        <celebrities-list
          :casts="movie.casts"
          :directors="movie.directors"
        ></celebrities-list>
      </section>
      <movie-recommand-list :id="movie.id"></movie-recommand-list>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar'
import CelebritiesList from '../components/CelebritiesList'
import MovieRecommandList from '../components/MovieRecommandList'
import { getMovieById } from '../store/api'
import fontAwesomeIcon from '@fortawesome/vue-fontawesome'

import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES
} from '../store/mutation-types.js'

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
  data () {
    return {
      movie: null,
      recommandMovies: null,
      showTitle: false
    }
  },
  created () {
    console.log('movie created')
    this.loadMovie()
  },
  activated () {
    console.log('movie activated')
    this.loadMovie()
  },
  methods: {
    async loadMovie () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.movie = null
      const { data: movie } = await getMovieById(this.$route.params.id)
      this.movie = movie
      // this.$nextTick(this.bindScroll)
    },
    handleScroll (evt, el) {
      console.log(el.scrollTop)
    },
    getAbsPoint (e) {
      // 再封装个函数吧。传进来的e可以是字符串类型（即id）,也可以是htmlElement对象。觉得getEL是个累赘的话，就把它删除掉。
      var x = e.offsetLeft
      var y = e.offsetTop
      while (e = e.offsetParent) {
        x += e.offsetLeft
        y += e.offsetTop
      }
      return {
        'x': x,
        'y': y
      }
    },
    bindScroll () {
      console.log(document.querySelector('h2'))
      const absY = this.getAbsPoint(document.querySelector('h2')).y
      this.showTitle = window.scrollY > absY
      window.onscroll = () => {
        this.showTitle = window.scrollY > absY
      }
    },
    addMovie () {
      // this.$store.commit(ADD_TO_FAVORITES, {movie: this.movie})
      this.$store.dispatch('addToFavorites', { movie: this.movie })
    },
    removeMovie () {
      // this.$store.commit(REMOVE_FROM_FAVORITES, {movieId: this.movie.id})
      this.$store.dispatch('removeFromFavorites', { movieId: this.movie.id })
    }

  },
  components: {
    TopBar,
    CelebritiesList,
    MovieRecommandList,
    fontAwesomeIcon
  },
  computed: {
    isFavorite () {
      try {
        return this.$store.state.userInfo.favorites.find(movie => movie.id === this.movie.id)
      } catch (err) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/var";

.container {
  padding-top: 0;
  padding-bottom: 50px;
}
.header {
  &.gradient {
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
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
    height: 575px;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(0, 0, 0, 0.1) 40%,
        rgba(0, 0, 0, 0.5) 50%,
        #000000 90%,
        #000000 100%
      );
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
  &-rate {
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

      p {
        display: flex;
        align-items: center;
      }

      &::before {
        content: "";
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
  &-collect,
  &-comment {
    display: inline-block;
    margin-right: 8px;
    font-size: 18px;

    &.is-favorite {
      color: $c-red;
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
