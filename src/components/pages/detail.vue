<template>
  <div class="detail optimize-scroll">
    <header-with-back>详情</header-with-back>
    <div class="container">
      <div class="dummy-detail-wrapper">
        <div class="detail-wrapper">
          <user-header class="detail-item" :user-info="userInfo"></user-header>
          <div class="detail-item content-wrapper">
            <div class="xaudio-wrapper">
              <x-audio v-if="essayDetail.voiceUrl" :src="essayDetail.voiceUrl"></x-audio>
            </div>
            <div class="essay-content">
              <div class="text-content">{{ essayDetail.content }}</div>
              <gallery :images="essayDetail.images"></gallery>
            </div>
          </div>
          <div class="detail-item essay-opr">
            <div class="opr-item">
              <i class="xicon xicon-up--b" @click="like"></i>
              <span>{{ essayDetail.likeNum }}</span>
            </div>
            <div class="opr-item">
              <i class="xicon xicon-collect--b" @click="collect"></i>
              <span>{{ essayDetail.collectNum }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="comment-desc">最新评论 共{{comment.items.length}}条</div>
        <div class="comment-items" :class="{ 'with-picker': showPicker }">
          <comment-item
            class="comment-item"
            v-for="(item, index) in comment.items"
            :key="index"
            :comment="item"
            @reply-this-comment="toReply"
          ></comment-item>
        </div>
        <div class="btm-sender-wrapper">
          <div class="inputer">
            <input
              type="text"
              class="reply-input"
              :placeholder="placeholder"
              @focus="showPicker = true"
              v-model="commentContent"
            >
            <i class="xicon xicon-send" @click="send"></i>
          </div>
          <!-- <smooth-picker
            v-show="showPicker"
            :data="pickerSlots"
            @change="handlePickerChange"
          ></smooth-picker> -->
          <!-- <mt-picker
            :slots="pickerSlots"
          ></mt-picker> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserHeader from '@/components/common/user-header'
  import XAudio from '@/components/common/x-audio'
  import Gallery from '@/components/common/gallery'
  import CommentItem from '@/components/common/comment-item'
  import HeaderWithBack from '@/components/common/header-with-back'
  import Picker from 'mint-ui'
  import {
    getEssayDetail,
    likeArticle,
    collectArticle,
    commentArticle
  } from '@/api'

  export default {
    name: 'detail',
    data () {
      return {
        showPicker: false,
        pickerSlots: [
          {
            list: [ '1', '2' ],
            values: [ '1', '2', '3', '4', '5' ]
          }
        ],
        userInfo: {
          userId: 0,
          avatar: '',
          nickName: '',
          follow: false
        },
        essayDetail: {
          contentId: '',
          title: '',
          content: '',
          images: [ ],
          voiceUrl: '',
          likeNum: 0,
          commentNum: 0,
          like: false,
          collect: false,
          hasVoice: true
        },
        comment: {
          commentPageNo: 0,
          contentId: 0,
          items: [ ]
        },
        recommendWords: [ ],
        toReplyComment: null,
        commentContent: ''
      }
    },
    methods: {
      like () {
        likeArticle({ contentId: this.essayDetail.contentId })
          .then(res => {
            if (!res.success) {
              return
            }
            this.essayDetail.likeNum ++
          })
      },
      collect () {
        if (this.essayDetail.collect) {
          return
        }
        collectArticle({ contentId: this.essayDetail.contentId })
          .then(res => {
            if (!res.success) {
              return
            }
            this.essayDetail.collect = true
          })
      },
      handlePickerChange (ctx, value) {
        // console.log(ctx, value)
      },
      toReply ({ comment }) {
        this.toReplyComment = comment
        this.$el.querySelector('.reply-input').focus()
        this.commentContent = ''
      },
      send () {
        let beCommentUserId = ''
        if (this.toReplyComment) {
          beCommentUserId = this.toReplyComment.commentUserInfo.userId
        }
        commentArticle({
          beCommentUserId,
          commentContent: this.commentContent,
          contentId: this.essayDetail.contentId
        })
          .then(res => {
            if (!res.success) {
              return
            }
            this.commentContent = ''
            return this.loadDetail()
          })
          .catch(ex => { /* Ignore */ })
      },
      loadDetail () {
        getEssayDetail({ contentId: this.$route.params.id })
          .then(res => {
            if (!res.success) {
              return
            }
            const data = res.data
            this.userInfo = data.userInfo
            this.comment = data.comment
            this.essayDetail = data.contentDetail
            this.recommendWords = data.recommendWords
          })
          .catch(ex => { /* Ignore */ })
      }
    },
    components: {
      UserHeader,
      XAudio,
      Gallery,
      CommentItem,
      HeaderWithBack,
      Picker
    },
    computed: {
      placeholder () {
        return !this.toReplyComment
          ? '请输入...'
          : `回复${this.toReplyComment.commentUserInfo.nickName}...`
      }
    },
    beforeMount () {
      this.loadDetail()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  @common-gap: 0.66rem;

  .detail {
    height: 100%;
    overflow: hidden;
  }

  .container {
    height: e('calc(100% - 1.17rem)');
    overflow-y: auto;
  }

  .dummy-detail-wrapper {
    background-color: #e0e0e0;
  }

  .detail-wrapper {
    padding-bottom: 0.53rem;
    margin-bottom: 0.26rem;
    background-color: #fff;

    .detail-item {
      padding: 0 0.4rem;
    }

    .user-header {
      height: 1.87rem; // 3.04rem;
      padding: 0.26rem 0.4rem;
      border-bottom: 1px solid @color-light;
    }
  }

  .comments {
    background-color: #fff;
  }

  .xaudio-wrapper {
    height: 1.97rem;
    padding: @common-gap 0;
  }

  .essay-content {
    padding: @common-gap 0;
  }

  .essay-opr {
    display: flex;
    justify-content: flex-end;
    color: @color-middle;

    .opr-item {
      margin-right: 0.4rem;
      .xicon {
        margin-right: 0.02rem;
      }
    }
  }

  .comments {
    padding-bottom: 1.33rem;

    .comment-desc {
      height: 0.8rem;
      line-height: 0.8rem;
      border-bottom: 1px solid #e0e0e0;
    }
    .comment-desc,
    .comment-items {
      padding: 0 0.4rem;
    }

    .comment-items {
      padding: @common-gap;

      .comment-item {
        margin-bottom: @common-gap;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .btm-sender-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;

    .inputer {
      position: relative;
      width: 100%;
      height: 1.33rem;
      padding: 0.2rem 0.26rem;
      background-color: #000;

      input {
        width: 100%;
        height: 100%;
        border-radius: 0.10rem;
        border: none;
        outline: none;
        padding: 0 calc(0.10rem + 0.26rem + 0.64rem) 0 0.10rem;
      }

      .xicon-send {
        position: absolute;
        right: 0.53rem;
        // top: 0.36rem;
        // 下面这样更精准一点
        top: 0;
        height: 100%;
      }
    }
  }
</style>
