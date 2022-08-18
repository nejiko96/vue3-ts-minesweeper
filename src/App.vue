<script setup lang="ts">
import { ref } from 'vue'

import { SettingsType } from '@/types'
import { useSettingsStore } from '@/stores/settings'

import MsGame from './components/MsGame.vue'
import MsSettings from './components/MsSettings.vue'

const settings: SettingsType = useSettingsStore()

const settingsOpen = ref(false)

</script>

<template>
  <header class="bg-teal-500 text-white">
    <nav
      class="container mx-auto px-2 py-4 h-16"
    >
      <div class="flex justify-between items-center">
        <span class="text-xl font-semibold">
          Vue3 + TypeScript minesweeper demo page
        </span>

        <a
          href="https://github.com/nejiko96/vue3-ts-minesweeper"
          target="_blank"
          title="View source on GitHub"
          aria-label="View source on GitHub"
        >
          <fa
            icon="fa-brands fa-github"
            size="2xl"
          />
        </a>
      </div>
    </nav>
  </header>
  <main class="">
    <div class="relative">
      <ms-game :settings="settings" />
      <button
        class="
          text-white bg-teal-500 hover:bg-teal-400
          font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
          focus:ring-4 focus:outline-none
          focus:ring-teal-300 dark:focus:ring-teal-800
          absolute top-2.5 right-2.5
        "
        type="button"
        aria-controls="drawer-right"
        @click="settingsOpen = true"
      >
        <fa icon="fa-gear" />
        Settings
      </button>
      <ms-settings
        v-if="settingsOpen"
        @close="settingsOpen = false"
      />
    </div>
  </main>
</template>
