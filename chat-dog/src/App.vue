<script setup lang="ts">
import { RouterView } from 'vue-router'
import Chat from './components/Chat.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Chat />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
