<template>
  <span class="rating">
    {{ average===0?'暂无评分':(average+'').padEnd(3, '.0') }}
  </span>
</template>

<script>
export default {
  props: ['average']
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/var";

.rating {
  color: $c-red;
}
</style>
