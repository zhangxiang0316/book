/**
* create by zhangxiang on 2022-01-01 01:19
* 类注释：
* 备注：
*/
<template>
  <div class="bookTypeList">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="图书分类"
      left-arrow
      @click-left="$router.back()"
    />
    <van-sticky :offset-top="46">
      <van-tabs v-model="active" @change="changeType">
        <van-tab v-for="(items,index) in listenBookType" :key="index" :title="items.name" />
      </van-tabs>
      <van-tabs v-model="isNew" @change="changeNew">
        <van-tab title="最新" />
        <van-tab title="最热" />
      </van-tabs>
    </van-sticky>
    <van-list
      v-model="loading"
      :offset="10"
      :finished="finished"
      finished-text="没有更多了"
      @load="nextPage"
    >
      <van-grid :column-num="1">
        <van-grid-item v-for="item in list" :key="item.menuUrl">
          <div style="display: flex" @click="cellClick(item)">
            <van-image
              width="80"
              height="100"
              lazy-load
              radius="10"
              :src="item.imgUrl"
            />
            <div style="flex: 1;max-height: 100px;margin-left: 8px">
              <div style="font-size: 16px;line-height: 28px" class="van-ellipsis">{{ item.name }}</div>
              <div style="font-size: 13px;line-height: 28px" class="van-ellipsis">{{ item.author }}</div>
              <div style="font-size: 12px;line-height: 20px" class="van-multi-ellipsis--l3">
                {{ item.disc.trim() }}
              </div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { listenBookType } from '@/conf'
export default {
  name: 'BookTypeList',
  components: {},
  props: {},
  data() {
    return {
      detail: {},
      list: [],
      active: 0,
      listenBookType: listenBookType,
      isNew: 0,
      loading: false,
      finished: false
    }
  },
  computed: {},
  activated() {
  },
  mounted() {
  },
  created() {
    this.loadData(this.listenBookType[this.active].value, true)
  },
  methods: {
    cellClick(item) {
      this.$router.push({ name: 'listenMenuList', query: { name: item.name, menuUrl: item.menuUrl }})
    },
    nextPage() {
      this.detail.nextPage && this.loadData(this.detail.nextPage)
    },
    changeType() {
      this.isNew = 0
      this.loadData(this.listenBookType[this.active].value, true)
    },
    changeNew() {
      this.loadData(this.isNew === 0 ? this.detail.new : this.detail.hot, true)
    },
    loadData(url, isRefresh) {
      this.$http.get('/tingshu/bookTypeList', { params: {
        url: url
      }}).then(res => {
        this.loading = false
        this.detail = res
        if (isRefresh) {
          window.scrollTo(0, 0)
          this.list = this.detail.list
        } else {
          this.list = [...this.list, ...this.detail.list]
        }
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
