<template>
  <div class="comment">
    <avatar class="comment-user-avatar">
      <img :src="comment.commentUserInfo.avatar">
    </avatar>
    <div class="center-wrapper">
      <div class="names">
        <span class="from">{{ comment.commentUserInfo.nickName }}</span>
        <template v-if="comment.beCommentUserName">
          <span class="reply">回复</span>
          <span class="to">{{ comment.beCommentUserName }}</span>
        </template>
      </div>
      <div class="time">2017.7.16 16:00</div>
    </div>
    <div class="right-wrapper">
      <i class="xicon xicon-up"></i>
      <i class="xicon xicon-comment"></i>
    </div>
  </div>
</template>

<script>
  import Avatar from './avatar'

  export default {
    name: 'comment',
    data () {
      return { }
    },
    props: {
      comment: {
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
  .comment {
    display: flex;
    justify-content: space-between;

    .comment-user-avatar {
      margin-right: 0.4rem;
    }

    .center-wrapper {
      margin-right: auto;

      .names {
        margin-bottom: 0.2rem;
      }
    }
  }
</style>
