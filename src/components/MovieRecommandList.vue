<template>
  <section class="movie-recommand">
      <p>喜欢这部电影的人<span>也喜欢</span></p>
      <div class="movie-recommand-list">
        <router-link class="movie-recommand-item" v-for="movie in recommandMovies" :to="'/movie/' + movie.id" :key="movie.id">
          <img :src="movie.poster" alt="">
        </router-link>
      </div>
    </section>
</template>

<script>
import {getMovieRecommand} from '../store/api'

export default {
  props: ['id'],
  data() {
    return {
      recommandMovies: null
    }
  },
  async mounted() {
    const {data: {subjects}} = await getMovieRecommand(this.$props.id)
    const len = subjects.length
    this.recommandMovies = subjects.slice(0, len - len % 3)
  },
  async created() {
    console.log(this.$props);
  }
}
</script>

<style lang="scss" scoped>
.movie-recommand {
  background: #101317;
  &-list {
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    width: 33.3%;
    flex-grow: 1;

    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    font-size: 18px;
    color: #676971;
    text-align: center;
    line-height: 1.5;
    padding: 30px 0;
  }
  span {
    display: block;
    color: #ffffff;
  }
}
</style>
