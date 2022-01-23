/**
* create by zhangxiang on 2022-01-02 16:49
* 类注释：
* 备注：
*/
<template>
  <div class="search">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="图书搜索"
      left-arrow
      @click-left="$router.back()"
    />
    <van-search
      v-model="bookName"
      autofocus
      style="position: fixed;top:45px;width: 100%;z-index: 10"
      clearable
      shape="round"
      placeholder="请输入"
      @search="searchBook"
    />
    <div style="margin-top: 46px;width: 100%">
      <van-cell
        v-for="source in list"
        :key="source.menuUrl"
        :title="source.name"
        :label="`来源:${source.from}    ${source.author}`"
        is-link
        border
        @click="cellClick(source)"
      >
        <template #icon>
          <van-image
            style="margin-right: 10px"
            width="32"
            radius="3"
            height="40"
            error-icon="fail"
            :src="source.imgUrl?source.imgUrl:require('@/assets/img/nocover.jpg')"
          />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { filter, sortBy } from 'loadsh'

export default {
  name: 'Search',
  props: {},
  data() {
    return {
      bookName: '',
      list: [],
      bookFromList: [
        { name: '275听书', value: 'tingshuwang', show: true },
        { name: '听书宝', value: 'tingshubao', show: true },
        { name: '幻听网', value: 'huanting', show: true }

      ]
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    cellClick(item) {
      this.$router.push({ name: 'listenMenuList', query: { name: item.name, menuUrl: item.menuUrl, from: item.from }})
    },
    searchBook() {
      if (!this.bookName) {
        return
      }
      this.$loading.show()
      this.list = []
      this.bookFromList.forEach(item => {
        if (item.show) {
          this.$http.get('/tingshu/search', {
            params: {
              name: this.bookName,
              type: item.name
            }
          }).then(res => {
            const arr = res
            this.list = sortBy(filter([...this.list, ...arr], (item) => {
              return (item.name.indexOf(this.bookName) !== -1 || item.author.indexOf(this.bookName) !== -1)
            }), (item) => {
              return item.name.length
            })
            this.$loading.hide()
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
