/**
* create by zx on 2021/12/9 11:34
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
      <virtual-list
        :style="{height:height}"
        style="overflow-y: auto;height:100%;"
        :data-key="'menuUrl'"
        :keeps="30"
        :start="0"
        :data-sources="list"
        :data-component="itemComponent"
        :extra-props="{
          cellClick:cellClick
        }"
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { sortBy, filter } from 'loadsh'
import virtualList from 'vue-virtual-scroll-list'
import searchItem from '../components/searchItem'

export default {
  name: 'Search',
  components: {
    virtualList
  },
  props: {},
  data() {
    return {
      itemComponent: searchItem,
      bookName: '',
      list: [],
      height: 0
    }
  },
  computed: {
    ...mapGetters([
      'bookFromList'
    ])
  },
  mounted() {
    this.height = document.documentElement.clientHeight - 46 + 'px'
  },
  methods: {
    cellClick(item) {
      this.$router.push({ name: 'menuList', query: { menuUrl: item.menuUrl, name: item.name, from: item.from }})
    },
    searchBook() {
      if (!this.bookName) {
        return
      }
      if (this.bookName === '我要看视频') {
        this.$router.push('/movieList')
        return
      }
      this.$loading.show()
      this.list = []
      this.bookFromList.forEach(item => {
        if (item.show) {
          this.$http.get('/search', {
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

<style scoped>

</style>
