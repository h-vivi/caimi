<template>
  <div class="essay-desc-item">
    <template v-if="item.type === 'content'">
      <div class="user">
        <img class="avatar" :src="item.userInfo.avatar">
        <div class="name">{{ item.userInfo.nickName }}</div>
        <div class="follow" @click="followUser(item)">
          <template v-if="item.userInfo.follow">已关注</template>
          <template v-else>+&nbsp;关注</template>
        </div>
      </div>
      <div class="content-wrapper" @click="handleOnContentClick">
        <div class="gallery-wrapper">
          <gallery :images="item.images"></gallery>
          <div :class="{ 'has-voice': item.hasVoice }"></div>
        </div>
        <div class="desc">{{ item.content }}</div>
      </div>
      <div class="opr">
        <div class="up">
          <i class="xicon xicon-up" :class="{ 'xicon-up--liked': item.like }"></i>
          {{ item.likeNum }}
        </div>
        <div class="comment">
          <i class="xicon xicon-comment"></i>
          {{ item.commentNum }}
        </div>
        <div class="time">
          2017.7.12 16:40
        </div>
      </div>
    </template>
    <template v-if="item.type === 'banner'">
      <a :href="item.url">
        <img class="image" :src="item.imageUrl">
      </a>
    </template>
  </div>
</template>

<script>
  import Gallery from '@/components/common/gallery'
  import { submitFollowUser } from '@/api'

  export default {
    name: 'essay-desc-item',
    data () {
      return { }
    },
    props: {
      item: {
        default () {
          return { userInfo: { }, images: [ ] }
        }
      }
    },
    components: {
      Gallery
    },
    methods: {
      handleOnContentClick () {
        this.$emit('item-content-click', this.item)
      },
      followUser (item) {
        submitFollowUser({
          followUserId: item.userInfo.userId
        })
          .then(res => {
            if (!res.success) {
              throw new Error('fail')
            }
            item.userInfo.follow = true
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .user {
    color: @color-deep;
    height: 1.92rem;
    padding: 0.32rem 0.4rem 0.26rem;
    font-size: @font-size-large;
    .avatar {
      height: 1.33rem;
      width: 1.33rem;
      float: left;
    }
    .name {
      float: left;
      height: 1.33rem;
      line-height: 1.33rem;
      margin-left: 0.4rem;
    }
    .follow {
      float: right;
      height: 1.33rem;
      line-height: 1.33rem;
    }
  }

  .gallery-wrapper {
    position: relative;
    .has-voice {
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
      width: 1.33rem;
      height: 1.33rem;
      background: url(../../assets/has-voice.png) center center no-repeat;
      background-size: 100%;
    }
  }
  .image-list[type='1'] {
    .image-list-item {
      width: 100%;
    }
  }
  .image-list[type='2'] {
    .image-list-item {
      width: 49%;
    }
    .image-list-item[index='0'] {
      margin-right: 2%;
    }
  }

  .image-list[type='3'] {
    .image-list-item {
      float: left;
    }
    .image-list-item[index='0'] {
      width: 6.64rem;
      margin-right: 0.13rem;
    }
    .image-list-item[index='1'],
    .image-list-item[index='2'] {
      width: 3.22rem;
    }
    .image-list-item[index='1'] {
      margin-bottom: 0.18rem;
    }
  }

  .desc {
    color: @color-deep;
    font-size: @font-size-middle;
    width: 9.2rem;
    padding: 0.66rem 0;
    margin: 0 auto;
    line-height: 0.53rem;
    border-bottom: 1px solid @color-light;
  }

  .opr {
    color: @color-middle;
    padding: 0.4rem;
    height: 1.3rem;
    font-size: @font-size-middle;
    .up {
      margin-right: 0.56rem;
    }
    .up,
    .comment {
      float: left;
      line-height: 0.5rem;
      .xicon {
        margin-right: 0.16rem;
      }
    }
    .time {
      float: right;
      line-height: 0.5rem;
    }
  }

  .image {
    width: 100%;
  }

</style>
