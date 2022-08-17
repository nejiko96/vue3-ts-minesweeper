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

        <button>
          <svg
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="
                  M24 13.616
                  v-3.232
                  c-1.651-.587-2.694-.752-3.219-2.019
                  v-.001
                  c-.527-1.271.1-2.134.847-3.707
                  l-2.285-2.285
                  c-1.561.742-2.433 1.375-3.707.847
                  h-.001
                  c-1.269-.526-1.435-1.576-2.019-3.219
                  h-3.232
                  c-.582 1.635-.749 2.692-2.019 3.219
                  h-.001
                  c-1.271.528-2.132-.098-3.707-.847
                  l-2.285 2.285
                  c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02
                  v3.232
                  c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707
                  l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847
                  h.001
                  c1.27.526 1.436 1.579 2.019 3.219
                  h3.232
                  c.582-1.636.75-2.69 2.027-3.222
                  h.001
                  c1.262-.524 2.12.101 3.698.851
                  l2.285-2.286
                  c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021
                  z
                  m-12 2.384
                  c-2.209 0-4-1.791-4-4
                  s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4
                  z
                "
            />
          </svg>
        </button>
      </div>
    </nav>
  </header>
  <main class="">
    <div class="relative">
      <MsGame :settings="settings" />
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
        Settings
      </button>
    </div>
    <MsSettings
      v-if="settingsOpen"
      @close="settingsOpen = false"
    />
  </main>
</template>
