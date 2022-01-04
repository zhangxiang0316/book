/**
* create by zx on 2022/1/4 09:03
* 类注释：
* 备注：
*/
<template>
  <div class="selectMultiple">
    <van-popup v-model="show" round position="bottom">
      <van-radio-group v-model="speed">
        <van-cell-group>
          <van-cell title="X 0.5" clickable @click="setMultiple( '0.5')">
            <template #right-icon>
              <van-radio name="0.5" />
            </template>
          </van-cell>
          <van-cell title="X 0.75" clickable @click="setMultiple( '0.75')">
            <template #right-icon>
              <van-radio name="0.75" />
            </template>
          </van-cell>

          <van-cell title="X 1" clickable @click="setMultiple( '1')">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>

          <van-cell title="X 1.25" clickable @click="setMultiple( '1.25')">
            <template #right-icon>
              <van-radio name="1.25" />
            </template>
          </van-cell>
          <van-cell title="X 1.5" clickable @click="setMultiple( '1.5')">
            <template #right-icon>
              <van-radio name="1.5" />
            </template>
          </van-cell>
          <van-cell title="X 1.75" clickable @click="setMultiple( '1.75')">
            <template #right-icon>
              <van-radio name="1.75" />
            </template>
          </van-cell>
          <van-cell title="X 2" clickable @click="setMultiple( '2')">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SelectMultiple',
  components: {},
  props: {},
  data() {
    return {
      show: false
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
