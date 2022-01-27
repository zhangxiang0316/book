/**
* create by zx on 2021/12/17 14:10
* 类注释：
* 备注：
*/
<template>
  <div class="bookFrom">
    <van-nav-bar
      :fixed="true"
      left-arrow
      :safe-area-inset-top="true"
      :placeholder="true"
      title="书源设置"
      @click-left="$router.back()"
    />
    <van-cell v-for="(item,index) in bookFromList" :key="item.value" :title="item.name" @click="cellClick(item,index)">
      <template #right-icon>
        <i class="iconfont" :class="[item.show?'icon-eye':'icon-eye-none']" />
      </template>
    </van-cell>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BookFrom',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'bookFromList'
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
    cellClick(item) {
      item.show = !item.show
      this.changeSetting({ key: 'bookFromList', value: this.bookFromList })
      this.$toast(`查询时将 ${item.show ? '添加上' : ' 过滤掉 '} ${item.name} 书源`)
    }
  }
}
</script>

<style scoped>

</style>
