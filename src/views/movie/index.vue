/**
* create by zx on 2022/6/7 09:45
* 类注释：
* 备注：
*/
<template>
  <div class="index" style="width: 100%;height: 800px">
    <vue-waterfall-easy :imgs-arr="list" @scrollReachBottom="getData" @click="clickItem">
      <div slot-scope="props" class="img-info">
        <p class="some-info" style="line-height: 30px">{{ props.value.title }}</p>
      </div>
    </vue-waterfall-easy>
  </div>
</template>

<script type="text/ecmascript-6">
import vueWaterfallEasy from 'vue-waterfall-easy'
// import allList from '../../../static/movie.json'

const allList = []
export default {
  name: 'Index',
  components: {
    vueWaterfallEasy
  },
  props: {},
  data() {
    return {
      list: [],
      page: 0// request param
    }
  },
  computed: {},
  activated() {
  },
  mounted() {
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.page++
      this.list.push(...allList.slice(this.page * 10, (this.page + 1) * 10).map(item => {
        return {
          src: item.mv_img_url,
          href: 'https://www.baidu.com',
          info: item.mv_play_url,
          title: item.mv_title
        }
      }))
      // for (let i = 0; i < 20; i++) {
      //   this.list.push({
      //     src: `https://picsum.photos/${Math.round(Math.random() * 100 + 100)}/${Math.round(Math.random() * 300 + 50)}?random=${Math.random() * 10000000}`,
      //     href: 'https://www.baidu.com',
      //     info: 'this is a picture index: ' + this.group + '-' + i,
      //     title: 'this is a title index: ' + this.group + '-' + i
      //   })
      // }
    },
    clickItem(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault()
      console.log(index, value)
      this.$router.push({
        path: '/movieDetail',
        query: {
          img: value.src,
          movieUrl: value.info,
          title: value.title
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
