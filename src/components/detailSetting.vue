/**
* create by zx on 2021/12/1 14:49
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model="show" position="bottom">
    <van-form label-width="40px">
      <van-field name="checkboxGroup" label="字号:" style="line-height: 30px">
        <template #input>
          <van-button style="width: 80px" round type="info" size="small" icon="plus" @click="setFontSize(1)" />
          <van-button round type="info" size="small" style="margin-left: 20px;width: 80px" icon="minus" @click="setFontSize(-1)" />
        </template>
      </van-field>
      <van-field name="checkboxGroup" label="间距:" style="line-height: 30px">
        <template #input>
          <van-button style="width: 80px" round type="info" size="small" icon="plus" @click="setLineHeight(1)" />
          <van-button round type="info" size="small" style="margin-left: 20px;width: 80px" icon="minus" @click="setLineHeight(-1)" />
        </template>
      </van-field>
      <van-field name="checkboxGroup" label="背景:" style="line-height: 30px">
        <template #input>
          <van-button style="width: 30px;height: 30px; background: #FAF9DE" round type="info" size="small" @click="setBackColor('#FAF9DE')" />
          <van-button round type="info" size="small" style="margin-left: 14px;height: 30px;width: 30px;background:#E3EDCD" @click="setBackColor('#E3EDCD')" />
          <van-button round type="info" size="small" style="margin-left: 14px;width: 30px;height: 30px;background: #BCC8BC" @click="setBackColor('#BCC8BC')" />
          <van-button round type="info" size="small" style="margin-left: 14px;height: 30px;width: 30px;background: #CCE8CF" @click="setBackColor('#CCE8CF')" />
          <van-button round type="info" size="small" style="margin-left: 14px;height: 30px;width: 30px;background: #CEE2E0" @click="setBackColor('#CEE2E0')" />
          <van-button round type="info" size="small" style="margin-left: 14px;height: 30px;width: 30px;background:#DCE2F1" @click="setBackColor('#DCE2F1')" />
          <van-button round type="info" size="small" style="margin-left: 14px;height: 30px;width: 30px;background:#E9EBFE" @click="setBackColor('#E9EBFE')" />
        </template>
      </van-field>
    </van-form>
  </van-popup>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DetailSetting',
  components: {},
  props: {},
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'backgroundColor',
      'fontSize',
      'lineHeight',
      'color'
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
    setFontSize(type) {
      this.changeSetting({ key: 'fontSize', value: this.fontSize + type })
    },
    setLineHeight(type) {
      this.changeSetting({ key: 'lineHeight', value: this.lineHeight + type })
    },
    setBackColor(color) {
      this.changeSetting({ key: 'backgroundColor', value: color })
      this.changeSetting({ key: 'color', value: '#333' })
      this.changeSetting({ key: 'isNight', value: false })
    }
  }
}
</script>

<style scoped>

</style>
