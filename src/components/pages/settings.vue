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
            <img :src="setting.avatar">
          </avatar>
        </template>
      </setting-item>
    </ul>
  </div>
</template>

<script>
  import HeaderWithBack from '@/components/common/header-with-back'
  import SettingItem from '@/components/common/setting-item'

  export default {
    name: 'settings',
    data () {
      return {
        settings: [
          {
            name: '头像',
            className: 'avatar',
            avatar: ''
          },
          {
            name: '用户名',
            className: 'nick-name',
            extra: '棉花糖'
          },
          {
            name: '设置密码',
            className: 'set-psd'
          },
          {
            name: '简介',
            className: 'synopsis',
            extra: '鲜花怒马少年时 一日看尽长安花'
          }
        ]
      }
    },
    components: {
      HeaderWithBack,
      SettingItem
    },
    methods: {
      handleClick () {
        console.log('x')
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
      height: 2.13rem;
    }
  }

  .items {
    padding: 0 0.4rem;
    background: #fff;
  }
</style>
