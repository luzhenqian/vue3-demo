<script>
import { nextTick } from 'vue'
export default {
  data() {
    return {
      count: 1,
      score: 50,
    }
  },
  methods: {
    increment() {
      this.score += 1
    }
  },
  mounted() {
    setInterval(this.increment, 1000)
  },
  updated() {
    console.log('updated')
  },
  computed: {
    qualified() {
      console.log('调用了函数')
      return this.score >= 60 ? '及格' : '不及格'
    }
  }
}
</script>

<template>
  <!-- <div id="count">{{ count }}</div> -->
  <span v-if="score>=80">😊</span>
  <span v-else-if="score >= 60">😔</span>
  <span v-else>😭</span>
</template>
