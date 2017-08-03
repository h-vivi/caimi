<template>
  <div class="user-header">
    <avatar class="user-avatar"><img :src="userInfo.avatar"></avatar>
    <div class="center-wrapper">
      <div class="name">{{ userInfo.nickName }}</div>
      <slot></slot>
    </div>
    <div class="right-wrapper" @click="toggleFollowStatus">
      <template v-if="userInfo.follow">已关注</template>
      <template v-else>+&nbsp;关注</template>
    </div>
  </div>
</template>

<script>
  import Avatar from './avatar'
  import { submitFollowUser } from '@/api'

  export default {
    name: 'user-header',
    methods: {
      toggleFollowStatus () {
        if (this.userInfo.follow === true) {
          return
        }
        submitFollowUser({
          followUserId: this.userInfo.userId
        })
        .then(res => {
          if (!res.success) {
            throw new Error('fail')
          }
          this.userInfo.follow = true
        })
      }
    },
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
  @import '~styles/vars.less';

  .user-header {
    display: flex;
    justify-content: space-between;

    .user-avatar {
      margin-right: 0.4rem;
    }

    .center-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-right: auto;
      color: @color-middle;
      font-size: @font-size-middle;

      .name {
        margin-bottom: 0.2rem;
        color: @color-deep;
        font-size: @font-size-large;
      }
    }

    .right-wrapper {
      color: @color-deep;
      font-size: @font-size-large;
      display: flex;
      align-items: center;
    }
  }

</style>
