/**
* create by zx on 2021/12/28 08:46
* 类注释：
* 备注：
*/
<template>
  <div class="setting">
    <van-nav-bar
      :fixed="true"
      left-arrow
      :border="false"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="设置"
      @click-left="$router.back()"
    />
    <van-cell title="还原配置" is-link @click="clear" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Setting',
  components: {},
  props: {},
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
  methods: {
    clear() {
      this.$dialog.confirm({
        title: '提示',
        message: '确认要还原配置吗？'
      }).then(() => {
        localStorage.clear()
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>

</style>
