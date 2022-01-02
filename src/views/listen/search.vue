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
    <van-cell
      v-for="source in list"
      :key="source.menuUrl"
      :title="source.name"
      :label="`${source.author}`"
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
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Search',
  props: {},
  data() {
    return {
      bookName: '',
      list: []
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    cellClick(item) {
      this.$router.push({ name: 'listenMenuList', query: { name: item.name, menuUrl: item.menuUrl }})
    },
    searchBook() {
      if (!this.bookName) {
        return
      }
      this.$loading.show()
      this.list = []
      this.$http.get('/tingshu/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = res
        this.$loading.hide()
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
