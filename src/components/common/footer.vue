<template>
  <footer class="footer">
    <router-link class="footer-item main" :to="{ name: 's::list' }">
      <i class="xicon xicon-main"></i>
      <br>
      <span class="name">首页</span>
    </router-link>
    <div class="footer-item add">
      <i class="xicon xicon-add"></i>
    </div>
    <router-link class="footer-item mine" :to="{ name: 's::mine' }">
      <i class="xicon xicon-mine"></i>
      <br>
      <span class="name">我的</span>
    </router-link>
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
      &.router-link-active {
        color: #fff;
      }
    }
  }
</style>
