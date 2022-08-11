<script setup lang="ts">
import { ref } from 'vue'

import { initStyles } from '@/utils/styles'

import MsTimer, { timerModes, TimerModeType } from './MsTimer.vue'

const mode = ref<TimerModeType>(timerModes.READY)
const styles = initStyles('ms', 32)
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
    <MsTimer
      :style="styles.timer"
      :mode="mode"
    />
  </div>
</template>

<style scoped>
</style>
