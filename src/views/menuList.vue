/**
* create by zhangxiang on 2021-11-30 21:47
* 类注释：
* 备注：
*/
<template>
  <div class="menuList">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      :title="title"
      left-arrow
      @click-left="$router.back()"
    />
    <div v-if="info.name" style="padding: 10px;display: flex">
      <van-image radius="10" width="85" height="100" :src="info.imgUrl" />
      <div style="line-height: 25px;margin-left: 10px">
        <div style="font-size: 20px;font-weight: 800">{{ info.name }}</div>
        <div style="font-size: 14px">{{ info.author }}</div>
        <div style="font-size: 14px">{{ info.status }}</div>
        <div style="font-size: 14px">{{ info.updataTime }}</div>
      </div>
    </div>
    <div v-if="info.name" class="van-multi-ellipsis--l3" style="padding: 0 10px;font-size: 13px;line-height: 25px">
      简介： {{ info.disc }}
    </div>
    <virtual-list
      style="height:1000px; overflow-y: auto;"
      :data-key="'url'"
      :keeps="30"
      :data-sources="list"
      :data-component="itemComponent"
      :extra-props="{
        cellClick:cellClick
      }"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import virtualList from 'vue-virtual-scroll-list'
import menuItem from '../components/menuItem'
export default {
  name: 'MenuList',
  components: {
    virtualList
  },
  props: {},
  data() {
    return {
      itemComponent: menuItem,
      list: [],
      menuUrl: '',
      bookUrl: '',
      from: '',
      title: '',
      info: {}
    }
  },
  computed: {},
  activated() {
    if (this.menuUrl !== this.$route.query.menuUrl) {
      this.menuUrl = this.$route.query.menuUrl
      this.from = this.$route.query.from
      this.title = this.$route.query.name
      this.info = {}
      this.list = []
      this.loadData()
    }
  },
  mounted() {
  },
  created() {
  },
  methods: {
    ...mapActions([
      'changeSetting'
    ]),
    loadData() {
      this.showList = []
      this.$loading.show()
      this.$http.get('/getMenuList', {
        params: {
          bookUrl: this.menuUrl,
          type: this.from
        }
      }).then(res => {
        this.$loading.hide()
        this.list = res.list
        this.info = res.info
      }).catch(() => {
        this.$loading.hide()
        this.$toast('加载出错')
      })
    },
    cellClick(item) {
      this.changeSetting({
        key: 'detailQuery',
        value: {
          detailUrl: item.url,
          menuUrl: this.menuUrl,
          bookName: this.title,
          from: item.from,
          imgUrl: this.info.imgUrl
        }})
      this.$router.push({
        name: 'bookDetail'
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
