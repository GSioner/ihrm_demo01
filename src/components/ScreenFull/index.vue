<template>
  <div>
    <svg-icon icon-class="fullscreen" class="icon" @click="changeFull" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  methods: {
    changeFull() {
      screenfull.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  color: white;
}
</style>
