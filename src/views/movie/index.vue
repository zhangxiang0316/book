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
      title=""
      left-arrow
      @click-left="$router.back()"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadData"
    >
      <video-player
        v-for="item in list"
        ref="videoPlayer"
        class="video-player vjs-custom-skin"
        :options="item.playerOptions"
        :playsinline="true"
        custom-event-name="customstatechangedeventname"
      />
      <div>{{ item.title }}</div>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
export default {
  name: 'Index',
  components: {
    videoPlayer
  },
  props: {},
  data() {
    return {
      finished: false,
      loading: false,
      list: [],
      page: 1,
      movieName: '',
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
  computed: {},
  mounted() {
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      axios.get(`https://hjce6d.com/api/video/node_list?pageIndex=${this.page}&type=1`, {
        headers: {
          'x-user-id': '21585586',
          'x-user-token': 'a7d10e98ba114b0b9e76a1eca498fb88'
        }
      }).then(res => {
        const list = res.data.data.map(item => {
          return {
            title: item.title,
            url: item.attachment.remoteUrl
          }
        })
        if (this.page === 1) {
          this.list = list
        } else {
          this.list = [...list, ...this.list]
        }
        this.page++
      })
    }
  }
}
</script>

<style scoped>
video {
  width: 100% !important;
  height: 400px !important;
  object-fit: fill;
}

@media screen and(min-width: 768px) {
  video {
    width: 100% !important;
    height: 400px !important;
    object-fit: fill;
  }
}
</style>
