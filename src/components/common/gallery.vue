<template>
  <div class="gallery">
    <div class="desc">
      <slot></slot>
    </div>
    <div class="images">
      <img v-for="(img, index) in images" :key="index" :src="img">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'gallery',

    props: {
      images: {
        type: Array,
        default () {
          return [ ]
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
