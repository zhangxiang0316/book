/**
* create by zhangxiang on 2022-01-02 17:50
* 类注释：
* 备注：
*/
<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="评书"
      left-arrow
      @click-left="$router.back()"
    />
    <van-sticky :offset-top="46">
      <van-tabs v-model="active" @change="loadData">
        <van-tab v-for="(items,index) in listenTypeList" :key="index" :title="items.name" />
      </van-tabs>
    </van-sticky>
    <van-grid :column-num="3">
      <van-grid-item v-for="item in list" :key="item.menuUrl">
        <div style="text-align: center;width: 100%;" @click="cellClick(item)">
          <van-image
            width="80"
            height="100"
            lazy-load
            radius="10"
            :src="item.imgUrl"
          />
          <div style="font-size: 15px;line-height: 20px" class="list-name">{{ item.name }}</div>
          <div style="font-size: 13px;line-height: 18px">{{ item.author }}</div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script type="text/ecmascript-6">
import { pingshu } from '@/conf'
export default {
  name: 'Pingshu',
  data() {
    return {
      active: 0,
      listenTypeList: pingshu,
      list: []
    }
  },
  computed: {},
  activated() {
  },
  mounted() {
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$http.get('/tingshu/pingShuList', { params: {
        url: this.listenTypeList[this.active].value
      }}).then(res => {
        this.list = res
      })
    },
    cellClick(item) {
      this.$router.push({ name: 'listenMenuList', query: { name: item.name, menuUrl: item.menuUrl }})
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.list-name {
  width: 2.8rem;
  font-size: .28rem;
  line-height: 200%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
