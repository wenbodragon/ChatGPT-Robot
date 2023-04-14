<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 80vh;
  background-color: rgb(224, 221, 221);
}
</style>
