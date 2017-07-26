<template>
  <div class="detail">
    <div class="header">
      <div class="back xicon xicon-back-white" @click="back"></div>
      <h2 class="detail-head">详情</h2>
    </div>
    <div class="dummy-detail-wrapper">
      <div class="detail-wrapper">
        <user-header class="detail-item" :user-info="userInfo">2017.7.12 16:40</user-header>
        <div class="detail-item content-wrapper">
          <div class="xaudio-wrapper">
            <x-audio></x-audio>
          </div>
          <div class="essay-content">
            <div class="text-content">{{ essayDetail.content }}</div>
            <gallery :images="essayDetail.images"></gallery>
          </div>
        </div>
        <div class="detail-item essay-opr">
          <div class="opr-item">
            <i class="xicon xicon-up--b"></i>
            <span>{{ essayDetail.likeNum }}</span>
          </div>
          <div class="opr-item">
            <i class="xicon xicon-collect--b"></i>
            <span>{{ essayDetail.collectNum }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="comment-desc">最新评论 共{{comment.items.length}}条</div>
      <div class="comment-items">
        <comment-item
          class="comment-item"
          v-for="(item, index) in comment.items"
          :key="index"
          :comment="item"
        ></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
  import { getEssayDetail } from '@/api'
  import UserHeader from '@/components/common/user-header'
  import XAudio from '@/components/common/x-audio'
  import Gallery from '@/components/common/gallery'
  import CommentItem from '@/components/common/comment-item'

  export default {
    name: 'detail',
    data () {
      return {
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
        recommendWords: [ ]
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    },
    components: {
      UserHeader,
      XAudio,
      Gallery,
      CommentItem
    },
    beforeMount () {
      getEssayDetail({ contentId: this.$route.params.id })
        .then(res => {
          res = res.data
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
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  @common-gap: 0.66rem;

  .detail {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .dummy-detail-wrapper {
    background-color: #e0e0e0;
    overflow: hidden;
  }

  .detail-wrapper {
    padding-top: 1.17rem;
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

  .header {
    width: 100%;
    color: #fff;
    height: 1.17rem;
    line-height: 1.17rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: @color-deep;
    padding: 0 0.26rem;
    .back {
      height: 1.17rem;
      float: left;
    }
    .detail-head {
      text-align: center;
    }
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
</style>
