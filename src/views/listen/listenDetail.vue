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
    <div style="text-align: center;margin-top: 20px;">
      <div style="position: absolute;right: 18%" class="zhizhen">
        <img src="@/assets/img/zhen.png" class="zhen" :class="[{zhenPlay:listenNow.isPlay}]" @click="toPlay">
      </div>
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
    <left-menu
      ref="leftMenu"
      :url="listenDetail.menuUrl"
      :now-url="listenDetail.url"
      :from="from"
      @loadData="play"
    />
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
      from: '',
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
    ])
  },
  activated() {
    if (this.$route.params.form !== 'ball') {
      this.play()
      this.from = this.listenDetail.from
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
            this.next()
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
          detailUrl: this.listenDetail.url,
          type: this.listenDetail.from
        }
      }).then(res => {
        this.detail = res
        this.audio.src = res.url
        this.changeSetting({
          key: 'listenNow',
          value: { isPlay: false }
        })
        const index = this.listenList.findIndex(listen => listen.menuUrl === this.listenDetail.menuUrl)
        if (index !== -1) {
          this.listenList.splice(index, 1)
        }
        this.listenList.unshift(this.listenDetail)
        this.changeSetting({
          key: 'listenList',
          value: this.listenList
        })
        this.toPlay()
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

.zhen {
  transform: rotate(-20deg);
  transition: all .3s;
  -webkit-transform-origin: top;
  -ms-transform-origin: top;
  transform-origin: top;
}

.zhizhen::before {
  content: '';
  position: absolute;
  right: -7px;
  top: -7px;
  width: 18px;
  height: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAA51BMVEUGBgYAAAAAAADh4eHT09PBwcEAAAC2trbl5eUAAAAAAAC6urrHx8fm5ubk5OT9/f339/f19fXv7+/h4eHs7Oza2trd3d3k5OTMzMy6urrk5OTc3Ny2trbk5OTg4OCtra1ISEjPz88NDQ3v7+/39/fv7+/l5eX19fXn5+fV1dXS0tLFxcXn5+fAwMDg4ODBwcHR0dHi4uLe3t7h4eHMzMzCwsLY2Ni1tbXJycne3t7S0tLKysrg4OCgoKDZ2dmNjY2AgIDe3t7Pz8/////19fX09PTs7Oz39/f6+vr5+fnx8fHw8PDv7+/BEK5NAAAAQ3RSTlMCAASBhYsGjoALCY2Jemrx5NG4srGDfHVwZ2JdU0YpHw4KB97azcvKyry2pJ6dm5iWjYqJgmloWVFOST45MygmGhcQS+x9PgAAANpJREFUGNM1z9dywjAQhWGhldzt0FsgBNJ77z1HNmnv/zzRLvCPNKP9Zm+kapx6HuZ5MZ4uBr4fRRQRUdTbkNGfz5yovddoXlHkzZNSQ7qow7d2TL2pYnqlzjYwd94uaSz0QKfAX1VVQLNTKG7dtIHfsvxxaJjuklqAc678xo7paqZHcw58OTcHWuZWaGKyfUh1a56E9H2W7rJsnWX9mRLa7Nvw5PDgKLTXE16qsY1sGoapvXkPVhQkb6PB4O4lnmkPTErrJInjOJEd+bZgEGgtwiQmiQitdPn+B3YeGfBlRw3fAAAAAElFTkSuQmCC) center no-repeat;
  background-size: 100%;
}

.zhenPlay {
  transform: rotate(-0deg);
  transition: all .3s;
  -webkit-transform-origin: top;
  -ms-transform-origin: top;
  transform-origin: top;
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
