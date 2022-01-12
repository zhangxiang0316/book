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
    <div style="text-align: center;margin-top: 20px">
      <div
        :style="{width:imgWidth+'px',height:imgWidth+'px'}"
        class="imgbac"
      >
        <img
          class="img"
          :src="listenDetail.imgUrl"
          :style="{width:imgWidth-80+'px',height:imgWidth-80+'px'}"
          :class="{rotate:listenNow.isPlay}"
        >
      </div>
      <div style="font-size: 15px;margin-top: 20px">
        {{ detail.title }}
      </div>
      <div style="width: 100%;position: absolute;bottom:20px">
        <div style="display: flex">
          <div style="margin: 20px;flex: 1" @click="$refs.clocking.show=true">
            <div><i class="iconfont icon-kuaijinmiao-" style="font-size: 30px;color: #888" /></div>
            <div style="margin: 10px">定时</div>
          </div>
          <div style="margin: 20px;flex: 1" @click="$refs.selectMultiple.show=true">
            <div><i class="iconfont icon-Group-" style="font-size: 30px;color: #888" /></div>
            <div style="margin: 10px"> x {{ speed }}</div>
          </div>
          <div style="margin: 20px;flex: 1" @click="$refs.leftMenu.show=true">
            <div><i class="iconfont icon-bofangliebiao" style="font-size: 30px;color: #888" /></div>
            <div style="margin: 10px">播放列表</div>
          </div>
        </div>
        <div v-if="totalTime>0" style="display: flex;">
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
        <div style="display: flex;margin-top: 20px;line-height: 40px;padding: 0 10%">
          <div style="flex:1">
            <i class="iconfont icon-kuaituimiao-" style="font-size: 30px" @click="tui" />
          </div>
          <div style="flex: 3;">
            <i class="iconfont icon-24gl-previousCircle" style="font-size: 30px" @click="pre" />
          </div>
          <div style="flex: 3;">
            <i
              class="iconfont"
              :class="[{'icon-zanting':listenNow.isPlay},{'icon-kaishi':!listenNow.isPlay}]"
              style="font-size:40px"
              @click="toPlay"
            />
          </div>
          <div style="flex: 3;">
            <i class="iconfont icon-24gl-nextCircle" style="font-size: 30px" @click="next" />
          </div>
          <div style="flex:1">
            <i class="iconfont icon-kuaijinmiao-" style="font-size: 30px" @click="kuai" />
          </div>
        </div>
      </div>
    </div>
    <select-multiple ref="selectMultiple" @setMultiple="setSpeed" />
    <left-menu ref="leftMenu" :url="listenDetail.menuUrl" :now-url="listenDetail.url" @loadData="play" />
    <clocking ref="clocking" />
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex'
import selectMultiple from './components/selectMultiple'
import leftMenu from './components/leftMenu'
import clocking from './components/clocking'

export default {
  name: 'ListenDetail',
  components: {
    leftMenu,
    selectMultiple,
    clocking
  },
  filters: {
    formTime(val) {
      if (!val) {
        return ''
      }
      if (val < 60) {
        return `0分${val}秒`
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
      imgWidth: 0
    }
  },
  computed: {
    ...mapGetters([
      'listenDetail',
      'listenNow',
      'listenList',
      'speed'
    ]),
    percentage() {
      return parseInt(this.timeNow * 100 / this.totalTime) + ''
    }
  },
  activated() {
    if (this.$route.params.form !== 'ball') {
      this.play()
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.imgWidth = document.body.clientWidth * 0.7
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
          this.timeNow = this.audio.currentTime
          if (this.audio.ended) {
            this.time = null
            this.listenDetail.url = this.detail.nextUrl
            this.changeSetting({ key: 'listenDetail', value: this.listenDetail })
            this.play()
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
      this.setSpeed()
    },
    kuai() {
      if (this.audio.currentTime < this.totalTime) {
        this.audio.currentTime += 15
      }
    },
    tui() {
      if (this.audio.currentTime > 15) {
        this.audio.currentTime -= 15
      } else {
        this.audio.currentTime = 0
      }
    },
    pre() {
      this.listenDetail.url = this.detail.previewUrl
      this.changeSetting({ key: 'listenDetail', value: this.listenDetail })
      this.play()
    },
    next() {
      this.listenDetail.url = this.detail.nextUrl
      this.changeSetting({ key: 'listenDetail', value: this.listenDetail })
      this.play()
    },
    setSpeed() {
      this.audio.playbackRate = this.speed
    },
    play() {
      this.$http.get('/tingshu/detail', {
        params: {
          detailUrl: this.listenDetail.url
        }
      }).then(res => {
        this.detail = res
        this.audio.src = res.url
        this.changeSetting({
          key: 'listenNow',
          value: { isPlay: false }
        })
        this.toPlay()
        const index = this.listenList.findIndex(listen => listen.menuUrl === this.listenDetail.menuUrl)
        if (index === -1) {
          this.listenList.unshift(this.listenDetail)
          this.changeSetting({
            key: 'listenList',
            value: this.listenList
          })
        } else {
          this.listenList.splice(index, 1)
          this.listenList.unshift(this.listenDetail)
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
.iconfont {
  color: #888;
}

.imgbac {
  background: url("../../assets/img/img-bg.png");
  background-size: 100%;
  margin-left: 15%;

  .img {
    border-radius: 50%;
    margin-top: 40px;
  }
}

.rotate {
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
