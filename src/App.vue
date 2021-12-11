<template>
  <div id="app">
    <keep-alive :exclude="['BookDetail','Search']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>

</style>
