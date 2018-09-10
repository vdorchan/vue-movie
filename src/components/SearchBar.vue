<template>
  <transition name="slide">
    <section class="search-container" v-show="show">
      <div class="search-result" v-show="searchWord.length" v-loading="loading">
        <div class="movie-list">
          <movie-item v-for="movie of movies" :movie="movie" :key="movie.id"></movie-item>
        </div>
      </div>
      <div class="search-wrapper">
        <input class="search-ipt" type="text" v-focus="show" v-model="searchWord">
        <a href="javascript:" class="search-btn" @click="closeSearch"><font-awesome-icon class="search-icon" :icon="['fas', 'times']" /></a>
      </div>
    </section>
  </transition>
</template>

<script>
import fontAwesomeIcon from '@fortawesome/vue-fontawesome'
import movieItem from './movieItem'
import { searchMovies } from '../store/api'
import debounce from 'debounce'

export default {
  data() {
    return {
      movies: [],
      searchWord: '',
      loading: true
    }
  },
  // computed: {
  //   async movies() {
  //     return await searchMovies(searchWord, 0, 20)
  //   }
  // },
  watch: {
    searchWord() {
      this.debouncedSearchMovies()
    },
    show() {
      document.documentElement.style.overflowY = this.show ? 'hidden' : 'auto'
      if (!this.show) {
        this.movies = []
        this.searchWord = ''
      }
    }
  },
  props: ['show'],
  // data() {
  //   return {
  //     show: true
  //   }
  // },
  created() {
    this.debouncedSearchMovies = debounce(this.searchMovies, 500)
  },
  methods: {
    closeSearch() {
      if (!this.show) return
      // this.show = false

      this.$emit('update:show', false)
    },
    async searchMovies() {
      this.movies = []
      this.loading = true
      const {data} = await searchMovies(this.searchWord, 0, 20)
      this.loading = false
      
      this.movies = data.subjects
    }
  },
  components: {
    fontAwesomeIcon,
    movieItem
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
  &-container {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 9;
  }
  &-wrapper {
    position: relative;
    display: flex;
    height: 50px;
    line-height: 50px;
    background: #202025;
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
  &-result {
    position: fixed;
    top: 0;
    padding-top: 50px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: rgba($color: #000, $alpha: 0.8);
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
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

.movie {
  &-list {
    // display: flex;
    // // justify-content: center;
    // flex-wrap: wrap;
    // flex-direction: column;
    // overflow: hidden;
    display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
    grid-template-columns: repeat(3, 1fr);
  }
  &-item {
    margin: 5px;
  }
}
</style>
