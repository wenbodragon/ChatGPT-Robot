<script setup lang="ts">
import { ref } from 'vue'
import { callOpenAi } from '../service/openAIService'

const question = ref('')
const response = ref('')
async function chatFun() {
  response.value = await callOpenAi(question.value);
}
</script>

<template>
  <van-field v-model="response" rows="1" type="textarea" autosize />
  <van-field v-model="question" rows="1" type="textarea" autosize placeholder="Ask dog a question" />
  <van-button plain type="primary" @click="chatFun">let's chat</van-button>
</template>

<style scoped>
</style>