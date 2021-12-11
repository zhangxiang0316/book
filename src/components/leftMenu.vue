/**
* create by zx on 2021/12/1 11:07
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model="show" position="left" :style="{width:'80%'}" style="margin-top: 46px">
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
import menuItem from './menuItem'

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
    from: {
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
  computed: {},
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
    setTimeout(() => {
      this.loadData()
    }, 1500)
  },
  methods: {
    onRefresh() {

    },
    loadData() {
      if (this.list.length) {
        this.$nextTick(() => {
          this.selectIndex = this.list.findIndex(item => item.url === this.nowUrl)
        })
        return
      }
      this.$http.get('/getMenuList', {
        params: {
          bookUrl: this.url,
          type: this.from
        }
      }).then(res => {
        this.list = res.list
        this.$nextTick(() => {
          this.selectIndex = this.list.findIndex(item => item.url === this.nowUrl)
        })
      })
    },
    cellClick(item) {
      this.$emit('loadData', item.url)
      this.show = false
    }
  }
}
</script>

<style scoped>

</style>
