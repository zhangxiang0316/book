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
        <i class="iconfont icon-caidan" />
      </template>
    </van-nav-bar>
    <div
      v-if="bookDetail.detail"
      style="font-size: 14px;line-height: 25px;padding:  10px"
      :style="{'background-color':backgroundColor,color:color,'font-size':fontSize+'px','line-height':lineHeight+'px'}"
      @click="$refs.bottomMenu.show = true"
    >
      <van-pull-refresh v-if="bookDetail.detail" v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :offset="10"
          :finished="finished"
          finished-text="没有更多了"
          @load="nextPage"
        >
          <div
            v-for="(item,index) in bookDetail.detail"
            :key="index"
            style="text-indent:30px"
          >{{ item }}
            <div style="height: 20px" />
          </div>
          <div style="height: 100px" />
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
      refreshing: false
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
  watch: {
  },
  activated() {
  },
  mounted() {
  },
  created() {
    this.from = this.detailQuery.from
    this.bookName = this.detailQuery.bookName
    this.detailUrl = this.detailQuery.detailUrl
    this.menuUrl = this.detailQuery.menuUrl
    this.imgUrl = this.detailQuery.imgUrl
    this.loadData(true)
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
      this.loadData()
    },
    load(url) {
      this.detailUrl = url
      this.loadData(true)
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
      this.loadData()
    },
    loadData(flag) {
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
        window.scrollTo(0, 0)
        const index = this.nowLookPage.findIndex(item => item.menuUrl === this.menuUrl)
        const obj = {
          menuUrl: this.menuUrl,
          detailUrl: this.detailUrl,
          bookName: this.bookName,
          title: this.title,
          from: this.from,
          imgUrl: this.imgUrl
        }
        if (index === -1) {
          this.nowLookPage.unshift(obj)
          this.changeSetting({
            key: 'nowLookPage',
            value: this.nowLookPage
          })
        } else {
          this.nowLookPage.splice(index, 1)
          this.nowLookPage.unshift(obj)
          this.changeSetting({
            key: 'nowLookPage',
            value: this.nowLookPage
          })
        }
      }).catch(() => {
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

/deep/ .van-overlay {
  background-color: transparent;
}
</style>
