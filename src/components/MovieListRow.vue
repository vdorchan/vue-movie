<template>
  <div class="movie-list">
    <h3>
      <slot>{{ tag }}</slot>
    </h3>
    <div class="movie-list-inner">
      <movie-item
        v-for="movie of movies"
        :movie="movie"
        :key="movie.id"
      ></movie-item>
    </div>
  </div>
</template>

<script>
import { searchMovies } from '../store/api'
import movieItem from './MovieItem.vue'

export default {
  data () {
    return {
      movies: [],
      pageCount: 10
    }
  },
  props: ['tag'],
  mounted () {
    this.loadMovies()
  },
  methods: {
    async loadMovies (n = 0) {
      const { data } = await searchMovies(this.$props.tag, 0, this.pageCount)

      this.movies = data.subjects
    }
  },
  components: {
    movieItem
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/var";

.movie {
  &-list {
    white-space: nowrap;

    &-inner {
      padding: 10px 10px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  &-item {
    margin-right: 10px;
  }
}
h3 {
  padding: 10px;
  color: #ffffff;
  font-size: 20px;
  text-align: left;
}
</style>
