<template>
  <footer class="footer">
    <router-link class="footer-item main" :to="{ name: 's::list' }">
      <i class="xicon xicon-main"></i>
      <!--<span class="name">首页</span>-->
    </router-link>
    <router-link class="footer-item add" :to="{ name: 'story' }">
      <i class="xicon xicon-add"></i>
    </router-link>
    <router-link class="footer-item mine" :to="{ name: 's::mine' }">
      <i class="xicon xicon-mine"></i>
      <!--<span class="name">我的</span>-->
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
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 1rem;
      
      &.xicon-add {
        height: 100%;
      }
      &.router-link-active {
        color: #fff;
      }
      .name {
          display: block;
      }
    }
  }
</style>
