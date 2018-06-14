<template>
  <div>
    <top-bar page-title="热映">
      <a href="javascript:" v-for="(tab, index) of tabs" :key="index" @click="swithMovie(index)" :class="{ current: currentTab === index}">{{ tab.label }}</a> 
      <!-- <a href="./in_theaters">已上映</a>
      <a href="./coming_soon">即将上映</a> -->
      <!-- <router-link to="/index/in_theaters">已上映</router-link> -->
      <!-- <router-link to="/index/coming_soon">即将上映</router-link> -->
    </top-bar>
    <!-- <movieList type="in_theaters" v-show="currentTab === 0"></movieList> -->
    <!-- <movieList type="coming_soon" v-show="currentTab === 1"></movieList> -->
    <!-- <movieList :type="types[currentTab]"></movieList> -->

    <!-- <keep-alive>
      <component :is="movieList" :type="types[currentTab]"></component>
    
    </keep-alive> -->
    <div class="container">
      <movie-list v-for="(tab, index) of tabs" :key="index" :type="index" v-show="currentTab === index" v-if="tab.loaded"></movie-list>
    </div>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import MovieList from '../components/MovieList'

export default {
  data() {
    return {
      currentTab: null,
      tabs: [
        { label: '已上映', type: 'in_theaters', loaded: false },
        { label: '即将上映', type: 'coming_soon', loaded: false }
      ]
    }
  },
  mounted() {
    this.swithMovie(0)

  },
  activated() {
    console.log(11);
  },
  methods: {
    swithMovie(tab) {
      console.log(tab);
      this.currentTab = tab
      this.tabs[tab].loaded = true

    },
    bindScroll() {
      const body = document.body
      window.onscroll = () => {
        // console.log(document.body.clientHeight, document.body.scrollHeight);
        

      }
    }
  },
  name: 'Index',
  components: {
    TopBar,
    BottomNav,
    MovieList
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  width: 100%;
  padding-top: 80px;
}
</style>


