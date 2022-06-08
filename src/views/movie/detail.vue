/**
* create by zx on 2022/6/7 09:37
* 类注释：
* 备注：
*/
<template>
  <div class="detail">
    <van-nav-bar
      :fixed="true"
      :safe-area-inset-top="true"
      :placeholder="true"
      title="视频详情"
      left-arrow
      @click-left="$router.back()"
    />
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :options="playerOptions"
      :playsinline="true"
      custom-event-name="customstatechangedeventname"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

import { videoPlayer } from 'vue-video-player'

export default {
  name: 'MoveDetail',
  components: {
    videoPlayer
  },
  props: {},
  data() {
    return {
      playerOptions: {
        live: true,
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        controls: true, // 控制条
        preload: 'auto', // 视频预加载
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: 'zh-CN',
        bigPlayButton: true,
        width: document.documentElement.clientWidth,
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [],
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          currentTimeDisplay: true, // 当前时间
          volumeControl: false, // 声音控制键
          playToggle: true, // 暂停和播放键
          progressControl: true, // 进度条
          fullscreenToggle: true // 全屏按钮
        },
        poster: '', // 你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  activated() {
    const url = this.$route.query.movieUrl
    this.playerOptions.poster = this.$route.query.img
    this.playerOptions.sources.push({ type: 'video/mp4', src: url })
  },
  mounted() {
  },
  created() {
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log('example player 1 readied', player)
      player.currentTime(10)
      console.log('example 01: the player is readied', player)
    }
  }
}
</script>

<style scoped>
video {
  width: 100% !important;
  height: calc(100vh - 95px) !important;
  object-fit: fill;
}

@media screen and(min-width: 768px) {
  video {
    width: 100% !important;
    height: calc(100vh - 95px) !important;
    object-fit: fill;
  }
}

#videoDiv > div {
  height: calc(100vh - 95px) !important;
  overflow: hidden;
}

.my_video {
  width: 100%;
  height: calc(100vh - 95px);
  background-color: white;
}
</style>
