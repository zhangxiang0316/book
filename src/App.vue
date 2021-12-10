<template>
  <div id="app">
    <keep-alive :exclude="['BookDetail']">
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
