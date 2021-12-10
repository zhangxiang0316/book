/**
* create by zhangxiang on 2021-12-04 10:50
* 类注释：
* 备注：
*/
<template>
  <div class="home">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="首页"
    />
    <van-pull-refresh v-model="refreshing" @refresh="loadData">
      <div style="padding: 0 10px">
        <van-search v-model="bookName" shape="round" placeholder="请输入" @search="$router.push({name:'search',query:{bookName:bookName}})" />
      </div>
      <van-tag round type="primary" @click="$router.push('/topFifty')">排行榜</van-tag>
      <van-tag v-for="item in typeList" :key="item.value" round type="primary" @click="tagClick(item)">
        {{ item.name }}
      </van-tag>
      <van-sidebar>
        <van-sidebar-item title="历史" />
      </van-sidebar>
      <div class="recommand-wrap">
        <div ref="wrapper">
          <ul ref="cont" class="cont">
            <li v-for="item of nowLookPage" :key="item.detailUrl" class="cont-item">
              <div v-longPress="deleteItem" class="cont-img " >
                <img class="img" :src="item.imgUrl" @click="toDetail(item)">
              </div>
              <div class="cont-dest van-ellipsis">{{ item.bookName }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="detail.hot">
        <van-sidebar>
          <van-sidebar-item :title="detail.hot.name" />
        </van-sidebar>
        <div class="van-hairline--top" />
        <van-grid :column-num="2">
          <van-grid-item v-for="item in detail.hot.list" :key="item.bookMenuUrl">
            <div style="display: flex" @click="cellClick(item)">
              <van-image
                width="80"
                height="100"
                lazy-load
                :src="item.imgUrl"
              />
              <div style="flex: 1;max-height: 100px;margin-left: 8px">
                <div style="font-size: 16px;line-height: 25px">{{ item.name }}</div>
                <div style="font-size: 14px;line-height: 28px">{{ item.author }}</div>
                <div style="font-size: 10px;line-height: 16px" class="van-multi-ellipsis--l3">{{ item.disc.trim() }}</div>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div v-if="detail.top">
        <van-sidebar>
          <van-sidebar-item :title="detail.top.name" />
        </van-sidebar>
        <div class="van-hairline--top" />
        <van-cell v-for="(item,index) in detail.top.list" :key="index" :title="`${item.name}`" :label="item.author" :value="item.type " @click="cellClick(item)" />
      </div>
      <div v-if="detail.block">
        <van-tabs v-model="active" sticky>
          <van-tab v-for="(item,index) in detail.block.list" :key="index" :title="item.name" />
        </van-tabs>
        <div class="van-hairline--top" />
        <template v-for="item in detail.block.list[active].list">
          <div v-if="item.imgUrl" :key="item.bookMenuUrl" style="display: flex;padding: 5px 10px" @click="cellClick(item)">
            <van-image
              width="60"
              height="80"
              lazy-load
              :src="item.imgUrl"
            />
            <div style="flex: 1;max-height: 80px;margin-left: 8px">
              <div style="font-size: 16px;line-height: 25px">{{ item.name }}</div>
              <div style="font-size: 14px;line-height: 28px">{{ item.author }}</div>
              <div style="font-size: 10px;line-height: 16px" class="van-multi-ellipsis--l3">{{ item.disc.trim() }}</div>
            </div>
          </div>
          <van-cell v-else :key="item.bookMenuUrl" :title="`${item.name}`" :label="item.author" :value="item.type " @click="cellClick(item)" />
        </template>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script type="text/ecmascript-6">

import { mapActions, mapGetters } from 'vuex'
import BScroll from 'better-scroll'

export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {
      refreshing: false,
      active: 0,
      bookName: '',
      detail: {},
      typeList: [
        { name: '玄幻', value: 1 },
        { name: '武侠', value: 2 },
        { name: '都市', value: 3 },
        { name: '历史', value: 4 },
        { name: '网游', value: 5 },
        { name: '科幻', value: 6 },
        { name: '女生', value: 7 },
        { name: '完本', value: 0 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'nowLookPage'
    ])
  },
  created() {
    this.loadData()
  },
  mounted() {
    this.$nextTick(() => {
      const timer = setTimeout(() => { // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
        if (timer) {
          clearTimeout(timer)
          this.verScroll()
        }
      }, 0)
    })
  },
  methods: {
    ...mapActions([
      'changeSetting'
    ]),
    deleteItem() {
      console.log('222222222')
    },
    verScroll() {
      const width = this.nowLookPage.length * 100 - 20// 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
      this.$refs.cont.style.width = width + 'px' // 修改滚动区域的宽度
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh() // 如果dom结构发生改变调用该方法
        }
      })
    },
    cellClick(item) {
      this.$router.push({ name: 'menuList', query: { menuUrl: item.menuUrl, name: item.name, from: item.from }})
    },
    tagClick(item) {
      this.$router.push({ name: 'typeList', query: { sortid: item.value, title: item.name }})
    },
    loadData() {
      this.$http.get('/biquge/home').then(res => {
        this.detail = res
        this.refreshing = false
      })
    },
    toDetail(item) {
      this.changeSetting({
        key: 'detailQuery',
        value: {
          detailUrl: item.detailUrl,
          menuUrl: item.menuUrl,
          bookName: item.bookName,
          from: item.from,
          imgUrl: item.imgUrl
        }
      })
      this.$router.push({
        name: 'bookDetail'
      })
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.input {
  border-radius: 30px;
  margin-top: 10px;
  border: 1px solid #ccc;
}

.van-tag {
  padding: 5px 10px;
  margin: 10px 10px 0 10px;
}
.van-sidebar-item {
  padding: 10px 12px;
}

.recommand-wrap {
  height: 130px;
  padding-bottom: 130px;
  background: #fff;
  width: 100%;
  .cont {
    list-style: none;
    white-space: nowrap;
    font-size: 12px;
    text-align: center;
    .cont-item {
      position: relative;
      display: inline-block;
      width: 80px;
      margin-left: 20px;
      .cont-img {
        overflow: hidden;
        width: 80px;
        height: 100px;
        padding-bottom: 100%;
        .img {
          width: 100%;
        }
      }
      .cont-dest {
        width: 80px;
        margin: 10px 0;
      }
    }
  }
}

</style>
