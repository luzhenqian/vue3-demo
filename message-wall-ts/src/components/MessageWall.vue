<script setup lang="ts">
import { ElInput, ElButton, ElDialog } from 'element-plus'
import { useMessage, usePublish, useDelete, useUpdate } from '../../hooks/message-wall'

const props = defineProps({
  id: String
})

const { formatPosts, posts, reload, keywords, clear } = useMessage(props.id)
const { publishVisible, content, publishStepOne, publishStepTwo, cancelPublish } = usePublish(reload)
const { del } = useDelete(reload)
const {
  editContent,
  updateStepOne,
  update,
  cancelUpdate,
} = useUpdate(posts, reload)
</script>

<template>
  <div class="bg">
    <h1>三眼鸭的消息墙</h1>
    <div>
      <el-input v-model="keywords" type="text" placeholder="请输入您要搜索内容">
      </el-input>
      <el-button @click="reload">
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