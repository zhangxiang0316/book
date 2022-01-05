/**
* create by zx on 2022/1/4 09:03
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model="show" round position="bottom">
    <van-radio-group v-model="speed">
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SelectMultiple',
  components: {},
  props: {},
  data() {
    return {
      show: false,
      list: [
        { name: 'X 0.5', value: '0.5' },
        { name: 'X 0.75', value: '0.75' },
        { name: 'X 1', value: '1' },
        { name: 'X 1.25', value: '1.25' },
        { name: 'X 1.5', value: '1.5' },
        { name: 'X 1.75', value: '1.75' },
        { name: 'X 2', value: '2' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'speed'
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
    setMultiple(multiple) {
      this.show = false
      this.changeSetting({ key: 'speed', value: multiple })
      this.$emit('setMultiple')
    }
  }
}
</script>

<style scoped>

</style>
