/**
* create by zx on 2021/12/17 15:12
* 类注释：
* 备注：
*/
<template>
  <div class="history">
    <van-nav-bar
      :fixed="true"
      left-arrow
      :safe-area-inset-top="true"
      :placeholder="true"
      title="我的书架"
      @click-left="$router.back()"
    />
    <van-swipe-cell v-for="(item,index) in nowLookPage" :key="item.detailUrl">
      <van-cell :value="item.from">
        <template #title>
          <div class="van-ellipsis" style="width: 100%">{{ item.bookName }}</div>
        </template>
        <template #label>
          <div class="van-ellipsis" style="width: 100%">{{ item.title }}</div>
        </template>
        <template #icon>
          <van-image
            lazy-load
            error-icon="fail"
            :src="item.imgUrl?item.imgUrl:require('@/assets/img/nocover.jpg')"
            radius="3"
            width="32"
            height="40"
            style="margin-right: 10px"
          />
        </template>
      </van-cell>
      <template #right>
        <van-button style="height: 100%" square type="danger" text="删除" @click="del(index)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'History',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'nowLookPage'
    ])
  },

  activated() {
  },
  mounted() {
  },
  created() {
  },
  methods: {
    ...mapActions([
      'changeSetting'
    ]),
    del(index) {
      const list = this.nowLookPage.splice(index, 1)
      this.changeSetting({ name: 'nowLookPage', value: list })
    }
  }
}
</script>

<style scoped>

/deep/ .van-cell__title {
  flex: 1;
}

/deep/ .van-cell__value {
  width: 80px;
  flex: revert;
}

</style>
