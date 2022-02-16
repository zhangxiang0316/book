/**
* create by zhangxiang on 2021-11-30 21:47
* 类注释：
* 备注：
*/
<template>
  <div class="bookDetail">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      :title="title"
      left-arrow
      @click-right="$refs.bottomMenu.show = true"
      @click-left="$router.back()"
    >
      <template #right>
        <i class="iconfont icon-caidan" style="color:white;" />
      </template>
    </van-nav-bar>
    <div
      v-show="bookDetail.detail"
      style="font-size: 14px;line-height: 25px;padding:  10px"
      :style="{'background-color':backgroundColor,color:color,'font-size':fontSize+'px','line-height':lineHeight+'px'}"
      @click="$refs.bottomMenu.show = !$refs.bottomMenu.show"
    >
      <van-pull-refresh v-if="bookDetail.detail" v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :offset="10"
          :finished="finished"
          finished-text="没有更多了"
          @load="nextPage"
        >
          <div style="height: 20px" />
          <div />
          <div
            v-for="(item,index) in detailList"
            :key="index"
          >
            <div v-if="item.type==='title'" style="color: #9a6e3a">{{ item.value }}</div>
            <div v-else style="text-indent:30px">{{ item }}</div>
            <div style="height: 20px" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <bottom-menu ref="bottomMenu" @change="change" />
    <left-menu ref="leftMenu" :url="menuUrl" :now-url="detailUrl" :from="from" @loadData="load" />
    <detail-setting ref="detailSetting" />
  </div>
</template>

<script type="text/ecmascript-6">
import bottomMenu from '../components/bottomMenu'
import leftMenu from '../components/leftMenu'
import detailSetting from '../components/detailSetting'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BookDetail',
  components: {
    bottomMenu,
    leftMenu,
    detailSetting
  },
  props: {},
  data() {
    return {
      detailList: [],
      detailUrl: '',
      from: '',
      bookName: '',
      menuUrl: '',
      imgUrl: '',
      show: false,
      bookDetail: {},
      title: '',
      active: -1,
      loading: false,
      finished: false,
      refreshing: false,
      height: 0
    }
  },
  computed: {
    ...mapGetters([
      'backgroundColor',
      'fontSize',
      'lineHeight',
      'color',
      'isNight',
      'nowLookPage',
      'detailQuery'
    ])
  },
  watch: {},
  activated() {
  },
  mounted() {
    this.height = document.documentElement.clientHeight - 46 + 'px'
  },
  created() {
    this.from = this.detailQuery.from
    this.bookName = this.detailQuery.bookName
    this.detailUrl = this.detailQuery.detailUrl
    this.menuUrl = this.detailQuery.menuUrl
    this.imgUrl = this.detailQuery.imgUrl
    this.title = this.bookName
    this.loadData(true, true)
  },
  methods: {
    ...mapActions([
      'changeSetting'
    ]),
    onRefresh() {
      if (!this.bookDetail.previewUrl) {
        this.$toast('已经是第一章了')
        this.refreshing = false
        return
      }
      this.detailUrl = this.bookDetail.previewUrl
      this.loadData(false, true)
    },
    load(url) {
      this.detailUrl = url
      this.loadData(true, true)
    },
    change(index) {
      switch (index) {
        case 0:
          this.$refs.leftMenu.show = true
          break
        case 2:
          this.$refs.detailSetting.show = true
          break
      }
    },
    nextPage() {
      if (!this.bookDetail.nextUrl) {
        this.$toast('没有新章节了')
        return
      }
      this.detailUrl = this.bookDetail.nextUrl
      this.loadData(false, false)
    },
    loadData(flag, isRefresh) {
      flag && this.$loading.show()
      this.$http.get('/getBookDetail', {
        params: {
          detailUrl: this.detailUrl,
          type: this.from
        }
      }).then(res => {
        this.refreshing = false
        this.loading = false
        flag && this.$loading.hide()
        this.bookDetail = res
        this.title = this.bookDetail.title
        if (isRefresh) {
          this.detailList = this.bookDetail.detail
          this.detailList.unshift({ type: 'title', value: this.title })
          window.scrollTo(0, 0)
        } else {
          this.detailList.push({ type: 'title', value: this.title })
          this.detailList.push(...this.bookDetail.detail)
        }
        const index = this.nowLookPage.findIndex(item => item.menuUrl === this.menuUrl)
        const obj = {
          menuUrl: this.menuUrl,
          detailUrl: this.detailUrl,
          bookName: this.bookName,
          title: this.title,
          from: this.from,
          imgUrl: this.imgUrl
        }
        if (index !== -1) {
          this.nowLookPage.splice(index, 1)
        }
        this.nowLookPage.unshift(obj)
        this.changeSetting({
          key: 'nowLookPage',
          value: this.nowLookPage
        })
      }).catch(() => {
        this.refreshing = false
        this.loading = false
        flag && this.$loading.hide()
        this.$toast.fail('加载失败')
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.iconfont {
  font-size: 20px;
}

.van-tabbar-item--active {
  color: #646566;
}
</style>
