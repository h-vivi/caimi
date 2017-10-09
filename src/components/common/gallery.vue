<template>
  <div class="gallery">
    <div class="desc">
      <slot></slot>
    </div>
    <div :class="'images mode-' + images.length">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        :class="'image-item ' + 'image-item-' + index"
      >
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
  .images {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    font-size: 0;
    white-space: nowrap;

    .image-item {
      width: 100%;
    }

    &.mode-1,
    &.mode-2,
    &.mode-3,
    &.mode-4 {
      overflow-x: hidden;
      white-space: initial;
    }
  }

  .mode-1 {
    max-height: 7.46rem;
    .image-item {
      width: 100%;
    }
  }

  .mode-2 {
    max-height: 3.73rem;
    .image-item {
      width: 49.5%;
    }
    .image-item-0 {
      margin-right: 1%;
    }
  }

  .mode-3 {
    max-height: 7.46rem;
    .image-item {
      float: left;
    }
    .image-item-0 {
      width: 66%;
      margin-right: 2%;
    }
    .image-item-1 {
      margin-bottom: 2%;
    }
    .image-item-1,
    .image-item-2 {
      width: 32%;
    }
  }

  .mode-4 {
    max-height: 7.46rem;
    .image-item {
      width: 49.5%;
    }

    .image-item-0,
    .image-item-2 {
      margin-right: 1%;
    }

    .image-item-0,
    .image-item-1 {
      margin-bottom: 1%;
    }
  }
</style>
