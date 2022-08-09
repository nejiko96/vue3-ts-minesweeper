<script setup lang="ts">
import { ref } from 'vue'
import TimeElapsed, { timerModes, TimerModeType } from './TimeElapsed.vue'

const mode = ref<TimerModeType>(timerModes.READY)
</script>

<template>
  <div>
    <button @click="mode=timerModes.READY">
      ready
    </button>
    <button @click="mode=timerModes.RUNNING">
      running
    </button>
    <button @click="mode=timerModes.STOPPED">
      stopped
    </button>
    <TimeElapsed :mode="mode" />
  </div>
</template>

<style scoped>
</style>
