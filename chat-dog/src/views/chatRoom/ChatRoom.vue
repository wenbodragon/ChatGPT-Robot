<template>
  <div class="chat-window">
    <!-- <nav-bar title="聊天窗口" left-text="返回" left-arrow @click-left="onBackClick" /> -->
    <div class="chat-container" ref="chatContainer">
      <div v-for="(msg, index) in messages" :key="index" class="message-wrapper">
        <notice-bar v-if="msg.isNewDay" :text="formatDate(msg.time)" />
        <div class="message-content" :style="{ flexDirection: msg.sender !== 'me' ? 'row' : 'row-reverse' }"
          :class="{ me: msg.sender === 'me', others: msg.sender !== 'me' }">
          <div v-if="msg.sender !== 'me'" class="avatar"></div>
          <div v-if="msg.sender == 'me'" class="user_acatar"></div>
          <div class="content" :style="{ backgroundColor: msg.sender !== 'me' ? '#ffffff' : '#b7d9b7' }">{{ msg.content }}
          </div>
          <!-- <div class="time">{{ formatTime(msg.time) }}</div> -->
        </div>
      </div>
    </div>
    <div class="chat-bottom">
      <van-cell-group class="chat-field" inset>
        <van-field autosize v-model="newMessage" @keyup.enter="sendMessage($event)" @blur="onInputBlur" rows="1"
          type="textarea" placeholder="请输入留言" />
      </van-cell-group>
      <van-button type="success" class="send-btn" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Ref } from 'vue'
import { ref } from 'vue'
import { callOpenAi } from '@/service/openAIService'
import { NavBar, NoticeBar, Field } from 'vant'
import { reactive } from 'vue';
import { marked } from 'marked'
import hljs from "highlight.js";

const messages = reactive([
  {
    content: '你好, 我是小助手, 有什么可以帮到你的吗?',
    sender: 'other',
    time: '2022-01-20 09:01:00',
    isNewDay: false
  }
])
marked.setOptions({
  // 使用默认的渲染类
  renderer: new marked.Renderer,
  // GitHub Flavored Markdown, 生成 GitHub 格式。
  gfm: true,
  // 异步解析
  async: true,
  // 高亮函数，使用 highlight.js。本来还有第三个参数作为发生错误时的回调。
  highlight(code: string, language: string): string {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value
  },
})

async function markDownTrans(data) {
  let res = await marked(data);
  return res;
}

let newMessage: Ref<string> = ref('')
let chatContainer = ref(null);
function onBackClick(): void {
  // 返回上一页代码...
}
let responseMessage: Ref<string> = ref('')

function reset() {
  responseMessage = ref('');
}

function sendMessage(e): void {

  e.preventDefault()
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
  messages.push(res);
  //@ts-ignore
  console.log(chatContainer.value.scrollTop);
  //@ts-ignore
  setTimeout(() => {
    //@ts-ignore
    chatContainer.value.scrollTop = 999999999
  }, 100)
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
          setTimeout(() => {
            //@ts-ignore
            chatContainer.value.scrollTop = 999999999
          }, 100)
        }
      }
    })
    return readStream(reader)
  })
}
</script>

<style scoped>
.chat-window {}

.chat-container {
  background-color: gray;
  height: 758px;
  overflow: scroll;
}

.message-wrapper {}

.avatar {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  margin-right: 10px;
}

.user_acatar {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  background-color: #b7d9b7;
  border-radius: 50%;
  margin-right: 10px;
}

.content {
  flex: 0 0 280px;
  min-height: 40px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 10px;
}

.time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.me .message-content {
  display: flex;

}

.others .message-content {
  display: flex;

}

.send-btn {
  /* flex: 1; */
  width: 80px;
  padding: 10px;
  margin-right: 10px;
}

.chat-field {
  flex: 1;
}

.message-content {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.chat-bottom {
  padding-top: 15px;
  padding-bottom: 5px;
  background-color: gray;
  display: flex;
}

.message-wrapper :last-child {}
</style>