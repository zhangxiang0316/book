/**
* create by zhangxiang on 2022-01-01 00:37
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
      right-text="倒序"
      @click-right="rightClick"
      @click-left="$router.back()"
    />
    <div ref="header">
      <div v-if="info.name" style="padding: 10px;display: flex">
        <div style="width: 80px">
          <van-image radius="6" width="75" height="100" :src="info.imgUrl" lazy-load />
        </div>
        <div style="line-height: 25px;margin-left: 10px">
          <div style="font-size: 20px;font-weight: 800">{{ info.name }}</div>
          <div style="font-size: 14px">{{ info.author }}</div>
          <div style="font-size: 14px">{{ info.type }}</div>
          <div style="font-size: 14px">{{ info.status }}</div>
        </div>
      </div>
      <div v-if="info.name" class="van-multi-ellipsis--l3" style="padding: 0 10px;font-size: 13px;line-height: 25px">
        简介： {{ info.disc }}
      </div>
    </div>
    <virtual-list
      :style="{height:height}"
      style="overflow-y: auto;"
      :data-key="'url'"
      :keeps="30"
      :start="0"
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
import menuItem from '@/components/menuItem'

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
      info: {},
      height: '',
      audio: null,
      totalTime: 0,
      timeNow: 0,
      bofang: {}
    }
  },
  computed: {},
  activated() {
    if (this.menuUrl !== this.$route.query.menuUrl) {
      this.menuUrl = this.$route.query.menuUrl
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
    rightClick() {
      this.list = this.list.reverse()
    },
    loadData() {
      this.showList = []
      this.$loading.show()
      this.$http.get('/tingshu/menuList', {
        params: {
          bookUrl: this.menuUrl
        }
      }).then(res => {
        this.$loading.hide()
        this.list = res.list
        this.info = res.info
        window.scrollTo(0, 0)
        this.$nextTick(() => {
          this.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight) - 46 + 'px'
        })
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
        }
      })
      this.play(item)
      // this.$router.push({
      //   name: 'bookDetail'
      // })
    },
    play(item) {
      if (!this.audio) {
        this.audio = new Audio()
        this.audio.addEventListener('timeupdate', () => {
          this.totalTime = this.audio.duration
          console.log(this.totalTime)
          if (parseInt(this.timeNow) >= parseInt(this.totalTime)) {
            this.play({ url: this.bofang.nextUrl })
          }
        })
      }
      this.$http.get('/tingshu/detail', {
        params: {
          detailUrl: item.url
        }
      }).then(res => {
        this.bofang = res
        this.audio.src = res.url
        console.log(this.audio.src)
        this.audio.play()
        this.time = setInterval(() => {
          this.timeNow = this.audio.currentTime
        }, 500)
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/ .van-nav-bar__text {
  color: white;
}
</style>
