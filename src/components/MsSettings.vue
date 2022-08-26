<script setup lang="ts">
  import { defineEmits, computed } from 'vue'
  import { useSettingsStore } from '@/stores/settings'
  import { LevelType } from '@/types'

  const emit = defineEmits(['close'])

  const settings = useSettingsStore()

  const lang = computed({
    get: () => settings.lang,
    set: (value: string) => settings.changeLang(value),
  })

  const theme = computed({
    get: () => `${settings.theme.name}_${settings.theme.size}`,
    set: (value: string) => {
      const [name, size] = value.split('_')
      settings.changeTheme(name, Number(size))
    },
  })

  const level = computed({
    get: () => settings.board.level,
    set: (value: LevelType) => settings.changeLevel(value),
  })

  const width = computed({
    get: () => settings.board.width,
    set: (value: number | undefined) => settings.changeWidth(value),
  })

  const height = computed({
    get: () => settings.board.height,
    set: (value: number | undefined) => settings.changeHeight(value),
  })

  const mines = computed({
    get: () => settings.board.mines,
    set: (value: number | undefined) => settings.changeMines(value),
  })
</script>

<template>
  <div
    id="drawer-right"
    class="--fixed --h-screen absolute right-0 top-0 z-40 h-[calc(100vh_-_5rem)] w-80 transform-none overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800"
    tabindex="-1"
    aria-labelledby="drawer-right-label"
    aria-modal="true"
    role="dialog"
  >
    <span
      id="drawer-right-label"
      class="mb-4 inline-flex items-center text-base font-semibold"
    >
      <fa icon="fa-gear" />
      Settings
    </span>

    <button
      type="button"
      aria-controls="drawer-right"
      class="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
      @click="emit('close')"
    >
      <fa icon="fa-xmark" size="lg" />
      <span class="sr-only">Close menu</span>
    </button>

    <form class="w-full">
      <div class="mb-6 w-full px-3">
        <label
          class="mb-2 block text-sm font-semibold tracking-wide"
          for="lang"
        >
          Language
        </label>
        <div class="relative">
          <select
            id="lang"
            v-model="lang"
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-1 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          >
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <fa icon="fa-angle-down" size="xs" />
          </div>
        </div>
      </div>
      <div class="mb-6 w-full px-3">
        <label
          class="mb-2 block text-sm font-semibold tracking-wide"
          for="theme"
        >
          Theme
        </label>
        <div class="relative">
          <select
            id="theme"
            v-model="theme"
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-1 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          >
            <option value="green_32">green(32px)</option>
            <option value="MS_32">MS(32px)</option>
            <option value="green_16">green(16px)</option>
            <option value="MS_16">MS(16px)</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <fa icon="fa-angle-down" size="xs" />
          </div>
        </div>
      </div>
      <div class="mb-6 w-full px-3">
        <label
          class="mb-2 block text-sm font-semibold tracking-wide"
          for="level"
        >
          Level
        </label>
        <div class="relative">
          <select
            id="level"
            v-model="level"
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-1 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="custom">Custom</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <fa icon="fa-angle-down" size="xs" />
          </div>
        </div>
      </div>
      <transition name="slide-x">
        <div v-if="level === 'custom'">
          <div class="mb-6 w-full px-3">
            <label
              class="mb-2 block text-sm font-semibold tracking-wide"
              for="width"
            >
              Width
            </label>
            <input
              id="width"
              v-model.number="width"
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-1 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              type="number"
              min="9"
              max="30"
              step="1"
              placeholder="9 - 30"
            />
          </div>
          <div class="mb-6 w-full px-3">
            <label
              class="mb-2 block text-sm font-semibold tracking-wide"
              for="height"
            >
              Height
            </label>
            <input
              id="height"
              v-model.number="height"
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-1 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              type="number"
              min="9"
              max="24"
              step="1"
              placeholder="9 - 24"
            />
          </div>
          <div class="mb-6 w-full px-3">
            <label
              class="mb-2 block text-sm font-semibold tracking-wide"
              for="mines"
            >
              Mines
            </label>
            <input
              id="mines"
              v-model.number="mines"
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-1 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              type="number"
              min="10"
              max="999"
              step="1"
              placeholder="10 - 999"
            />
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<style scoped>
  .slide-x-enter-active,
  .slide-x-leave-active {
    transition: transform 0.5s ease;
  }

  .slide-x-enter-from,
  .slide-x-leave-to {
    transform: translateX(100%);
  }
</style>
