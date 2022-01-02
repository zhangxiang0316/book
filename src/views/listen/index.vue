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
  computed: {},
  activated() {
  },
  mounted() {
  },
  created() {
    this.loadData()
  },
  methods: {
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
