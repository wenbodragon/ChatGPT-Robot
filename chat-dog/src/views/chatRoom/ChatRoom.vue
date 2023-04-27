<!-- <script setup lang="ts">
import { ref } from 'vue'
import { callOpenAi } from '@/service/openAIService'

const question = ref('')
const response = ref('')
const isLoading = ref(false)
async function chatFun() {
  // isLoading.value = true
  await callOpenAi(question.value).then(res => {
    //@ts-ignore
    const reader = res.body.getReader();
    // console.log(reader);
    readStream(reader);
  })
}
function readStream(reader:any){
    //@ts-ignore
    reader.read().then(({ done, value }) => {
      if(done){
        return
      }
      let decoded = new TextDecoder().decode(value);
      let decodedArray = decoded.split("data: ");
      decodedArray.forEach(decoded => {
            if(decoded!==""){
              if(decoded.trim()==="[DONE]"){
                return;
              }else{
                const resString = JSON.parse(decoded).choices[0].delta.content ? 
                JSON.parse(decoded).choices[0].delta.content : "";
                response.value += resString
              }
            }
          })
      console.log(decoded);
      return readStream(reader)
  })
}
</script>
 -->
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
    <field
      v-model="newMessage"
      placeholder="请输入消息"
      clearable
      @blur="onInputBlur"
      :autofocus="false"
      :maxlength="maxMessageLength"
    />
    <button class="send-btn" @click="sendMessage">发送</button>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { callOpenAi } from '@/service/openAIService'
import { NavBar, NoticeBar, Field } from 'vant'

interface Message {
  content: string
  sender: string
  time: string
  isNewDay: boolean
}


const messages: Ref<Message[]> = ref([
  {
    content: '你好啊',
    sender: 'other',
    time: '2022-01-20 09:01:00',
    isNewDay: false
  },
  {
    content: '你好，很高兴见到你。',
    sender: 'me',
    time: '2022-01-20 09:02:00',
    isNewDay: false
  },
  {
    content: '最近怎么样？',
    sender: 'other',
    time: '2022-01-20 09:03:00',
    isNewDay: false
  }
])

const newMessage: Ref<string> = ref('');
const maxMessageLength: number = 100;
const responseMessage: Ref<string> = ref('');

function onBackClick(): void {
  // 返回上一页代码...
}

function sendMessage(): void {
  // 发送消息代码...
  if (newMessage.value.trim() === '') {
    return
  }
  messages.value.push({
    content: newMessage.value,
    sender: 'me',
    time: new Date().toLocaleString(),
    isNewDay: false
  })
  chatFun();
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
    const reader = res.body.getReader();
    // console.log(reader);
    readStream(reader);
    messages.value.push({
    content: responseMessage.value,
    sender: 'other',
    time: new Date().toLocaleString(),
    isNewDay: false
  })
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
          return
        } else {
          const resString = JSON.parse(decoded).choices[0].delta.content
            ? JSON.parse(decoded).choices[0].delta.content
            : ''
            responseMessage.value += resString;
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
  padding: 10px;
}
</style>
