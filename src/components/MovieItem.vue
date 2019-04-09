<template>
  <router-link
    class="movie-item"
    :to="'/movie/' + movie.id"
  >
    <div class="movie-poster">
      <img
        :src="movie.images.small"
        alt=""
      >
    </div>
    <div class="movie-info">
      <h4 class="movie-title">{{ movie.title}} </h4>
      <p>
        <rating :average="movie.rating.average"></rating>
      </p>
    </div>
  </router-link>
</template>

<script>
import Rating from './Rating.vue'

export default {
  name: 'movieItem',
  props: ['movie'],
  components: {
    Rating
  }
}
</script>

<style lang="scss" scoped>
.movie {
  &-item {
    display: inline-block;
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    vertical-align: top;
    line-height: 1;
    font-weight: normal;
    font-size: 16px;

    img {
      width: 110px;
      height: 165px;
      border-radius: 5px;
    }
  }

  &-poster img {
    width: 120px;
  }

  &-title {
    padding: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
