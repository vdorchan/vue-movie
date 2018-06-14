<template>
  <transition
    name="loading"
  	@after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="loading-mask"
      :class="{fullscreen: fullscreen}">
      <div class="loading">
        <svg width="60px" height="60px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-flickr" style="background: none;">
          <circle cy="50" cx="34" fill="#e15b64" r="20">
            <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate>
          </circle>
          <circle cy="50" cx="66" fill="#f47e60" r="20">
            <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
          </circle>
          <circle cy="50" cx="34" fill="#e15b64" r="20">
            <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate>
            <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" repeatCount="indefinite" dur="1s"></animate>
          </circle>
        </svg>
        <div class="loading-text" v-if="text">
          {{ text }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'loading',
    data() {
      return {
        text: null,
        fullscreen: true,
        visible: false
      }
    },

    methods: {
      handleAfterLeave() {
        this.$emit('after-leave')
      },
      setText(text) {
        this.text = text
      }
    }
  }
</script>

<style lang="scss" scoped>
.loading {
  &-mask {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    &.fullscreen {
      position: fixed;
    }
  }
  &-text {
    text-align: center;
  }
}
</style>

