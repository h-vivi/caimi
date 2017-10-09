<template lang="html">
  <div class="list">
    <div class="story-head">
      <div class="back xicon xicon-back-white" @click="back"></div>
      我的收藏
    </div>
    <div class="essays optimize-scroll" @scroll="scrollLoad">
      <essay-desc-item
        class="essay-desc-item"
        v-for="essay in essays"
        @item-content-click="toDetail(essay)"
        :item="essay"
        :key="essay.contentId"
        :showFollow="true"
      ></essay-desc-item>
    </div>
  </div>
</template>

<script>
  import { loadCollectList } from '@/api'
  import EssayDescItem from '@/components/common/essay-desc-item'
  import { validScrollLoad } from '@/utils'

  export default {
    name: 'storyList',
    data () {
      return {
        showSht: false,
        oprContentId: 0,
        pageNo: 0,
        loading: false,
        essays: [ ],
        actions: [
          {
            name: '删除',
            method: this.deleteStory
          }
        ]
      }
    },
    computed: {
      essayListDom () {
        return this.$el.querySelector('.essays')
      }
    },
    components: {
      EssayDescItem
    },
    methods: {
      back () {
        this.$router.back()
      },
      toDetail (essay) {
        this.$router.push({ name: 'detail', params: { id: essay.contentId } })
      },
      scrollLoad () {
        if (!validScrollLoad(this.essayListDom)) {
          return
        }
        this.loadCollectList()
      },
      loadCollectList () {
        if (this.end || this.loading) {
          return Promise.resolve()
        }

        this.pageNo += 1
        this.loading = true
        return loadCollectList({ pageNo: this.pageNo })
          .then(res => {
            if (!res.success) {
              throw new Error('fail')
            }
            if (!res.data.items || res.data.items.length === 0) {
              this.end = true
              throw new Error('end')
            }

            this.essays = this.essays.concat(res.data.items)

            this.loading = false
          })
          .catch(ex => {
            this.pageNo -= 1
            this.loading = false
          })
      }
    },
    beforeMount () {
      this.loadCollectList()
    }
  }
</script>

<style scoped lang="less">
  @import '~styles/vars.less';
  .list {
    position: relative;
    height: 100%;
  }
  .story-head {
    height: 1.17rem;
    line-height: 1.17rem;
    color: #fff;
    text-align: center;
    background: @color-deep;
    font-size: @font-size-large;
    .back {
      float: left;
      margin: 0.3rem 0 0 0.4rem;
    }
  }

  .essays {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: @color-light;
    height: e('calc(100% - 1.17rem)');

    .essay-desc-item {
      background-color: #fff;
      margin-bottom: 0.26rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
