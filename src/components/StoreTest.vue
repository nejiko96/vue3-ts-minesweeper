<!-- https://www.aska-ltd.jp/jp/blog/242 -->
<script setup lang="ts">
import { useTestStore } from '@/stores/test'
import { storeToRefs } from 'pinia'

const test = useTestStore()

const { counter, doubleCount } = storeToRefs(test)

const increment = () => { test.increment() }

</script>

<template>
  <div>
    <p>counter: {{ counter }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <button
      type="button"
      @click="increment"
    >
      increment
    </button>
    <!-- test.decrement()で直接呼び出しも可能 -->
    <button
      type="button"
      @click="test.decrement()"
    >
      decrement
    </button>
  </div>
</template>

<style scoped>
</style>
