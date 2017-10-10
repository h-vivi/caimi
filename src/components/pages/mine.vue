<template>
  <div class="mine">
    <div class="mine-info">
      <div class="mine-info-top">
        <h2>我的</h2>
      </div>
      <div class="mine-avatar">
        <img v-if="userInfo.isLogin" :src="userInfo.avatar">
      </div>
      <template v-if="!userInfo.isLogin"><div class="mine-sign">{{ userInfo.nickname }}</div></template>
      <template v-else>
        <router-link class="mine-sign" :to="{ name: 'login' }">登录彩米</router-link>
      </template>
    </div>
    <ul class="mine-setting-module" >
      <setting-item
        v-for="(setting, index) in settings1"
        :item="setting"
        :key="index"
        @click.native="handleClick(setting)"
      ></setting-item>
    </ul>
    <ul class="mine-setting-module">
      <setting-item
        v-for="(setting, index) in settings2"
        :item="setting"
        :key="index"
        @click.native="handleClick(setting)"
      ></setting-item>
    </ul>
  </div>
</template>

<script>
  import SettingItem from '@/components/common/setting-item'
  import { mapGetters, mapMutations } from 'vuex'
  import { getUserInfo } from '@/api'

  export default {
    name: 's',
    data () {
      return {
        userInfo: { },
        settings1: [
          {
            name: '我的故事',
            icon: 'story',
            route: {
              name: 'storyList'
            }
          },
          {
            name: '我的收藏',
            icon: 'collect',
            route: {
              name: 'collectList'
            }
          }
        ],
        settings2: [
          {
            name: '设置',
            icon: 'set',
            route: {
              name: 'settings'
            }
          }
        ]
      }
    },
    components: {
      SettingItem
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      ...mapMutations(['SET_USER']),
      handleClick (item) {
        if (item.route) {
          this.$router.push(item.route)
        }
      }
    },
    beforeMount () {
      getUserInfo()
        .then(res => {
          if (!res.success) {
            return
          }
          this.userInfo = res.data
          this.userInfo.isLogin = true
          this.SET_USER({ user: this.userInfo })
        })
        .catch(ex => {
          /* Ignore */
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';
  .mine {
      background: @color-light;
  }
  .mine-info {
      height: 5.8rem;
      background: #fff;
      .mine-info-top {
        color: #fff;
        height: 1.94rem;
        padding-top: 0.4rem;
        text-align: center;
        background: @color-deep;
      }
      .mine-avatar {
        width: 2.67rem;
        height: 2.67rem;
        border-radius: 50%;
        margin: -0.6rem auto 0;
        background: pink;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .mine-sign {
        display: inline-block;
        width: 100%;
        margin-top: 0.69rem;
        color: @color-middle;
        font-size: @font-size-middle;
        text-align: center;
      }
  }
  .mine-setting-module {
    margin-top: 0.26rem;
    background: #fff;
    padding: 0 0.4rem 0 0.4rem;
  }
</style>
