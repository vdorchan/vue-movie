<template>
  <div
    class="celebrities-list"
    v-if="celebrities"
  >
    <a
      class="celebrities-item"
      v-for="celebrities of hasPhotos(celebrities)"
      :href="celebrities.alt"
      :key="celebrities.id"
    >
      <div class="celebrities-avatar">
        <img
          :src="celebrities.avatars.large"
          alt=""
        >
      </div>
      <div class="celebrities-info">
        <h4>{{ celebrities.name}} </h4>
        <p v-if="celebrities.isDirector">导演</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      celebrities: null
    }
  },
  created () {
    this.celebrities = this.$props.directors.map(d => Object.assign(d, { isDirector: true })).concat(this.$props.casts)
  },
  props: ['casts', 'directors'],
  methods: {
    hasPhotos: casts => casts.filter(cast => cast.avatars)
  }
}
</script>

<style lang="scss" scoped>
.celebrities {
  &-list {
    padding: 10px 10px;
    white-space: nowrap;
    overflow-x: auto;
  }
  &-item {
    display: inline-block;
    margin-right: 10px;
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    vertical-align: top;

    img {
      width: 110px;
      height: 165px;
      border-radius: 5px;
    }
  }
  &-info {
    padding: 5px 0;
    p {
      font-size: 0.8em;
      opacity: 0.8;
    }
  }
}
h4 {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
