<template>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/message-wall">Go to Message Wall</router-link>
    <button @click="gotoProfile">Go To Profile</button>
  </p>
  <router-view></router-view>


  <router-view name="left"></router-view>
  <router-view name="content"></router-view>
  <router-view name="right"></router-view>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const gotoProfile = () => router.push('/profile')
</script>