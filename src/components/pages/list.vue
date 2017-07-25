<template>
  <div class="list">
    <x-header class="header" :items="categories" @to-certain-item="toItem"></x-header>
    <div class="essays optimize-scroll" @scroll="loadEassy">
      <essay-desc-item
        class="essay-desc-item"
        v-for="essay in essays"
        @click="toDetail(essay)"
        :item="essay"
        :key="essay.contentId"
      ></essay-desc-item>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { getCategories, getEssayList } from '@/api'
  import XHeader from '@/components/common/header'
  import EssayDescItem from '@/components/common/essay-desc-item'
  import { scrollTop, validScrollLoad } from '@/utils'

  export default {
    name: 's',
    data () {
      return {
        essays: [ ],
        loading: false
      }
    },
    computed: {
      ...mapGetters([ 'categories' ])
    },
    components: {
      XHeader,
      EssayDescItem
    },
    methods: {
      ...mapActions([ 'setCategories' ]),
      handleStart ({ imageUrl, referrer, categories }) {
        categories = categories.map(x => ({
          name: x.categoryName,
          code: x.categoryCode
        }))

        this.setCategories(categories)

        if (categories.length > 0) {
          this.toItem({ code: categories[0].code })
        }
      },
      toDetail (essay) {
        console.log('ex')
        this.$router.push({ name: 'detail', params: { id: essay.contentId } })
      },
      loadEassy () {
        const category = this.categories.find(x => x.active)
        if (!category) {
          return
        }
        if (!validScrollLoad(this.$el.querySelector('.essays'))) {
          return
        }
        if (category.end) {
          return
        }
        if (this.loading) {
          return
        }

        category.pageNo += 1
        this.loading = true
        getEssayList(category)
          .then(res => {
            res = res.data
            if (!res.success) {
              throw new Error('fail')
            }
            if (!res.data.items || res.data.items.length === 0) {
              category.end = true
              throw new Error('end')
            }

            this.essays = this.essays.concat(res.data.items)
            console.log(this.essays)
            this.loading = false
          })
          .catch(ex => {
            category.pageNo -= 1
            this.loading = false
          })
      },
      toItem ({ code }) {
        const category = this.categories.find(x => x.code === code)
        if (!category) {
          return
        }
        category.pageNo = 0
        category.end = false
        this.loading = true
        getEssayList(category)
          .then(res => {
            res = res.data
            if (!res.success) {
              return
            }
            const categories = this.categories.map(x => {
              x.active = x.code === code
              return x
            })

            this.setCategories(categories)

            this.essays = res.data.items

            scrollTop(this.$el.querySelector('.essays'))
            this.loading = false
          })
          .catch(ex => {
            this.loading = false
          })
      }
    },
    beforeMount () {
      getCategories()
        .then(res => {
          res = res.data
          if (!res.success) {
            return
          }
          const data = res.data
          this.handleStart({
            imageUrl: data.startImg.imgUrl,
            referrer: data.startImg.url,
            categories: data.categorys
          })
        })
        .catch(ex => { /* Ignore */ })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .list {
    position: relative;
    height: 100%;

    .header {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: 1.2rem;
      line-height: 1.2rem;
      z-index: 2;
    }
    .essays {
      position: relative;
      height: 100%;
      padding-top: 1.2rem;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 1;
      background: @color-light;

      .essay-desc-item {
        margin-bottom: 0.266rem;
        background-color: #fff;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
