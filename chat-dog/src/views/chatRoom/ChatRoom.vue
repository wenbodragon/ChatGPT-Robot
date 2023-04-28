<template>
  <div class="chat-window">
    <nav-bar title="聊天窗口" left-text="返回" left-arrow @click-left="onBackClick" />
    <div class="chat-container" ref="chatContainer">
      <div v-for="(msg, index) in messages" :key="index" class="message-wrapper">
        <notice-bar v-if="msg.isNewDay" :text="formatDate(msg.time)" />
        <div
          class="message-content"
          :class="{ me: msg.sender === 'me', others: msg.sender !== 'me' }"
        >
          <div v-if="msg.sender !== 'me'" class="avatar"></div>
          <div class="content">{{ msg.content }}</div>
          <div class="time">{{ formatTime(msg.time) }}</div>
        </div>
      </div>
    </div>
    <div class="chat-bottom">
      <van-cell-group class="chat-field" inset>
        <van-field
          v-model="newMessage"
          @blur="onInputBlur"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入留言"
        />
      </van-cell-group>
      <van-button type="success" class="send-btn" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { callOpenAi } from '@/service/openAIService'
import { NavBar, NoticeBar, Field } from 'vant'
import { reactive } from 'vue'

const messages = reactive([
  {
    content: '你好, 我是小助手, 有什么可以帮到你的吗?',
    sender: 'other',
    time: '2022-01-20 09:01:00',
    isNewDay: false
  }
])

let newMessage: Ref<string> = ref('')

function onBackClick(): void {
  // 返回上一页代码...
}
let responseMessage: Ref<string> = ref('')

  function reset(){
    responseMessage = ref('');
  }

function sendMessage(): void {
  // 发送消息代码...
  if (newMessage.value.trim() === '') {
    return
  }

  messages.push({
    content: newMessage.value,
    sender: 'me',
    time: new Date().toLocaleString(),
    isNewDay: false
  })

  let res = reactive({
    content: responseMessage,
    sender: 'other',
    time: new Date().toLocaleString(),
    isNewDay: false
  })

  messages.push(res)
  console.log(messages)

  chatFun()
  newMessage.value = '';
}

function onInputBlur(): void {
  // 输入框失焦代码...
}

function formatDate(dateStr: string): string {
  // 格式化日期代码...
  return 'Today'
}

function formatTime(timeStr: string): string {
  // 格式化时间代码...
  return timeStr.slice(-8)
}

async function chatFun() {
  // isLoading.value = true
  await callOpenAi(newMessage.value).then((res) => {
    //@ts-ignore
    const reader = res.body.getReader()
    // console.log(reader);
    readStream(reader)
  })
}
function readStream(reader: any) {
  //@ts-ignore
  reader.read().then(({ done, value }) => {
    if (done) {
      return
    }
    let decoded = new TextDecoder().decode(value)
    let decodedArray = decoded.split('data: ')
    decodedArray.forEach((decoded) => {
      if (decoded !== '') {
        if (decoded.trim() === '[DONE]') {
          reset();
          return
        } else {
          const resString = JSON.parse(decoded).choices[0].delta.content
            ? JSON.parse(decoded).choices[0].delta.content
            : '';
          responseMessage.value += resString
          console.log(responseMessage.value)
        }
      }
    })
    console.log(decoded)
    return readStream(reader)
  })
}
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f7f9fa;
}

.chat-container {
  flex-grow: 1;
  overflow-y: scroll;
  padding: 10px;
}

.message-wrapper {
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #eee;
  border-radius: 50%;
  margin-right: 10px;
}

.content {
  min-height: 40px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
}

.time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.me .message-content {
  display: flex;
  flex-direction: row-reverse;
}

.others .message-content {
  display: flex;
  flex-direction: row;
}

.send-btn {
  /* flex: 1; */
  width: 80px;
  padding: 10px;
}
.chat-bottom {
  display: flex;
}
.chat-field {
  flex: 1;
}
</style>