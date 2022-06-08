/**
* create by zx on 2022/6/7 09:45
* 类注释：
* 备注：
*/
<template>
  <div class="index" style="width: 100%;height: 800px">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="视频"
      left-arrow
      @click-left="$router.back()"
    />
    <vue-waterfall-easy :imgs-arr="list" @scrollReachBottom="getData" @click="clickItem" style="margin-top: 60px">
      <div slot="waterfall-head">
        <van-search
          v-model="movieName"
          autofocus
          style="position: fixed;top:45px;width: 100%;z-index: 10"
          clearable
          shape="round"
          placeholder="请输入"
          @search="loadData"
        />
      </div>
      <div slot-scope="props" class="img-info">
        <p class="some-info" style="line-height: 30px">{{ props.value.title }}</p>
      </div>
    </vue-waterfall-easy>
  </div>
</template>

<script type="text/ecmascript-6">
import vueWaterfallEasy from 'vue-waterfall-easy'
import axios from 'axios'
export default {
  name: 'Index',
  components: {
    vueWaterfallEasy
  },
  props: {},
  data() {
    return {
      list: [],
      page: 0,
      movieName: ''
    }
  },
  computed: {},
  activated() {
  },
  mounted() {
  },
  created() {
    console.log('created')
    this.getData()
  },
  methods: {
    loadData() {
      this.page = 0
      this.getData()
    },
    getData() {
      if (this.page === 0) {
        this.list = []
      }
      this.page++
      axios.get('http://127.0.0.1:9999/movie/movieList', {
        params: {
          page: this.page,
          pageSize: 15,
          keyWord: this.movieName
        },
        headers: {
          movie: true
        }
      }).then(res => {
        const list = res.data.data.list.map(item => {
          return {
            src: item.mv_img_url,
            href: 'https://www.baidu.com',
            info: item.mv_play_url,
            title: item.mv_title
          }
        })
        this.list.push(...list)
      })
      // for (let i = 0; i < 20; i++) {
      //   this.list.push({
      //     src: `https://picsum.photos/${Math.round(Math.random() * 100 + 100)}/${Math.round(Math.random() * 300 + 50)}?random=${Math.random() * 10000000}`,
      //     href: 'https://www.baidu.com',
      //     info: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
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
