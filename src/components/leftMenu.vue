/**
* create by zx on 2021/12/1 11:07
* 类注释：
* 备注：
*/
<template>
  <van-popup v-model="show" position="left" :style="{width:'80%',height:'100%'}">
    <van-cell v-for="(item,index) in list" :id="`list${index}`" :key="index" :title="item.name" @click="cellClick(item)" />
  </van-popup>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'LeftMenu',
  components: {},
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
      list: [],
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
    }, 2000)
  },
  methods: {
    loadData() {
      if (this.list.length) {
        const index = this.list.findIndex(item => item.url === this.nowUrl)
        if (index !== -1) {
          this.$nextTick(() => {
            this.show && document.getElementById(`list${index}`).scrollIntoView()
          })
          return
        }
      }
      this.$http.get('/getMenuList', { params: {
        bookUrl: this.url,
        type: this.from
      }}).then(res => {
        this.list = res.list
        const index = this.list.findIndex(item => item.url === this.nowUrl)
        this.$nextTick(() => {
          this.show && document.getElementById(`list${index}`).scrollIntoView()
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
