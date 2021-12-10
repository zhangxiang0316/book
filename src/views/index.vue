/**
* create by zhangxiang on 2021-11-30 21:47
* 类注释：
* 备注：
*/
<template>
  <div class="index">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="图书搜索"
      left-arrow
      right-text="历史"
      @click-left="$router.back()"
      @click-right="rightClick"
    />

    <van-field
      v-model="bookName"
      center
      clearable
      class="input"
      placeholder="请输入图书名称"
      @keyup.enter.native="searchBook"
    />
    <!--    <van-tag round type="primary" @click="$router.push('/topFifty')">排行榜</van-tag>-->
    <!--    <van-tag v-for="item in typeList" :key="item.value" round type="primary" @click="tagClick(item)">{{ item.name }}</van-tag>-->
    <div style="margin-top: 20px">
      <van-cell
        v-for="(item,index) in bookList"
        :key="index"
        :title="item.name"
        :label="`来源 :${item.from}     ${item.author}`"
        @click="cellClick(item)"
      >
        <template #icon>
          <img v-lazy="item.imgUrl" style="width: 40px;height: 40px;margin-right: 10px">
        </template>
      </van-cell>
    </div>
    <van-loading v-show="loading" type="spinner" vertical>加载中...</van-loading>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'

export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {
      typeList: [
        { name: '玄幻', value: 1 },
        { name: '武侠', value: 2 },
        { name: '都市', value: 3 },
        { name: '历史', value: 4 },
        { name: '网游', value: 5 },
        { name: '科幻', value: 6 },
        { name: '女生', value: 7 },
        { name: '完本', value: 0 }
      ],
      bookName: '',
      bookList: [],
      loading: false
    }
  },
  computed: {},
  activated() {
    if (this.bookName !== this.$route.query.bookName) {
      this.bookName = this.$route.query.bookName
      this.searchBook()
    }
  },
  mounted() {
  },
  created() {
  },
  methods: {
    tagClick(item) {
      this.$router.push({ name: 'typeList', query: { sortid: item.value, title: item.name }})
    },
    searchBook() {
      this.bookList = []
      this.loading = true
      axios.get(this.$BASE_URL + 'getBookList', {
        params: {
          bookName: this.bookName
        }
      }).then(res => {
        this.loading = false
        this.bookList = res.data
      })
    },
    cellClick(item) {
      this.$router.push({ name: 'menuList', query: { url: item.url, name: item.name, from: item.from }})
    },
    rightClick() {
      this.$router.push({ name: 'history' })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.index {
  padding: 0 10px;

  .van-cell {
    border-bottom: 1px solid #ccc;
  }
  .van-tag{
    padding: 5px 10px;
    margin: 10px;
  }
}

</style>
