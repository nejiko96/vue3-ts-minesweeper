<script lang="ts">
  import { computed } from 'vue'
  import { useSettingsStore } from '../store/settings'
  import { LevelType } from '../types'
  import MsNumberInput from './MsNumberInput.vue'
  import MsSelectBox from './MsSelectBox.vue'

  const langOptions = [
    { id: 'en', name: 'English' },
    { id: 'ja', name: '日本語' },
  ] as const

  const themeOptions = [
    { id: 'green_32', name: 'green(32px)' },
    { id: 'MS_32', name: 'MS(32px)' },
    { id: 'green_16', name: 'green(16px)' },
    { id: 'MS_16', name: 'MS(16px)' },
  ] as const

  const levelOptions = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
    { id: 'custom', name: 'Custom' },
  ] as const
</script>

<script setup lang="ts">
  const emit = defineEmits(['close'])

  const settings = useSettingsStore()

  const lang = computed({
    get: (): string => settings.lang,
    set: (value: string) => settings.changeLang(value),
  })

  const theme = computed({
    get: (): string => `${settings.theme.name}_${settings.theme.size}`,
    set: (value: string) => {
      const [name, size] = value.split('_')
      settings.changeTheme(name, Number(size))
    },
  })

  const level = computed({
    get: (): LevelType => settings.board.level,
    set: (value: LevelType) => settings.changeLevel(value),
  })

  const width = computed({
    get: (): number | undefined => settings.board.width,
    set: (value: number | undefined) => settings.changeWidth(value),
  })

  const height = computed({
    get: (): number | undefined => settings.board.height,
    set: (value: number | undefined) => settings.changeHeight(value),
  })

  const mines = computed({
    get: (): number | undefined => settings.board.mines,
    set: (value: number | undefined) => settings.changeMines(value),
  })
</script>

<template>
  <div
    id="drawer-right"
    class="--fixed --h-screen --transform-none --transition-transform absolute right-0 top-0 h-[calc(100vh_-_5rem)] w-80 overflow-y-auto overflow-x-hidden bg-white p-4 dark:bg-black"
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
      class="absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
      @click="emit('close')"
    >
      <fa icon="fa-xmark" size="lg" />
      <span class="sr-only">Close menu</span>
    </button>

    <form class="w-full">
      <MsSelectBox
        id="lang"
        v-model="lang"
        label="Language"
        :options="langOptions"
      />
      <MsSelectBox
        id="theme"
        v-model="theme"
        label="Theme"
        :options="themeOptions"
      />
      <MsSelectBox
        id="level"
        v-model="level"
        label="Level"
        :options="levelOptions"
      />

      <Transition
        enter-active-class="transition-transform duration-500 ease"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-500 ease"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div v-if="level === 'custom'">
          <MsNumberInput
            id="width"
            v-model.number="width"
            label="Width"
            min="9"
            max="30"
            step="1"
            placeholder="9 - 30"
          />
          <MsNumberInput
            id="height"
            v-model.number="height"
            label="Height"
            min="9"
            max="24"
            step="1"
            placeholder="9 - 24"
          />
          <MsNumberInput
            id="mines"
            v-model.number="mines"
            label="Mines"
            min="10"
            max="999"
            step="1"
            placeholder="10 - 999"
          />
        </div>
      </Transition>
    </form>
  </div>
</template>
