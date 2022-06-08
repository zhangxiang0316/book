<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :exclude="['BookDetail','MovieDetail']">
        <router-view />
      </keep-alive>
    </transition>
    <drag-ball-component v-show="$route.name!=='listenDetail' && listenNow.isPlay" />
  </div>
</template>

<script>
import dragBallComponent from './components/dragBallComponent'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    dragBallComponent
  },
  data() {
    return {
      transitionName: ''
    }
  },
  computed: {
    ...mapGetters([
      'listenNow'
    ])
  },
  watch: {
    $route(to, from) {
      if (from.meta && to.meta) {
        if (from.meta.index <= to.meta.index) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      }
    }
  },
  created() {
    this.changeSetting({ key: 'listenNow', value: { isPlay: false }})
  },
  methods: {
    ...mapActions([
      'changeSetting'
    ])
  }
}
</script>

<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.fade-in-up-big-enter-active {
  will-change: transform;
  transition: all .5s;
  position: absolute;
  height: 100vh;
  width: 100%;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.fade-in-up-big-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.fade-in-up-big-leave-active {
  transform: translate3d(0, -100%, 0);
}
</style>
