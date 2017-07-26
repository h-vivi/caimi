<template>
  <div class="detail">
    <div class="detail-wrapper">
      <div class="header">
        <div class="back xicon xicon-back-white"></div>
        <h2 class="detail-head">详情</h2>
      </div>
      <user-header :user-info="userInfo">2017.7.12 16:40</user-header>
      <div class="content-wrapper">
        <div class="audio-wrapper">
          <img src="" alt="">
          <audio></audio>
        </div>
        <div class="text-content">{{ essayDetail.content }}</div>
        <gallery :images="essayDetail.images"></gallery>
      </div>
      <div class="essay-opr">
        <i class="xicon xicon-up"></i>
        <i class="xicon xicon-collect"></i>
      </div>
    </div>
    <div class="comments">
      <comment-item
        v-for="(item, index) in comment.items"
        :key="index"
        :comment="item"
      ></comment-item>
    </div>
  </div>
</template>

<script>
  import { getEssayDetail } from '@/api'
  import UserHeader from '@/components/common/user-header'
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
    methods: { },
    components: {
      UserHeader,
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

  .detail {
    height: 100%;
    padding: 0 0.4rem;
    overflow-x: hidden;
    overflow-y: auto;
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

  .user-header {
    height: 3.04rem;
    padding: 1.43rem 0 0.26rem 0;
    border-bottom: 1px solid @color-light;
  }

  .audio-wrapper {
    height: 1.97rem;
    padding: 0.66rem 0;
  }
</style>
