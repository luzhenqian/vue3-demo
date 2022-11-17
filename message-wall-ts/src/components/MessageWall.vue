<script setup lang="ts">
import { ElInput, ElButton, ElMessage, ElDialog } from 'element-plus'
import { ref, computed } from 'vue';
import dayjs from 'dayjs'
import { get, del as delApi, create, update as updateApi, MessageRaw, Id } from '../../api/messagewall'

const props = defineProps({
  id: String
})

const posts = ref<MessageRaw>([])
const keywords = ref<string>('')
const publishVisible = ref<boolean>(false)
const content = ref<string>('')
const editContent = ref<string>('')

const getMessage = async () => {
  const res = await get({ search: keywords.value })
  const id = props.id

  if (id) {
    const result = res.results.find(item => item.post_id === Number(id))
    res.results = []
    if (result) {
      res.results.push(result)
    }
  }
  posts.value = res.results
}

const formatPosts = computed<MessageRaw>(() => {
  return posts.value.map(post => ({
    ...post,
    publish_time: dayjs((post.publish_time as number) * 1000).format('YYYY年MM月DD日'),
    editing: false
  }))
})

const clear = () => {
  keywords.value = ''
  getMessage()
}

const del = async (id: Id) => {
  const res = await delApi(id)
  if (res === null) {
    ElMessage({ message: '删除成功', type: 'success' })
    getMessage()
  }
}

const publishStepOne = () => {
  publishVisible.value = true
}
const publishStepTwo = async () => {
  const res = await create({ content: content.value })
  if (res) {
    content.value = ''
    publishVisible.value = false
    getMessage()
  }
}
const cancelPublish = () => {
  publishVisible.value = false
}

const updateStepOne = (id: Id) => {
  const current = posts.value.find(item => item.post_id === id)
  if (current) {
    editContent.value = current.content
    current.editing = true
  }
}

const update = async (id: Id) => {
  const res = await updateApi(id, { content: editContent.value })
  if (res === null) {
    editContent.value = ''
    const current = posts.value.find(item => item.post_id === id)
    if (current) {
      current.editing = false
      getMessage()
    }
  }
}

const cancelUpdate = (id: Id) => {
  const current = posts.value.find(item => item.post_id === id)
  if (current) {
    current.editing = false
  }
}

getMessage()
</script>

<template>
  <div class="bg">
    <h1>三眼鸭的消息墙</h1>
    <div>
      <el-input v-model="keywords" type="text" placeholder="请输入您要搜索内容">
      </el-input>
      <el-button @click="getMessage">
        搜索
      </el-button>
      <el-button @click="clear">
        清除
      </el-button>
    </div>
    <div class="msg-item" v-for="({ post_id, content, publish_time, editing }) in formatPosts" :key="post_id">
      <div v-if="!editing">{{ content }}</div>
      <div v-else>
        <el-input type='textarea' v-model='editContent'></el-input>
        <el-button @click="update(post_id)">更新</el-button>
        <el-button @click="cancelUpdate(post_id)">取消</el-button>
      </div>
      <div>{{ publish_time }}</div>
      <el-button @click="updateStepOne(post_id)" class="btn">编辑</el-button>
      <el-button @click="del(post_id)" class="btn">删除</el-button>
    </div>
    <input type="button" @click="publishStepOne" class="publish-btn" value="发布" />
    <el-dialog v-model="publishVisible" title="发布消息">
      <el-input type='textarea' v-model="content"></el-input>
      <el-button @click="publishStepTwo">发布</el-button>
      <el-button @click="cancelPublish">取消</el-button>
    </el-dialog>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

button,
input[type=button] {
  border: none;
  outline: none;
}

.bg {
  background: black;
  color: white;
  min-height: 100vh;
}

.publish-btn {
  position: fixed;
  right: 10px;
  bottom: 10px;
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
  color: white;
  background-color: cadetblue;
}

.msg-item {
  margin: 20px;
  background-color: gray;
}

.btn {
  margin: 4px;
  padding: 4px;
  border-radius: 8px;
}
</style>