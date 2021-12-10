/**
* create by zx on 2021/12/1 16:41
* 类注释：
* 备注：
*/
<template>
  <div class="history">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="历史记录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell
      v-for="(item,index) in nowLookPage"
      :key="index"
      :title="item.bookName"
      :label="item.title"
      :value="item.from"
      @click="cellClick(item)"
    >
      <template #icon>
        <van-image
          style="margin-right: 10px"
          width="35"
          height="45"
          lazy-load
          :src="item.imgUrl"
        />
      </template>
    </van-cell>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'

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
    cellClick(item) {
      this.changeSetting({
        key: 'detailQuery',
        value: {
          detailUrl: item.detailUrl,
          menuUrl: item.menuUrl,
          bookName: item.bookName,
          from: item.from,
          imgUrl: item.imgUrl
        }
      })
      this.$router.push({
        name: 'bookDetail'
      })
    }
  }
}
</script>

<style scoped>
.history {
  padding: 10px;
}

.van-cell__title {
  flex: 2;
}

</style>
