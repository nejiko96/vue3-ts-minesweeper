<script setup lang="ts">
  import { ref } from 'vue'

  import { SettingsType } from '../types'
  import { useSettingsStore } from '../store/settings'

  import MsGame from '../components/MsGame.vue'
  import MsSettings from '../components/MsSettings.vue'

  const settings: SettingsType = useSettingsStore()

  const settingsOpen = ref(false)
</script>

<template>
  <div class="relative p-4">
    <div class="text-center">
      <h1 class="mb-4 text-3xl font-semibold">Minesweeper Game</h1>
    </div>
    <MsGame :settings="settings" />
    <button
      class="absolute top-2.5 right-2.5 mr-2 mb-2 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
      type="button"
      aria-controls="drawer-right"
      @click="settingsOpen = true"
    >
      <fa icon="fa-gear" />
      Settings
    </button>
    <Transition
      enter-active-class="transition-transform duration-500 ease"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-500 ease"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <MsSettings v-show="settingsOpen" @close="settingsOpen = false" />
    </Transition>
  </div>
</template>
