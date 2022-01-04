/**
* create by zx on 2022/1/4 10:26
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model="show" position="right" :style="{width:'80%'}" style="margin-top: 46px">
    <virtual-list
      :start="selectIndex"
      style="height:1000px; overflow-y: auto;"
      :data-key="'url'"
      :keeps="30"
      :data-sources="list"
      :data-component="itemComponent"
      :extra-props="{
        cellClick:cellClick
      }"
    />
  </van-popup>
</template>

<script type="text/ecmascript-6">
import virtualList from 'vue-virtual-scroll-list'
import menuItem from '@/components/menuItem'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'LeftMenu',
  components: {
    virtualList
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    nowUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      itemComponent: menuItem,
      list: [],
      selectIndex: 0,
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'listenDetail'
    ])
  },
  watch: {
    show(val) {
      if (val) {
        this.loadData()
      }
    }
  },
  mounted() {
  },
  created() {
    this.loadData()
  },
  methods: {
    ...mapActions([
      'changeSetting'
    ]),
    loadData() {
      if (this.list.length) {
        this.$nextTick(() => {
          this.selectIndex = this.list.findIndex(item => item.url === this.nowUrl)
        })
        return
      }
      this.$http.get('/tingshu/menuList', {
        params: {
          bookUrl: this.url
        }
      }).then(res => {
        this.list = res.list
        this.$nextTick(() => {
          this.selectIndex = this.list.findIndex(item => item.url === this.nowUrl)
        })
      })
    },
    cellClick(item) {
      this.listenDetail.url = item.url
      this.changeSetting({ key: 'listenDetail', value: this.listenDetail })
      this.$emit('loadData', this.listenDetail)
      this.show = false
    }
  }
}
</script>

<style scoped>

</style>
