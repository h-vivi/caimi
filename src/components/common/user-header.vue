<template>
  <div class="user-header">
    <avatar class="user-avatar"><img :src="userInfo.avatar"></avatar>
    <div class="center-wrapper">
      <div class="name">{{ userInfo.nickName }}</div>
      <slot></slot>
    </div>
    <div class="right-wrapper">
      <template v-if="userInfo.follow">已关注</template>
      <template v-else>+&nbsp;关注</template>
    </div>
  </div>
</template>

<script>
  import Avatar from './avatar'

  export default {
    name: 'user-header',
    props: {
      userInfo: {
        type: Object,
        required: true
      }
    },
    components: {
      Avatar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .user-header {
    display: flex;
    justify-content: space-between;

    .user-avatar {
      margin-right: 0.4rem;
    }

    .center-wrapper {
      margin-right: auto;

      .name {
        margin-bottom: 0.2rem;
      }
    }
  }

</style>
