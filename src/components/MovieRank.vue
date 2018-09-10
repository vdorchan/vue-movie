<template>
  <div class="movie-list">
    <h3><slot></slot></h3>
    <router-link class="movie-item" v-for="(movie, index) in movies" :to="'/movie/' + movie.id" :key="movie.id">
      <div class="movie-ranking">{{ parseInt(start) + index + 1 }}</div>
      <div class="movie-poster">
        <img :src="movie.images.small" alt="">
      </div>
      <div class="movie-info">
        <h4>{{ movie.title}} </h4>
        <p>{{ movie.year }} - <rating :average="movie.rating.average"></rating></p>
        <p>{{ movie.collect_count }}人看过</p>
      </div>  
    </router-link>
    <a class="rank-link" href="">全部{{total}}部</a>
  </div>
</template>

<script>
import Rating from './Rating.vue'
import {getMovies} from '../store/api'

export default {
  data() {
    return {
      movies: [],
      total: 0
    }
  },
  props: ['start', 'count', 'type'],
  mounted() {
    this.loadMovies()
  },
  methods: {
    async loadMovies() {
      const {type, count} = this.$props        

      const {data} = await getMovies(type, 0, count)
      
      this.movies = data.subjects
      this.total = data.total

      if (type !== 'top250') {
        this.movies = data.subjects.slice(0, 5).map(subject => subject.subject ? subject.subject : subject)
        this.total = data.subjects.length
      }

    }
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
    display: inline-block;
    width: 100%;
  }
  &-item {
    display: flex;
    margin: 10px 0;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    /* padding-right: 3%; */
    justify-content: flex-start;
    text-decoration: none;
    line-height: 1.5;
  }
  &-ranking {
    padding: 10px;
  }
  &-poster {
    width: 50px;
    overflow: hidden;
    border-radius: 3px;
  }
  &-info {
    display: flex;
    padding-left: 20px;
    flex-direction: column;
    justify-content: center;
    text-align: left;

    p {
      color: #888;
    }
  }
}
h3 {
  padding: 10px 20px;
  color: $c-red;
  font-size: 20px;
  text-align: left;
}
.rank-link {
  display: block;
  padding: 10px;
  width: 100%;
  text-align: center;
  text-decoration: none;
}
</style>