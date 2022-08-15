<script setup lang="ts">
import { SettingsType } from '@/types'
import MsGame from './components/MsGame.vue'

const settings: SettingsType = {
  lang: 'en',
  theme: {
    name: 'green',
    size: 32,
  },
  board: {
    level: 'easy',
  },
}
</script>

<template>
  <MsGame :settings="settings" />
</template>
