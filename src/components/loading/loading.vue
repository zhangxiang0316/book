/**
* create by zx on 2021/12/10 10:37
* 类注释：
* 备注：
*/
<template>
  <van-popup
    v-model="show"
    :close-on-click-overlay="false"
    :overlay-style="{'background-color': '#00000000'}"
  >
    <van-loading v-if="show" vertical type="spinner" text-color="#91DCD9" color="#91DCD9">加载中...</van-loading>
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
