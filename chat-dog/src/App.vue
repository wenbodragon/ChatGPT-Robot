<script setup lang="ts">
import { RouterView } from 'vue-router'
import ChatView from './components/ChatView.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <ChatView />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: antiquewhite;
}
</style>
