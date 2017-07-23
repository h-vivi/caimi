<template>
  <footer class="footer">
    <div class="footer-item main">
      <i class="xicon xicon-main"></i>
      <div class="name">首页</div>
    </div>
    <div class="footer-item add">
      <i class="xicon xicon-add"></i>
    </div>
    <div class="footer-item mine">
      <i class="xicon xicon-mine"></i>
      <div class="mine">我的</div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return { }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .footer {
    font-size: @font-size-small;
    background-color: @color-deep;
    color: @color-light;
    display: flex;
    align-items: center;
    justify-content: space-around;
    // padding: 0.26rem 0.33rem 0.13rem;

    .footer-item {
      float: left;
      width: 1rem;
      text-align: center;
      .xicon {
        margin-bottom: 0.1rem;
      }
      &.xicon-add {
        height: 100%;
      } 
    }
  }
</style>
