<template>
  <div class="settings">
    <header-with-back>设置</header-with-back>
    <ul class="items">
      <setting-item
        v-for="(setting, index) in settings"
        :item="setting"
        :key="index"
        @click.native="handleClick(setting)"
      >
        <template v-if="setting.extra">{{ setting.extra }}</template>
        <template v-if="setting.avatar">
          <avatar class="avatar">
            <img style="height: 100%" :src="setting.avatar">
          </avatar>
        </template>
      </setting-item>
    </ul>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapGetters } from 'vuex'
  import HeaderWithBack from '@/components/common/header-with-back'
  import SettingItem from '@/components/common/setting-item'
  
  const defaultSettings = [
    {
      name: '头像',
      className: 'avatar',
      avatar: '' // 'http://cdn2.caimixinli.com/images/111111.jpg'
    },
    {
      name: '用户名',
      className: 'nick-name',
      extra: '',
      isLink: true,
      routeName: 'rename'
    },
    {
      name: '简介',
      className: 'synopsis',
      extra: '鲜花怒马少年时 一日看尽长安花'
    }
  ]

  export default {
    name: 'settings',
    data () {
      return { }
    },
    components: {
      HeaderWithBack,
      SettingItem
    },
    methods: {
      handleClick () {
        console.log('x')
      }
    },
    computed: {
      ...mapGetters([ 'xuser' ]),
      settings () {
        if (!this.xuser) {
          return defaultSettings.slice()
        }
        return defaultSettings.map((x, i) => {
          if (i === 0) {
            return _.assign({ }, x, { avatar: this.xuser.avatar })
          }
          if (i === 1) {
            return _.assign({ }, x, { extra: this.xuser.nickname })
          }
          return _.assign({ }, x)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .settings {
    height: 100%;
    background: @color-light;
    .avatar {
      height: 100%;
    }
  }

  .items {
    padding: 0 0.4rem;
    background: #fff;
  }
</style>
