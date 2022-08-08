<script setup lang="ts">
import { ref } from 'vue'
import TimeElapsed from './TimeElapsed.vue'

const mode = ref('ready')
</script>

<template>
  <div>
    <button @click="mode='ready'">
      ready
    </button>
    <button @click="mode='running'">
      running
    </button>
    <button @click="mode='stopped'">
      stopped
    </button>
    <TimeElapsed :mode="mode" />
  </div>
</template>

<style scoped>
</style>
