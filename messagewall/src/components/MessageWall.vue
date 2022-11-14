<script>
import dayjs from 'dayjs'
import { ElInput, ElButton, ElMessage } from 'element-plus'
import { get, del as delApi } from '../../api/messagewall'

export default {
  components: { ElButton, ElInput },
  data() {
    return {
      posts: [],
      baseUrl: 'https://3yya.com/u/d8cf630cf5f367cc/rest/app',
      keywords: '',
      content: '',
      editContent: '',
      publishVisible: false,
    }
  },
  methods: {
    async getMessage() {
      const res = await get()
      this.posts = res.results
    },
    clear() {
      this.keywords = ''
      this.getMessage()
    },
    async del(id) {
      const res = await delApi(id)
      if (res === null) {
        ElMessage({ message: '删除成功', type: 'success' })
        this.getMessage()
      }
    },
    publishStepOne() {
      this.publishVisible = true
    },
    publishStepTwo() {
      fetch(`${this.baseUrl}/posts`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", // 表明内容是 JSON 格式
        },
        body: JSON.stringify({
          content: this.content
        })
      }).then(
        res => {
          if (res.json()) {
            this.content = ''
            this.publishVisible = false
            this.getMessage()
          }
        }
      )
    },
    updateStepOne(id) {
      const current = this.posts.find(item => item.post_id === id)
      this.editContent = current.content
      current.editing = true
    },
    update(id) {
      fetch(`${this.baseUrl}/posts/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json", // 表明内容是 JSON 格式
        },
        body: JSON.stringify({
          content: this.editContent
        })
      }).then(
        res => {
          if (res.json()) {
            this.editContent = ''
            this.publishVisible = false
            this.getMessage()
          }
        }
      )
    },
    cancelUpdate(id) {
      const current = this.posts.find(item => item.post_id === id)
      current.editing = false
    },
    cancelPublish() {
      this.publishVisible = false
    }
  },
  computed: {
    formatPosts() {
      return this.posts.map(post => ({
        ...post, publish_time: dayjs(post.publish_time * 1000).format('YYYY年MM月DD日')
      }))
    }
  },
  beforeMount() {
    this.getMessage()
  }
}
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
    <div v-if="publishVisible">
      <el-input type='textarea' v-model="content"></el-input>
      <el-button @click="publishStepTwo">发布</el-button>
      <el-button @click="cancelPublish">取消</el-button>
    </div>
    <div class="msg-item" v-for="({ post_id, content, publish_time, editing }) in formatPosts" :key="post_id">
      <div v-if="!editing">{{ content }}</div>
      <div v-else>
        <el-input type='textarea' v-model='editContent'></el-input>
        <el-button @click="update(post_id)">更新</el-button>
        <el-button @click="cancelUpdate(post_id)">取消</el-button>
      </div>
      <div>{{ publish_time }}</div>
      <button @click="updateStepOne(post_id)" class="btn">编辑</button>
      <button @click="del(post_id)" class="btn">删除</button>
    </div>
    <input type="button" @click="publishStepOne" class="publish-btn" value="发布">
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