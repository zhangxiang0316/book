/**
* create by zx on 2021/12/9 11:34
* 类注释：
* 备注：
*/
<template>
  <div class="search">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="图书搜索"
      left-arrow
      @click-left="$router.back()"
    />
    <van-search v-model="bookName" autofocus style="position: fixed;top:45px;width: 100%;z-index: 10" clearable shape="round" placeholder="请输入" @search="searchBook" />
    <div style="margin-top: 46px;width: 100%">
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.name"
        :label="`来源:${item.from}    ${item.author}`"
        @click="cellClick(item)"
      >
        <template #icon>
          <van-image
            style="margin-right: 10px"
            width="32"
            radius="3"
            height="40"
            lazy-load
            :src="item.imgUrl"
          />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'Search',
  components: {},
  props: {},
  data() {
    return {
      bookName: '',
      list: []
    }
  },
  computed: {},
  activated() {
  },
  methods: {
    cellClick(item) {
      this.$router.push({ name: 'menuList', query: { menuUrl: item.menuUrl, name: item.name, from: item.from }})
    },
    searchBook() {
      if (!this.bookName) {
        return
      }
      this.$loading.show()
      this.list = []

      this.$http.get('/biquge/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })

      this.$http.get('/wudi/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })

      this.$http.get('/xbiquge/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })

      this.$http.get('/xihongshi/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })

      this.$http.get('/fanqie/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })

      this.$http.get('/yongsheng/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })

      this.$http.get('/xbiqupao/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })

      this.$http.get('/biququ/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })

      this.$http.get('/bayi/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })
      this.$http.get('/danshu/search', {
        params: {
          name: this.bookName
        }
      }).then(res => {
        this.list = [...this.list, ...res].sort((a, b) => {
          return a.name.length - b.name.length
        })
        this.$loading.hide()
      })
    }
  }
}
</script>

<style scoped>

</style>
