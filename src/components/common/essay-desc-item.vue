<template>
  <div class="essay-desc-item">
    <template v-if="item.type === 'content'">
      <user-header class="user-header-container" :user-info="item.userInfo" :showFollow="showFollow" :showOpr="showOpr" @show-opr-sht="emitShowSht"></user-header>
      <div class="content-wrapper" @click="handleOnContentClick">
        <div class="gallery-wrapper">
          <gallery :images="item.images"></gallery>
          <div :class="{ 'has-voice': item.hasVoice }"></div>
        </div>
        <div class="desc">{{ item.content }}</div>
      </div>
      <div class="opr">
        <div class="up">
          <i class="xicon xicon-up" :class="{ 'xicon-up--liked': item.like }" @click="addLike"></i>
          {{ item.likeNum }}
        </div>
        <div class="comment">
          <i class="xicon xicon-comment"></i>
          {{ item.commentNum }}
        </div>
        <div class="time"></div>
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
  import UserHeader from '@/components/common/user-header'
  import { likeArticle } from '@/api'

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
      },
      showFollow: {
        required: true
      },
      showOpr: { }
    },
    components: {
      Gallery,
      UserHeader
    },
    methods: {
      emitShowSht () {
        this.$emit('show-opr-sht')
      },
      handleOnContentClick () {
        this.$emit('item-content-click', this.item)
      },
      addLike () {
        if (this.item.like === true) {
          return
        }
        likeArticle({ contentId: this.item.contentId })
          .then(res => {
            if (!res.success) {
              return
            }
            this.item.likeNum ++
            this.item.like = true
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .user-header-container {
    padding: 0.32rem 0.4rem 0.26rem;
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
    font-size: @font-size-large;
    padding: 0.66rem 0;
    margin: 0 0.4rem;
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
