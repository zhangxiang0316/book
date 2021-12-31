/**
* create by zx on 2021/12/17 11:24
* 类注释：
* 备注：
*/
<template>
  <div class="layout">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar v-model="active" route active-color="#91DCD9" placeholder>
      <van-tabbar-item replace to="/home">
        <template #icon>
          <i class="iconfont icon-shouye" />
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/listen">
        <template #icon>
          <i class="iconfont icon-touting" />
        </template>
        听书
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine">
        <template #icon>
          <i class="iconfont icon-wode" />
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Layout',
  components: {},
  props: {},
  data() {
    return {
      active: 0
    }
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
