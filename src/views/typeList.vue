/**
* create by zx on 2021/12/3 13:15
* 类注释：
* 备注：
*/
<template>
  <div class="typeList">
    <van-nav-bar
      :fixed="true"
      left-arrow
      :safe-area-inset-top="true"
      :placeholder="true"
      :title="$route.query.title"
      @click-left="$router.back()"
    />
    <van-pull-refresh v-if="list.length" v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :offset="10"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item,index) in list"
          :key="index"
          :title="item.name"
          :label="`来源 :${item.from}     ${item.author}`"
          @click="cellClick(item)"
        >
          <template #icon>
            <van-image :src="item.imgUrl" width="30" height="40" style="margin-right: 10px"></van-image>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TypeList',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      page: 1,
      sortid: 0,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  computed: {},
  activated() {
    if (this.sortid !== this.$route.query.sortid) {
      this.sortid = this.$route.query.sortid
      this.loadData(true)
    }
  },
  mounted() {
  },
  created() {
  },
  methods: {
    onRefresh() {
      this.loadData(true)
    },
    onLoad() {
      this.loadData(false)
    },
    loadData(isRefresh) {
      if (isRefresh) {
        this.page = 1
        this.list = []
        this.$loading.show()
      }
      this.$http.get('/biquge/bookListByType', {
        params: {
          page: this.page,
          sortid: this.sortid
        }
      }).then(res => {
        this.$loading.hide()
        this.loading = false
        this.finished = res.length < 15
        this.refreshing = false
        this.page++
        this.list.push(...res)
      }).catch(() => {
        this.$loading.hide()
        this.$toast('加载错误')
      })
    },
    cellClick(item) {
      this.$router.push({ name: 'menuList', query: { menuUrl: item.menuUrl, name: item.name, from: item.from }})
    }
  }
}
</script>

<style scoped>

</style>
