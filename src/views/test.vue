/**
* create by zx on 2021/12/22 10:12
* 类注释：
* 备注：
*/
<template>
  <div class="test">
    <div class="position-box">
      <better-scroll
        ref="scroll"
        class="wrapper"
        :pull-down-refresh="pullDownRefreshObj"
        :pull-up-load="pullUpLoadObj"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <ul class="list-content">
          <li
            v-for="item in items"
            :key="item"
            class="list-item"
          >{{ item }}</li>
        </ul>
      </better-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import betterScroll from '../components/betterScroll'
let count = 1
export default {
  name: 'Test',
  components: {
    betterScroll
  },
  props: {},
  data() {
    return {
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40,
        txt: '刷新完成'
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: -90,
        txt: {
          more: '上拉加载更多',
          noMore: '没有更多数据啦'
        }
      },
      items: []
    }
  },
  computed: {},
  activated() {
  },
  mounted() {
    this.onPullingDown()
  },
  created() {
  },
  methods: {
    // 模拟数据请求
    getData() {
      return new Promise(resolve => {
        setTimeout(() => {
          const arr = []
          for (let i = 0; i < 15; i++) {
            arr.push(count++)
          }
          resolve(arr)
        }, 1000)
      })
    },
    onPullingDown() {
      // 模拟下拉刷新
      console.log('下拉刷新')
      count = 0
      this.getData().then(res => {
        this.items = res
        this.$refs.scroll.forceUpdate(true)
      })
    },
    onPullingUp() {
      // 模拟上拉 加载更多数据
      console.log('上拉加载')
      this.getData().then(res => {
        this.items = this.items.concat(res)
        if (count < 100) {
          this.$refs.scroll.forceUpdate(true)
        } else {
          this.$refs.scroll.forceUpdate(false)
        }
      })
    }
  }
}
</script>

<style scoped>
.position-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.list-content {
  list-style: none;
  background: #fff;
}
.list-item {
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  padding-left: 20px;
  border-bottom: 1px solid #e5e5e5;
}
.go-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #009a61;
  border-radius: 5px;
  border: 1px solid #fff;
  color: #fff;
  padding: 10px 15px;
}
</style>
