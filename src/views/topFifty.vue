/**
* create by zx on 2021/12/3 14:27
* 类注释：
* 备注：
*/
<template>
  <div class="topFifty">
    <van-nav-bar
      :fixed="true"
      left-arrow
      :safe-area-inset-top="true"
      :placeholder="true"
      title="TOP50"
      @click-left="$router.back()"
    />
    <van-row>
      <van-col style="overflow-y: auto;" :style="{height:height}">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item v-for="(item,index) in list" :key="index" :title="getTitle(item.name)" />
        </van-sidebar>
      </van-col>
      <van-col span="16" style="overflow-y: auto" :style="{height:height}">
        <div v-if="list.length" style="overflow-y: scroll">
          <van-cell v-for="(item,index) in list[activeKey].list" :key="index" :title="item.name" :label="item.author" @click="cellClick(item)" />
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'TopFifty',
  components: {},
  props: {},
  data() {
    return {
      activeKey: 0,
      list: [],
      height: '0'
    }
  },
  computed: {},
  activated() {
  },
  mounted() {
    this.height = document.documentElement.clientHeight - 53 + 'px'
  },
  created() {
    this.loadData()
  },
  methods: {
    getTitle(name) {
      return name.split('排行')[0]
    },
    cellClick(item) {
      this.$router.push({ name: 'menuList', query: { menuUrl: item.menuUrl, name: item.name, from: item.from }})
    },
    loadData() {
      this.$loading.show()
      this.$http.get('/biquge/top').then(res => {
        this.$loading.hide()
        this.list = res
      }).catch(() => {
        this.$toast('加载失败')
        this.$loading.hide()
      })
    }
  }
}
</script>

<style scoped>

</style>
