

import Vue from 'vue'

export default {
  install: Vue => {
    Vue.directive('scroll', {
      bind: function () {
        console.log('bbbb');
      },
      inserted(el, binding) {
        const { cb, trigger } = binding.value
        if (!cb || typeof cb !== 'function') {
          return 
        }

        console.log(44, !trigger);
        const isWindow = binding.modifiers.window
        const scrollContainer = isWindow ? window : el.parentNode

        const scrollTop = isWindow ? 
          () => window.scrollY :
          () => scrollContainer.scrollTop

        const height = isWindow ?
          () => scrollContainer.innerHeight :
          () => scrollContainer.clientHeight

        console.log(scrollContainer);
        scrollContainer.addEventListener('scroll', () => {
          if (!trigger) {
            return
          }

          console.log(2222, scrollTop(), height(), scrollTop() + height(), el.scrollHeight, scrollTop() + height() === el.scrollHeight);
          if (scrollTop() + height() === el.scrollHeight) {
            cb()
          }
        })
      }
    })
  }
}