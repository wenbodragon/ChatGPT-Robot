<script setup lang="ts">
import { callOpenAi } from "../service/openai"
function chatFun() {
    callOpenAi();
}
</script>

<template>
<van-button plain type="primary" @click="chatFun">chat</van-button>
</template>