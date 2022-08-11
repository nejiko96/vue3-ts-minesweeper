<script setup lang="ts">
import { SettingsType } from '@/types'
import MsGame from './components/MsGame.vue'

const settings: SettingsType = {
  lang: 'en',
  theme: 'green',
  cellSize: 32,
  board: {
    level: 'easy',
  },
}
</script>

<template>
  <MsGame :settings="settings" />
</template>

<style scoped>
</style>
