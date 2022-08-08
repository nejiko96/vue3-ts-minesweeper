<script setup lang="ts">
import { ref } from 'vue'
import TimeElapsed, { TimerMode, TimerModeType } from './TimeElapsed.vue'

const mode = ref<TimerModeType>('ready')
</script>

<template>
  <div>
    <button @click="mode=TimerMode.READY">
      ready
    </button>
    <button @click="mode=TimerMode.RUNNING">
      running
    </button>
    <button @click="mode=TimerMode.STOPPED">
      stopped
    </button>
    <TimeElapsed :mode="mode" />
  </div>
</template>

<style scoped>
</style>
