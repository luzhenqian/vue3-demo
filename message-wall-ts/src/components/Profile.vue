<template>
  <h1>编辑用户信息</h1>
  <el-input v-model="user.avatar"></el-input>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus';
import { useCounterStore } from '../../stores/user'

const user = useCounterStore()
</script>