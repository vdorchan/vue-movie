import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Me from '@/views/Me'
import Movies from '@/views/Movies'
import Movie from '@/views/Movie'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/movies',
    name: 'Movies',
    component: Movies,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/me',
    name: 'Me',
    component: Me,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
    meta: {
      keepAlive: false
    }
  }],
  scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})