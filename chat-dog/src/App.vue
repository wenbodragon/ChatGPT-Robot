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
  height: 820px;
  overflow: hidden;
  background-color: rgb(224, 221, 221);
}
</style>
