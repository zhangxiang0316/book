/**
* create by zhangxiang on 2021-12-04 10:50
* 类注释：
* 备注：
*/
<template>
  <div class="home">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="首页"
      right-text="历史"
      @click-right="$router.push({ name: 'history' })"
    />
    <van-pull-refresh v-model="refreshing" @refresh="loadData">
      <div style="padding: 0 10px">
        <van-search v-model="bookName" shape="round" placeholder="请输入" @search="$router.push({name:'search',query:{bookName:bookName}})" />
      </div>
      <van-tag round type="primary" @click="$router.push('/topFifty')">排行榜</van-tag>
      <van-tag v-for="item in typeList" :key="item.value" round type="primary" @click="tagClick(item)">
        {{ item.name }}
      </van-tag>
      <div v-if="detail.hot">
        <van-sidebar>
          <van-sidebar-item :title="detail.hot.name" />
        </van-sidebar>
        <div class="van-hairline--top" />
        <van-grid :column-num="2">
          <van-grid-item v-for="item in detail.hot.list" :key="item.bookMenuUrl">
            <div style="display: flex" @click="cellClick(item)">
              <van-image
                width="80"
                height="100"
                lazy-load
                :src="item.imgUrl"
              />
              <div style="flex: 1;max-height: 100px;margin-left: 8px">
                <div style="font-size: 16px;line-height: 25px">{{ item.name }}</div>
                <div style="font-size: 14px;line-height: 28px">{{ item.author }}</div>
                <div style="font-size: 10px;line-height: 16px" class="van-multi-ellipsis--l3">{{ item.disc.trim() }}</div>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div v-if="detail.top">
        <van-sidebar>
          <van-sidebar-item :title="detail.top.name" />
        </van-sidebar>
        <div class="van-hairline--top" />
        <van-cell v-for="(item,index) in detail.top.list" :key="index" :title="`${item.name}`" :label="item.author" :value="item.type " @click="cellClick(item)" />
      </div>
      <div v-if="detail.block">
        <van-tabs v-model="active">
          <van-tab v-for="(item,index) in detail.block.list" :key="index" :title="item.name" />
        </van-tabs>
        <div class="van-hairline--top" />
        <template v-for="item in detail.block.list[active].list">
          <div v-if="item.imgUrl" :key="item.bookMenuUrl" style="display: flex;padding: 5px 10px" @click="cellClick(item)">
<!--            <img v-lazy="item.imgUrl" style="height: 80px;width: 60px;">-->
            <van-image
              width="60"
              height="80"
              lazy-load
              :src="item.imgUrl"
            />
            <div style="flex: 1;max-height: 80px;margin-left: 8px">
              <div style="font-size: 16px;line-height: 25px">{{ item.name }}</div>
              <div style="font-size: 14px;line-height: 28px">{{ item.author }}</div>
              <div style="font-size: 10px;line-height: 16px" class="van-multi-ellipsis--l3">{{ item.disc.trim() }}</div>
            </div>
          </div>
          <van-cell v-else :key="item.bookMenuUrl" :title="`${item.name}`" :label="item.author" :value="item.type " @click="cellClick(item)" />
        </template>
      </div>

    </van-pull-refresh>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {
      refreshing: false,
      active: 0,
      bookName: '',
      detail: {},
      typeList: [
        { name: '玄幻', value: 1 },
        { name: '武侠', value: 2 },
        { name: '都市', value: 3 },
        { name: '历史', value: 4 },
        { name: '网游', value: 5 },
        { name: '科幻', value: 6 },
        { name: '女生', value: 7 },
        { name: '完本', value: 0 }
      ]
    }
  },
  computed: {},
  created() {
    this.loadData()
  },
  methods: {
    cellClick(item) {
      this.$router.push({ name: 'menuList', query: { menuUrl: item.menuUrl, name: item.name, from: item.from }})
    },
    tagClick(item) {
      this.$router.push({ name: 'typeList', query: { sortid: item.value, title: item.name }})
    },
    loadData() {
      this.$http.get('/biquge/home').then(res => {
        this.detail = res
        this.refreshing = false
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.input {
  border-radius: 30px;
  margin-top: 10px;
  border: 1px solid #ccc;
}

.van-tag {
  padding: 5px 10px;
  margin: 10px 10px 0 10px;
}
.van-sidebar-item {
  padding: 10px 12px;
}

</style>
