/**
* create by zhangxiang on 2022-01-02 09:53
* 类注释：
* 备注：
*/
<template>
  <div class="listenDetail">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      :title="listenDetail.bookName"
      left-arrow
      @click-left="$router.back()"
    />
    <div style="width: 100%;text-align: center;margin-top: 20px">
      <img class="img" :src="listenDetail.imgUrl" :class="{rotate:listenNow.isPlay}">
      <div style="font-size: 15px;margin-top: 10px">{{ detail.title }}</div>
      <div style="width: 100%;margin:10px auto;position: absolute;bottom:20px">
        <div style="line-height: 30px;margin-bottom: 20px">
          <span>速度：</span>
          <van-button
            style="width: 30px;margin-right: 10px"
            round
            type="info"
            size="small"
            icon="plus"
            @click="setSpeed(1)"
          />
          {{ speed }}
          <van-button
            round
            type="info"
            size="small"
            style="margin-left: 10px;width: 30px"
            icon="minus"
            @click="setSpeed(-1)"
          />
        </div>
        <div v-if="detail.url" style="display: flex;">
          <div style="width: 100px;text-align: right;margin-right: 10px">
            {{ parseInt(timeNow)|formTime }}
          </div>
          <van-slider
            v-model="timeNow"
            style="margin-top: 2px"
            :min="0"
            :max="totalTime"
            bar-height="8"
            button-size="16"
            @change="changeTime"
          />
          <div style="width: 100px;text-align: left;margin-left: 10px">
            {{ parseInt(totalTime)|formTime }}
          </div>
        </div>
        <div style="display: flex;margin-top: 20px;line-height: 40px">
          <div style="flex: 1;">
            <i class="iconfont icon-24gl-previousCircle" style="font-size: 30px" @click="pre" />
          </div>
          <div style="flex: 1;">
            <i
              class="iconfont"
              :class="[{'icon-zanting':listenNow.isPlay},{'icon-kaishi':!listenNow.isPlay}]"
              style="font-size:40px"
              @click="toPlay"
            />
          </div>
          <div style="flex: 1;">
            <i class="iconfont icon-24gl-nextCircle" style="font-size: 30px" @click="next" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex'
import { floor } from 'loadsh'

export default {
  name: 'ListenDetail',
  components: {},
  filters: {
    formTime(val) {
      if (!val) {
        return ''
      }
      if (val < 60) {
        return `${val}秒`
      } else {
        return `${parseInt(val / 60)}分${val % 60}秒`
      }
    }
  },
  props: {},
  data() {
    return {
      title: '',
      detail: {},
      audio: null,
      totalTime: 0,
      timeNow: 0,
      isPaused: false,
      speed: 1
    }
  },
  computed: {
    ...mapGetters([
      'listenDetail',
      'listenNow',
      'listenList'
    ]),
    percentage() {
      return parseInt(this.timeNow * 100 / this.totalTime) + ''
    }
  },
  activated() {
    if (this.$route.params.form !== 'ball') {
      this.play(this.listenDetail)
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'changeSetting'
    ]),
    init() {
      if (!this.audio) {
        this.audio = new Audio()
        this.audio.addEventListener('timeupdate', () => {
          this.totalTime = this.audio.duration
          if (parseInt(this.timeNow) >= parseInt(this.totalTime)) {
            this.listenDetail.url = this.detail.nextUrl
            this.changeSetting({ key: 'listenDetail', value: this.listenDetail })
            this.play(this.listenDetail)
          }
        })
      }
    },
    toPlay() {
      this.changeSetting({
        key: 'listenNow',
        value: { isPlay: !this.listenNow.isPlay }
      })
      if (!this.listenNow.isPlay) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
    },
    pre() {
      this.listenDetail.url = this.detail.previewUrl
      this.changeSetting({ key: 'listenDetail', value: this.listenDetail })
      this.play(this.listenDetail)
    },
    next() {
      this.listenDetail.url = this.detail.nextUrl
      this.changeSetting({ key: 'listenDetail', value: this.listenDetail })
      this.play(this.listenDetail)
    },
    setSpeed(type) {
      if (type > 0) {
        this.speed = this.speed + 0.1
      } else {
        this.speed = this.speed - 0.1
      }
      this.speed = floor(this.speed, 1)
      this.audio.playbackRate = this.speed
    },
    play(item) {
      this.$http.get('/tingshu/detail', {
        params: {
          detailUrl: item.url
        }
      }).then(res => {
        this.detail = res
        this.audio.src = res.url
        this.time = setInterval(() => {
          this.timeNow = this.audio.currentTime
        }, 500)
        this.changeSetting({
          key: 'listenNow',
          value: { isPlay: false }
        })
        this.toPlay()
        const index = this.listenList.findIndex(items => items.menuUrl === item.menuUrl)
        if (index === -1) {
          this.listenList.unshift(item)
          this.changeSetting({
            key: 'listenList',
            value: this.listenList
          })
        } else {
          this.listenList.splice(index, 1)
          this.listenList.unshift(item)
          this.changeSetting({
            key: 'listenList',
            value: this.listenList
          })
        }
      })
    },
    changeTime() {
      this.audio.currentTime = this.timeNow
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

.img {
  border-radius: 50%;
}
.rotate{
  animation: rotate 10s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
