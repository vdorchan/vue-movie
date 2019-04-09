<template>
  <div>
    <top-bar page-title="热映">
      <a href="javascript:" v-for="(tab, index) of tabs" :key="index" @click="slideSwiper(index)" :class="{ current: currentTabIndex === index}">{{ tab.label }}</a>
    </top-bar>
    <swiper ref="movieSwiper" class="container" @slideChangeTransitionStart="swithMovie">
      <swiper-slide v-for="(tab, index) of tabs" :key="index">
        <div :id="'toTop'+index" class="to-top">
          <!-- <font-awesome-icon class="movie-collect" :icon="['fas', 'angle-double-up']"/> -->
        </div>
        <mescroll-vue v-if="tab.isLoaded" class="movie-list-container" ref="mescroll" :down="pullDownConfigs[index]" :up="scrollMoreConfigs[index]" @init="mescrollInit" v-loading.fullscreen="!movies[index].length">
          <div class="movie-list">
            <router-link v-for="movie in movies[index]" :to="'/movie/' + movie.id" :key="movie.id">
              <div class="movie-poster">
                <img :src="movie.images.large" alt="">
              </div>
              <div class="movie-info">
                <h4 class="movie-title">{{ movie.title}} </h4>
                <p>{{ movie.genres.map(genre => `${genre}`).join('/')}}</p>
                <p>{{ movie.year }} - <rating :average="movie.rating.average"></rating></p>
                <p>导演：{{ movie.directors.map(director => `${director.name}`).join(' ') }}</p>
                <p>主演：{{ movie.casts.map(cast => `${cast.name}`).join(' ') }}</p>
              </div>
            </router-link>
          </div>
          <div class="movie-loading" v-show="!tab.isLoadFinal&&movies[index].length">加载中<loader></loader></div>
          <div class="movie-final" v-if="tab.isLoadFinal">没有更多啦</div>
        </mescroll-vue>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import TopBar from '../components/TopBar'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { getInTheater, getComingSoon } from '../store/api.js'
import MescrollVue from 'mescroll.js/mescroll.vue'
import fontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  data () {
    return {
      currentTabIndex: null,
      tabs: [
        { label: '已上映', fun: 'getInTheater', isLoaded: false, isLoadFinal: false },
        { label: '即将上映', fun: 'getComingSoon', isLoaded: false, isLoadFinal: false }
      ],
      movies: [],
      getInTheater,
      getComingSoon,
      showToTop: false,
      isLoadFinal: false,
      mescroll: [],
      pullDownConfigs: [
        {
          callback: this.pullDown
        },
        {
          callback: this.pullDown
        }
      ],
      scrollMoreConfigs: [
        {
          callback: this.loadMovies,
          page: {
            num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10 // 每页数据条数,默认10
          },
          toTop: {
            warpId: 'toTop0',
            // src: '@/assets/images/i-search.png',
            html: '<span></span>',
            wrapClass: 'mescroll-totop',
            offset: 1200
          }
        },
        {
          callback: this.loadMovies,
          page: {
            num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10 // 每页数据条数,默认10
          },
          toTop: {
            warpId: 'toTop1',
            html: '<span></span>',
            src: '@/assets/images/i-search.png',
            wrapClass: 'mescroll-totop',
            offset: 1200
          }
        }
      ]
    }
  },
  mounted () {
    this.tabs.forEach(() => this.movies.push([]))
    this.swithMovie(0)
  },
  activated () {
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll[this.currentTabIndex] = mescroll
    },
    async pullDown (mescroll) {
      mescroll.resetUpScroll()
    },
    slideSwiper (index) {
      this.$refs.movieSwiper.swiper.slideTo(index, 0)
    },
    swithMovie (tab, mescroll) {
      this.currentTabIndex = this.$refs.movieSwiper.swiper.activeIndex
      this.tabs[this.currentTabIndex].isLoaded = true
    },
    async loadMovies (page, mescroll) {
      const { currentTabIndex } = this
      const currentTab = this.tabs[currentTabIndex]
      const pageNum = page.num - 1
      const { data } = await this[currentTab.fun](pageNum * page.size, page.size)

      if (pageNum === 0) {
        this.movies[currentTabIndex] = []
      }

      this.movies.splice(currentTabIndex, 1, this.movies[currentTabIndex].concat(data.subjects))
      currentTab.isLoadFinal = pageNum * page.size + data.subjects.length >= data.total
      this.tabs.splice(currentTabIndex, 1, currentTab)

      mescroll && mescroll.endSuccess(data.subjects.length, !currentTab.isLoadFinal)
    },
    loadNextPage (e) {
      const tar = e.target
      if (tar.scrollTop + tar.clientHeight === tar.scrollHeight) {
        this.loadMovies()
      }
    },
    toTop () {
      this.mescroll[this.currentTabIndex].scrollTo(0)
    }
  },
  name: 'Index',
  components: {
    TopBar,
    Rating,
    Loader,
    MescrollVue,
    fontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/var';
.container {
  position: absolute;
  width: 100%;
  padding-top: 80px;
  height: 100%;
}
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
  &-title {
    margin: 15px 0 10px;
    font-size: 20px;
    color: #ffffff;
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

.movie-list-container {
  height: 100%;
}
.movie-list {
  min-height: 100%;
}
.movie-list-container /deep/ .mescroll-upwarp {
  display: none!important;
}
.to-top {
  position: absolute;
  right: 10px;
  bottom: 30px;
  width: 35px;
  height: 35px;
  z-index: 9990;
  border-radius: 50%;

  svg {
    position: absolute;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
    color: #fff;
    padding: 6px;
    box-sizing: border-box;
  }

  /deep/ .mescroll-totop{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    background: $c-red url('../assets/images/up.svg') center center no-repeat;
    background-size: 26px 26px;
  }
}
</style>
