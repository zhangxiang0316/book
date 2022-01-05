/**
* create by zx on 2022/1/5 15:27
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model="show" round position="bottom">
    <van-radio-group v-model="time">
      <van-cell-group>
        <van-cell v-for="item in list" :key="item.value" :title="item.name" clickable @click="setMultiple(item.value)">
          <template #right-icon>
            <van-radio :name="item.value" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </van-popup>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Clocking',
  components: {},
  props: {},
  data() {
    return {
      time: 0,
      show: false,
      list: [
        { name: '播放完本集', value: '-1' },
        { name: '15分钟', value: '15' },
        { name: '30分钟', value: '30' },
        { name: '60分钟', value: '60' },
        { name: '90分钟', value: '90' },
        { name: '不开启', value: '0' }
      ]
    }
  },
  methods: {
    setMultiple(value) {
      this.show = false
      this.$toast('开发中。。。')
      this.$emit('setClock', value)
    }
  }
}
</script>

<style scoped>

</style>
