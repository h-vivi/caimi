<template>
  <div class="s">
    <router-view class="content"></router-view>
    <x-footer class="footer"></x-footer>
  </div>
</template>

<script>
  import XFooter from '@/components/common/footer'

  export default {
    name: 's',
    data () {
      return { }
    },
    components: {
      XFooter
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .s {
    position: relative;
    height: 100%;
    overflow: hidden;

    .content {
      position: relative;
      height: 100%;
      padding-bottom: 1.33rem;
      overflow: hidden;
      z-index: 1;
    }
    .footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1.33rem;
      z-index: 2;
    }
  }
</style>
