/**
* create by zx on 2021/12/1 11:05
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model="show" position="bottom" :style="{ height: '50px' }">
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item>
        <span>目录</span>
        <template #icon>
          <i class="iconfont icon-mulu" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search">{{ isNight ? '日间' : '夜间' }}
        <template #icon>
          <i :class="[isNight ? 'icon-a-qingtianbaitian':' icon-yejianmoshi']" class="iconfont" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">设置
        <template #icon>
          <i class="iconfont icon-shezhi" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </van-popup>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BottomMenu',
  components: {},
  props: {
  },
  data() {
    return {
      show: false,
      active: -1
    }
  },
  computed: {
    ...mapGetters([
      'isNight'
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
    change(index) {
      this.show = false
      switch (index) {
        case 0:
          break
        case 1:
          if (this.isNight) {
            this.changeSetting({ key: 'backgroundColor', value: '#fff' })
            this.changeSetting({ key: 'color', value: '#333' })
            this.changeSetting({ key: 'isNight', value: false })
          } else {
            this.changeSetting({ key: 'backgroundColor', value: '#000' })
            this.changeSetting({ key: 'color', value: '#fff' })
            this.changeSetting({ key: 'isNight', value: true })
          }
          break
        case 2:
          break
      }
      this.$emit('change', index)
      setTimeout(() => {
        this.active = -1
      }, 10)
    }
  }
}
</script>

<style scoped>

</style>
