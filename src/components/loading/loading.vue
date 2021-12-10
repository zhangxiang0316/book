/**
* create by zx on 2021/12/10 10:37
* 类注释：
* 备注：
*/
<template>
  <van-popup
    v-model="show"
    :close-on-click-overlay="false"
    :overlay-style="{'background-color': '#00000055'}"
  >
    <van-loading v-if="show" vertical type="spinner" text-color="#93C0EE" color="#93C0EE">加载中...</van-loading>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }

}
</script>

<style scoped lang="less" rel="stylesheet/less">
.van-popup{
  background-color: transparent;
  color: white;
}
</style>
