<template>
  <div class="story">
    <header-with-back :need-opr="true" oprBtnName="发送" @opr="sendMyStory">我的故事</header-with-back>
    <div class="content">
      <div class="inputer">
        <input type="text" class="title" placeholder="添加标题" v-model="title">
        <textarea class="detail" placeholder="添加内容" v-model="detail"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderWithBack from '@/components/common/header-with-back'
  import { sendStory } from '@/api'

  export default {
    name: 'story',
    data () {
      return {
        title: '',
        detail: ''
      }
    },
    methods: {
      sendMyStory () {
        sendStory({
          title: this.title,
          detail: this.detail
        })
          .then(res => {
            if (!res.sucess) {
              return
            }
          })
          .catch(ex => { /* Ignore */ })
      }
    },
    components: {
      HeaderWithBack
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .story {
    width: 100%;
    height: 100%;
  }

  .content {
    color: @color-deep;
    font-size: @font-size-larger;
  }

  .inputer {
    padding: 0 0.4rem;
    border-bottom: 1px solid @color-light;
    .detail, .title {
      width: 100%;
      outline: none;
      border: none;
    }

    .title {
      border-bottom: 1px solid @color-light;
      height: 1.33rem;
    }

    .detail {
      height: 5.5rem;
      padding-top: 0.5rem;
      resize: none;
    }
  }

</style>
