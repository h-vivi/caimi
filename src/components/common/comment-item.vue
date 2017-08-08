<template>
  <div class="comment">
    <avatar class="comment-user-avatar">
      <img :src="comment.commentUserInfo.avatar">
    </avatar>
    <div class="right">
      <div class="top">
        <div class="desc">
          <div class="names">
            <span class="from">{{ comment.commentUserInfo.nickName }}</span>
            <template v-if="comment.beCommentUserName">
              <span class="reply">回复</span>
              <span class="to">{{ comment.beCommentUserName }}</span>
            </template>
          </div>
          <div class="time"></div>
        </div>
        <div class="opr">
          <div class="up">
            <i class="xicon xicon-up" @click="like"></i>
            <span></span>
          </div>
          <div class="comment">
            <i class="xicon xicon-comment" @click="reply"></i>
            <span></span>
          </div>
        </div>
      </div>
      <div class="bottom comment-content">{{ comment.commentContent }}</div>
    </div>
  </div>
</template>

<script>
  import Avatar from './avatar'
  import { likeComment } from '@/api'

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
    methods: {
      like () {
        likeComment({ commentId: this.comment.commentId })
          .then(res => {
            if (!res.success) {
              return
            }
          })
        .catch(ex => { /* Ignore */ })
      },
      reply () {
        this.$emit('reply-this-comment', { comment: this.comment })
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

  .comment {
    display: flex;
    justify-content: space-between;
    line-height: 1.5;

    .comment-user-avatar {
      margin-right: 0.4rem;
    }

    .right {
      display: flex;
      flex-grow: 1;
      flex-direction: column;

      .top {
        display: flex;
        justify-content: space-between;
      }
      .bottom {
        padding-bottom: 0.66rem;
        border-bottom: 1px solid #e0e0e0;
      }
    }
    .desc {
      .reply {
        color: #77daf7;
      }
    }
    .opr {
      display: flex;
      .up {
        margin-right: 0.4rem;
        .xicon {
          margin-right: 0.13rem;
        }
      }
    }
  }
</style>
