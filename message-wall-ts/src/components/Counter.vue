<template>
  <button @click="counter.increment">{{counter.count}}</button>
</template>

<script setup lang="ts">
import { useCounterStore } from '../../stores/counter'

const counter = useCounterStore()
</script>