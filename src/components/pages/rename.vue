<template>
  <div class="register">
    <div class="top">
      <div class="back xicon xicon-back" @click="back"></div>
    </div>
    <div class="rename-wrap">
      <input class="xinput rename-in" v-model="nick" placeholder="请输入昵称">
      <input type="button" class="xbtn xbtn-large rename-btn" value="确认" @click="rename">
    </div>
  </div>
</template>

<script>
  import { rename as renameAction } from '@/api'

  export default {
    name: 'rename',
    data () {
      return {
        nick: ''
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      rename () {
        renameAction({ phone: 18297927925, nickname: this.nick })
          .then(res => {
            if (!res.success) {
              this.$toast('重命名失败')
              return
            }
            this.$router.push({ name: 'mine' })
          })
          .catch(ex => {
            this.$toast('重命名失败')
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';
  
  .top {
    margin-top: 0.58rem;
    margin-bottom: 2.97rem;
    height: 0.62rem;
    line-height: 0.62rem;
    overflow: hidden;

    .back {
      float: left;
      margin-left: 0.4rem;
    }

    .new-account {
      float: right;
      margin-right: 0.4rem;
    }
  }

  .rename-wrap {
    width: 80%;
    margin: 0 auto;

    .rename-in {
      width: 100%;
      margin-bottom: 4.34rem;
      text-align: center;
    }
  }
</style>
