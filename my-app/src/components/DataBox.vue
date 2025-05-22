<template>
  <div class="container">
    <div class="header">
      {{ title }}
    </div>
    <div class="content">
      <div class="message-box" ref="msgBox">
        <template v-if="data?.type === 'input-text'">
          <textarea
            v-model="inputMessage"
            class="text-input"
            placeholder="Enter message..."
            @keydown.enter.prevent="handleClick"
          ></textarea>
        </template>
        <template v-else>
          {{ data?.message }}
        </template>
      </div>
      <div class="btn-container">
        <v-btn @click="handleClick">{{ buttonText }}</v-btn>
        <v-btn v-if="showDownload && status === 'completed'" @click="handleDownload">Download</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  name: 'DataBox',
  props: {
    title: String,
    data: Object,
    buttonText: String,
    message: String,
    showDownload: Boolean,
    status: {
      type: String,
      default: 'pending',
    },
    reset: Boolean
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const msgBox = ref(null)
    const inputMessage = ref('')

    const scrollToBottom = () => {
      if (msgBox.value) {
        msgBox.value.scrollTop = msgBox.value.scrollHeight
      }
    }

    const handleDownload = () => {
      if (!props.data?.message) return
      const blob = new Blob([props.data.message], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'message.txt'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    const handleClick = () => {
      const trimmed = inputMessage.value.trim()

      if (props.data?.type === 'input-text' && trimmed.length === 0) {
        toast.error('⚠️ Please type a message.', { theme: 'colored' })
        return
      }

      const wordCount = trimmed.split(/\s+/).filter(word => word.length > 0).length
      if (props.data?.type === 'input-text' && wordCount < 2) {
        toast.error('⚠️ Please enter at least two words.', { theme: 'colored' })
        return
      }

      if (props.data?.type === 'input-text') {
        emit('submit', inputMessage.value)
      } else if (props?.status === 'completed') {
        emit('submit')
      } else if (props?.status === 'pending') {
        toast.error('⚠️ Please complete the previous step before continuing.', { theme: 'colored' })
      }
    }

    onMounted(scrollToBottom)
    watch(() => props?.data?.message, scrollToBottom)
    watch(() => props.reset, () => {
      if (props.data?.type === 'input-text') {
        inputMessage.value = ''
      }
    })

    return {
      msgBox,
      inputMessage,
      handleClick,
      handleDownload,
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  border-radius: 2px;
  flex-direction: column;
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.header {
  background-color: #3F5BD9;
  padding: 12px 8px;
  border-radius: 2px;
  font-family: 'Barlow';
  font-weight: 500;
  font-size: 18px;
  color: white;
}

.content {
  display: flex;
  flex-direction: column;
  height: 300px;
  padding: 8px;
  max-width: 400px;
}

.message-box {
  background-color: #F0F0F0;
  border-radius: 2px;
  height: 90%;
  width: 100%;
  overflow-y: auto;
  padding: 8px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
}

.text-input {
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  outline: none;
  resize: none;
  padding: 8px;
  font-family: inherit;
  background-color: transparent;
  box-sizing: border-box;
  text-align: left;
  vertical-align: top;
}

.btn-container {
  padding: 8px 8px 0px 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.btn-container .v-btn {
  background-color: #3F5BD9;
  color: white;
  min-width: 80px;
}

@media (max-width: 480px) {
  .container {
    width: 100%;
    max-width: 400px;
  }

  .content {
    height: auto;
  }

  .btn-container {
    justify-content: center;
  }

  .btn-container .v-btn {
    flex-grow: 1;
  }
}
</style>
