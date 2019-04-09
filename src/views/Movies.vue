<template>
  <div class="container">
    <top-bar page-title="电影"></top-bar>
    <section class="rank-container">
      <swiper>
        <swiper-slide>
          <movie-rank
            start=0
            count=5
            type="top250"
          >豆瓣Top250</movie-rank>
        </swiper-slide>
        <swiper-slide>
          <movie-rank
            start=0
            count=5
            type="us_box"
          >北美票房榜</movie-rank>
        </swiper-slide>
        <swiper-slide>
          <movie-rank
            start=0
            count=5
            type="weekly"
          >口碑榜</movie-rank>
        </swiper-slide>
        <swiper-slide>
          <movie-rank
            start=0
            count=5
            type="new_movies"
          >新片榜</movie-rank>
        </swiper-slide>
      </swiper>
    </section>
    <section class="movies-container">
      <movie-list-row tag="经典"></movie-list-row>
      <movie-list-row tag="经典"></movie-list-row>
      <movie-list-row tag="经典"></movie-list-row>
      <movie-list-row tag="经典"></movie-list-row>
      <movie-list-row tag="经典"></movie-list-row>
    </section>
  </div>
</template>

<script>
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import MovieRank from '../components/MovieRank'
import MovieListRow from '../components/MovieListRow'

export default {
  name: 'List',
  data () {
    return {}
  },
  watch: {
    '$route.id' (to, from) {
      console.log('kkk')
      console.log(to, from)
    }
  },
  components: {
    TopBar,
    BottomNav,
    MovieRank,
    MovieListRow
  }
}
</script>

<style scoped>
.rank-container {
  width: 95%;
  padding-right: 5%;
  overflow: hidden;
  white-space: nowrap;
}
.swiper-container {
  overflow: visible;
}
</style>
