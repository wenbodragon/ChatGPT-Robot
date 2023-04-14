<script setup lang="ts">
import { ref } from 'vue'
import { callOpenAi } from '@/service/openAIService'

const question = ref('')
const response = ref('')
const isLoading = ref(false)

async function chatFun() {
  isLoading.value = true
  response.value = await callOpenAi(question.value)
  isLoading.value = false
}
</script>

<template>
  <div class="container">
    <div class="avatar">
      <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
    </div>
    <div class="input">
      <el-input v-loading="isLoading" v-model="response" :rows="2" type="textarea" />
    </div>
  </div>

  <div class="container">
    <div class="input">
      <el-input v-model="question" :rows="2" type="textarea" placeholder="Ask dog a question" />
    </div>
    <div class="avatar">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </div>
  </div>

  <div class="btn">
    <el-button type="primary" @click="chatFun">chat</el-button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
.avatar {
  flex: 1; /* 等分剩余空间 */
}

.input {
  flex: 8; /* 等分剩余空间 */
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
