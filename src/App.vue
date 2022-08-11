<script setup lang="ts">
import { SettingsType } from '@/types'
import StoreTest from './components/StoreTest.vue'
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
  <StoreTest />
  <MsGame :settings="settings" />
</template>

<style scoped>
</style>
