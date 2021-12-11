/**
* create by zhangxiang on 2021-12-11 10:13
* 类注释：
* 备注：
*/
<template>
  <div
    class="van-ellipsis"
    style="line-height: 50px;font-size: 14px;margin:0 10px;border-bottom: 1px solid #eee"
    @click="cellClick(source)"
  >{{ source.name }}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'MenuItem',
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

<style scoped lang="less" rel="stylesheet/less">

</style>
