<template>
  <div class="avatar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'avatar'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  @avatar-size: 1.33rem;

  .avatar {
    position: relative;
    display: inline-block;
    width: @avatar-size;
    min-width: @avatar-size;
    height: @avatar-size;
    min-height: @avatar-size;
    border-radius: @avatar-size;
    vertical-align: middle;
    overflow: hidden;
    user-select: none;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
</style>
