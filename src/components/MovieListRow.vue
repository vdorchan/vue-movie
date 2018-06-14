<template>
  <div class="movie-list">
    <h3><slot>{{ tag }}</slot></h3>
    <div class="movie-list-inner">
      <a class="movie-item" v-for="(movie) of movies" :href="'/movie/' + movie.id" :key="movie.id">
        <div class="movie-poster">
          <img :src="movie.images.small" alt="">
        </div>
        <div class="movie-info">
          <h4>{{ movie.title}} </h4>
          <p><rating :average="movie.rating.average"></rating></p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Rating from './Rating.vue'
import { getMoviesByTag } from '../store/api'

export default {
  data() {
    return {
      movies: [],
      pageCount: 10
    }
  },
  props: ['tag'],
  mounted() {
    this.loadMovies()
  },
  methods: {
    async loadMovies(n=0) {
      const {data} = await getMoviesByTag(this.$props.tag, 0, this.pageCount)

      this.movies = data.subjects
    },
  },
  components: {
    Rating
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/var';

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
    display: inline-block;
    margin-right: 10px;
    text-align: center; 
    text-decoration: none;
    overflow: hidden;
    vertical-align: top;

    img {
      width: 110px;
      height: 165px;
      border-radius: 5px;
    }
  }
}
h3 {
  padding: 10px;
  color: #ffffff;
  font-size: 20px;
  text-align: left;
}
h4 {
  padding: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
