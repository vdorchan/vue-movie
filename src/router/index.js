import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Me from '@/views/Me'
import Movies from '@/views/Movies'
import Movie from '@/views/Movie'
import Session from '@/views/Session'
import Setting from '@/views/Setting'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: location.pathname.replace(/(\S+\/)[^/]+$/g, '$1'),
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/index.html',
    redirect: {
      name: 'Index'
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
      keepAlive: false,
      hideBottomNav: true
    }
  }, {
    path: '/login',
    name: 'Login',
    component: Session,
    meta: {
      keepAlive: false,
      isLogin: true,
      hideBottomNav: true
    }
  }, {
    path: '/register',
    name: 'Register',
    component: Session,
    meta: {
      keepAlive: false,
      isLogin: false,
      hideBottomNav: true
    }
  }, {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: {
      keepAlive: false,
      isLogin: false,
      hideBottomNav: true
    }
  }],
  scrollBehavior (to, from, savedPosition) {
    // console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
