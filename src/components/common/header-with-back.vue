<template>
  <div class="wrapper">
    <i class="back" @click="back"></i>
    <div class="title"><slot></slot></div>
    <input
      type="button"
      class="opr-btn"
      v-if="needOpr"
      :value="oprBtnName"
      @click="opr"
    >
  </div>
</template>

<script>
  export default {
    name: 'header-with-back',
    props: {
      needOpr: {
        default () {
          return false
        }
      },
      oprBtnName: {
        default () {
          return ''
        }
      }
    },
    methods: {
      back () {
        if (this.$router) {
          this.$router.back()
          return
        }
        window.history.go(-1)
      },
      opr () {
        console.log('x')
        this.$emit('opr')
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
    display: flex;
    justify-content: space-between;
    height: 1.17rem;
    line-height: 1.17rem;
    color: #fff;
    background: @color-deep;
    font-size: @font-size-larger;
    padding: 0 0.4rem;

    .back {
      display: inline-block;
      width: 0.26rem;
      // height: 0.53rem;
      height: 100%;
      background: url(~assets/xicon-back-white.png) center center / 100% no-repeat;
    }

    .title {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate3d(-50%, 0, 0);
    }

    .opr-btn {
      display: inline-block;
      background: none;
      padding: 0;
      border: none;
      outline: none;
      color: #fff;
    }
  }
</style>
