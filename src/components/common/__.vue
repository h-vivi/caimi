<template>
  <div class="s">
    s页面
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 's',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
