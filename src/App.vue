<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :exclude="['BookDetail']">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route(to, from) {
      console.log(this.$router)
      // 切换动画
      const isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
      console.log()
      if (isBack) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
      this.$router.isBack = true
      console.log(this.transitionName)
    }
  }
}
</script>

<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
