/**
* create by zhangxiang on 2021-12-31 23:50
* 类注释：
* 备注：
*/
<template>
  <div class="index">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="听书"
    />
    <van-pull-refresh v-model="refreshing" @refresh="loadData">
      <van-sticky :offset-top="46">
        <van-search
          shape="round"
          placeholder="请输入"
          readonly
          @click="$router.push({name:'listenSearch'})"
        />
      </van-sticky>
      <van-tag v-for="item in menuList" :key="item.path" round color="#91DCD9" type="primary" @click="$router.push(item.path)">
        {{ item.name }}
      </van-tag>

      <div v-if="listenList.length">
        <van-sidebar>
          <van-sidebar-item title="我的书架" />
        </van-sidebar>
        <div style="border-bottom: 1px solid #eee" />
        <div class="recommand-wrap">
          <div ref="wrapper">
            <ul ref="cont" class="cont">
              <li
                v-for="item of listenList"
                :key="item.detailUrl"
                class="cont-item"
                @click="toDetail(item)"
              >
                <div class="cont-img">
                  <van-image width="80" height="100" lazy-load radius="10" class="img" :src="item.imgUrl?item.imgUrl:require('@/assets/img/nocover.jpg')" />
                </div>
                <div class="cont-dest van-ellipsis">{{ item.bookName }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <van-loading v-show="loading" style="text-align: center;margin-top: 20px" type="spinner" color="#1989fa">加载中...
      </van-loading>
      <div v-if="detail.list" style="margin-top: 10px">
        <div v-for="items in detail.list" :key="items.title">
          <div class="leftBar">
            {{ items.title }}
          </div>
          <van-grid :column-num="3">
            <van-grid-item v-for="item in items.list" :key="item.menuUrl">
              <div style="text-align: center;width: 100%;" @click="cellClick(item)">
                <van-image
                  width="80"
                  height="100"
                  lazy-load
                  radius="10"
                  :src="item.imgUrl"
                />
                <div style="font-size: 15px;line-height: 20px">{{ item.name }}</div>
                <div style="font-size: 13px;line-height: 18px">{{ item.author }}</div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <div v-if="detail.newBook">
        <div class="leftBar">
          {{ detail.newBook.title }}
        </div>
        <van-grid :column-num="1">
          <van-grid-item v-for="item in detail.newBook.list" :key="item.menuUrl">
            <div style="display: flex" @click="cellClick(item)">
              <van-image
                width="80"
                height="100"
                lazy-load
                radius="10"
                :src="item.imgUrl"
              />
              <div style="flex: 1;max-height: 100px;margin-left: 8px">
                <div style="font-size: 16px;line-height: 28px" class="van-ellipsis">{{ item.name }}</div>
                <div style="font-size: 13px;line-height: 28px" class="van-ellipsis">{{ item.author }}</div>
                <div style="font-size: 12px;line-height: 20px" class="van-multi-ellipsis--l3">
                  {{ item.disc.trim() }}
                </div>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <div v-if="detail.updateBook">
        <div class="leftBar">
          {{ detail.updateBook.title }}
        </div>
        <van-cell
          v-for="item in detail.updateBook.list"
          :key="item.menuUrl"
          :title="item.name"
          :value="item.type"
          :label="item.updateName"
        />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script type="text/ecmascript-6">
import { listenTypeList } from '@/conf'
import {mapActions, mapGetters} from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {
      menuList: [
        { name: '小说类型', path: '/bookTypeList' },
        { name: '排行榜', path: '/listenTypeList' }
      ],
      detail: {},
      active: 0,
      refreshing: false,
      typeList: listenTypeList,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'listenList'
    ])
  },
  activated() {
    this.$nextTick(() => {
      const timer = setTimeout(() => { // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
        if (timer) {
          clearTimeout(timer)
          this.verScroll()
        }
      }, 0)
    })
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
    toDetail(item) {
      this.changeSetting({
        key: 'listenDetail',
        value: {
          url: item.url,
          menuUrl: item.menuUrl,
          bookName: item.title,
          imgUrl: item.imgUrl
        }
      })
      this.$router.push({ name: 'listenDetail' })
    },
    verScroll() {
      if (this.listenList.length === 0) {
        return
      }
      const width = this.listenList.length * 100 + 20// 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
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
    loadData() {
      this.$http.get('/tingshu/home').then(res => {
        this.loading = false
        this.detail = res
        this.refreshing = false
      }).catch(() => {
        this.$toast('加载失败，请重新尝试')
        this.refreshing = false
        this.loading = false
      })
    },
    cellClick(item) {
      this.$router.push({ name: 'listenMenuList', query: { name: item.name, menuUrl: item.menuUrl }})
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

.recommand-wrap {
  height: 130px;
  margin-top: 10px;
  padding-bottom: 130px;
  background: #fff;
  width: 100%;

  .cont {
    list-style: none;
    white-space: nowrap;
    font-size: 12px;

    .cont-item {
      position: relative;
      display: inline-block;
      width: 80px;
      margin-left: 20px;

      .cont-img {
        position: relative;
        overflow: hidden;
        width: 80px;
        height: 100px;
        padding-bottom: 100%;

        .img {
          width: 100%;
        }

        .from {
          position: absolute; /*绝对定位*/
          height: 20px;
          line-height: 20px;
          text-align: center;
          width: 80px;
          background-color: #FF5722;
          color: #fff;
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          left: -18px;
          top: 9px;
        }
      }

      .cont-dest {
        text-align: center;
        width: 80px;
        margin: 10px 0;
      }
    }
  }
}

.leftBar {
  border-left: 3px solid #f00;
  padding-left: 5px;
  font-size: 16px;
  line-height: 16px;
  margin: 14px 0 14px 5px
}

.van-tag {
  padding: 5px 10px;
  margin: 10px 10px 0 10px;
}

/deep/ .van-grid-item__content--center {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  align-items: start;
}
</style>
