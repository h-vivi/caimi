<template>
  <div class="wrapper">
    <i class="back" @click="back"></i>
    <div class="title"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'header-with-back',
    methods: {
      back () {
        if (this.$router) {
          this.$router.back()
          return
        }
        window.history.go(-1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    height: 1.17rem;
    line-height: 1.17rem;
    color: #fff;
    background: @color-deep;
    font-size: @font-size-larger;

    .back {
      display: inline-block;
      width: 0.26rem;
      // height: 0.53rem;
      height: 100%;
      margin-left: 0.4rem;
      background: url(~assets/xicon-back-white.png) center center / 100% no-repeat;
    }

    .title {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate3d(-50%, 0, 0);
    }
  }
</style>
