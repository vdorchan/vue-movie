import Vue from 'vue'
import Loading from './Loading'
const LoadingConstructor = Vue.extend(Loading)
// const LoadingConstructor = Vue.extend(require('./Loading.vue')) // 不可以

export default {
  install: Vue => {
    Vue.directive('loading', {
      // 指令的关键
      bind: (el, binding) => {
        console.log('loading bind', binding)
        const loading = new LoadingConstructor({
          // 实例化一个loading
          el: document.createElement('span'),
          data: {
            text: el.getAttribute('loading-text'), // 通过loading-text属性获取loading的文字
            fullscreen: !!binding.modifiers.fullscreen
          }
        })
        el.instance = loading // el.instance是个Vue实例
        el.loading = loading.$el // el.loading的DOM元素是loading.$el
        el.loadingStyle = {}
        toggleLoading(el, binding)
      },
      update: (el, binding) => {
        el.instance.setText(el.getAttribute('loading-text'))
        if (binding.oldValue !== binding.value) {
          toggleLoading(el, binding)
        }
      },
      unbind: (el, binding) => {
        // 解绑
        if (el.domInserted) {
          if (binding.modifiers.fullscreen) {
            document.body.removeChild(el.loading)
          } else {
            el.loading && el.loading.parentNode && el.loading.parentNode.removeChild(el.loading)
          }
        }
      }
    })

    const toggleLoading = (el, binding) => {
      // 用于控制Loading的出现与消失
      if (binding.value) {
        Vue.nextTick(() => {
          if (binding.modifiers.fullscreen) {
            // 如果是全屏
            // console.log('nextTick', el.loading);
            el.originalPosition = document.body.style.position
            el.originalOverflow = document.body.style.overflow
            insertDom(document.body, el, binding) // 插入dom
          } else {
            el.originalPosition = el.style.position
            insertDom(el, el, binding) // 如果非全屏，插入元素自身
          }
        })
      } else {
        if (el.domVisible) {
          el.instance.$on('after-leave', () => {
            el.domVisible = false
            if (binding.modifiers.fullscreen && el.originalOverflow !== 'hidden') {
              document.body.style.overflow = el.originalOverflow
            }
            if (binding.modifiers.fullscreen) {
              document.body.style.position = el.originalPosition
            } else {
              el.style.position = el.originalPosition
            }
          })
          el.instance.visible = false
        }
      }
    }

    const insertDom = (parent, el, binding) => {
      // 插入dom的逻辑
      if (!el.domVisible) {
        Object.keys(el.loadingStyle).forEach(property => {
          el.loading.style[property] = el.loadingStyle[property]
        })
        if (el.originalPosition !== 'absolute') {
          if (!getComputedStyle(parent, null).position) {
            parent.style.position = 'relative'
          }
        }
        if (binding.modifiers.fullscreen) {
          parent.style.overflow = 'hidden'
        }
        el.domVisible = true
        parent.appendChild(el.loading) // 插入的是el.loading而不是el本身
        Vue.nextTick(() => {
          el.instance.visible = true
        })
        el.domInserted = true
      }
    }
  }
}
