/**
* create by zx on 2021/12/17 11:30
* 类注释：
* 备注：
*/
<template>
  <div class="mine">
    <van-nav-bar
      :fixed="true"
      :border="false"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="我的"
      @click-right="$router.push('/setting')"
    >
      <template #right>
        <van-icon name="setting-o" color="#1989fa" size="20" />
      </template>
    </van-nav-bar>
    <div class="top">
      <div class="top-mine">
        <div style="text-align: center;margin-top: 20px">
          <van-image round :src="require('../assets/img/head.jpeg')" width="50" height="50" />
          <div style="font-size: 15px ;color: white;margin-top: 10px">欢迎回来！</div>
        </div>
      </div>
    </div>
    <van-cell title="书源设置" is-link icon-prefix="iconfont" icon="ziyuan1" @click="$router.push({name:'bookFrom'})" />
    <van-cell
      title="我的书架"
      is-link
      icon-prefix="iconfont"
      icon="jiachang_shujia"
      @click="$router.push({name:'history'})"
    />
    <van-cell
      title="下载地址"
      is-link
      icon-prefix="iconfont"
      icon="jiachang_shujia"
      @click="show=true"
    />

    <van-dialog v-model="show" title="地址" show-cancel-button style="text-align: center">
      <img style="width: 200px;height: 250px" src="@/assets/img/download.png">
    </van-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Mine',
  components: {},
  props: {},
  data() {
    return {
      show: false
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

<style scoped lang="less" rel="stylesheet/less">
.mine {
  height: 100%;
  background: #fefeef;

  .top {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;

    .setting {
      position: absolute;
      right: 20px;
      top: 20px
    }

    .top-mine {
      position: absolute;
      left: -25%;
      width: 150%;
      height: 150px;
      border-bottom-left-radius: 100%;
      border-bottom-right-radius: 100%;
      background: linear-gradient(0deg, rgba(145, 220, 217, 0.1) 0%, rgba(145, 220, 217, 1) 100%);
    }
  }

}

</style>
