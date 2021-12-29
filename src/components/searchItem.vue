/**
* create by zx on 2021/12/29 10:21
* 类注释：
* 备注：
*/
<template>
  <van-cell
    :title="source.name"
    :label="`来源:${source.from}    ${source.author}`"
    is-link
    border
    @click="cellClick(source)"
  >
    <template #icon>
      <van-image
        style="margin-right: 10px"
        width="32"
        radius="3"
        height="40"
        error-icon="fail"
        :src="source.imgUrl?source.imgUrl:require('@/assets/img/nocover.jpg')"
      />
    </template>
  </van-cell>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'SearchItem',
  components: {},
  props: {
    // 每一行的索引,基础props，不用传递
    index: {
      type: Number,
      default() {
        return 0
      }
    },
    // 每一行的内容,基础props，不用传递
    source: {
      type: Object,
      default() {
        return {}
      }
    },
    // eslint-disable-next-line
    cellClick: Function
  },
  data() {
    return {}
  },
  computed: {},
  activated() {
  },
  mounted() {
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
