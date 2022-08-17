<script setup lang="ts">
import { defineEmits, computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { LevelType } from '@/types'
import { toNumber } from '@/utils'

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
  get: () => settings.board.width?.toString() ?? '',
  set: (value: string) => {
    settings.changeWidth(toNumber(value))
  },
})

const height = computed({
  get: () => settings.board.height?.toString() ?? '',
  set: (value: string) => settings.changeHeight(toNumber(value)),
})

const mines = computed({
  get: () => settings.board.mines?.toString() ?? '',
  set: (value: string) => settings.changeMines(toNumber(value)),
})

</script>

<template>
  <div
    id="drawer-right"
    class="
      --fixed absolute right-0 top-16 w-80
      h-screen z-40 p-4 overflow-y-auto
      --bg-white dark:bg-gray-800
      transition-transform transform-none
    "
    tabindex="-1"
    aria-labelledby="drawer-right-label"
    aria-modal="true"
    role="dialog"
  >
    <span
      id="drawer-right-label"
      class="inline-flex items-center mb-4 text-base font-semibold"
    >
      <svg
        class="w-4 h-4 fill-current"
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
      Settings
    </span>

    <button
      type="button"
      aria-controls="drawer-right"
      class="
        text-gray-400 bg-transparent
        hover:bg-gray-200 hover:text-gray-900
        dark:hover:bg-gray-600 dark:hover:text-white
        rounded-lg text-sm p-1.5
        absolute top-2.5 right-2.5
        inline-flex items-center
      "
      @click="$emit('close')"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="
          M4.293 4.293
          a1 1 0 011.414 0
          L10 8.586
          l4.293-4.293
          a1 1 0 111.414 1.414
          L11.414 10
          l4.293 4.293
          a1 1 0 01-1.414 1.414
          L10 11.414
          l-4.293 4.293
          a1 1 0 01-1.414-1.414
          L8.586 10 4.293 5.707
          a1 1 0 010-1.414
          z
        "
        clip-rule="evenodd"
      /></svg>
      <span class="sr-only">Close menu</span>
    </button>

    <form class="w-full">
      <div class="w-full px-3 mb-6">
        <label
          class="block tracking-wide text-sm font-semibold mb-2"
          for="lang"
        >
          Language
        </label>
        <div class="relative">
          <select
            id="lang"
            v-model="lang"
            class="
              block appearance-none w-full
              bg-gray-200 border border-gray-200 text-gray-700
              py-1 px-4 pr-8 rounded leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500
            "
          >
            <option value="en">
              English
            </option>
            <option value="ja">
              日本語
            </option>
          </select>
          <div
            class="
              pointer-events-none
              absolute inset-y-0 right-0
              flex items-center
              px-2
              text-gray-700
            "
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            ><path
              d="
                M9.293 12.95
                l.707.707
                L15.657 8
                l-1.414-1.414
                L10 10.828 5.757 6.586 4.343 8
                z
              "
            /></svg>
          </div>
        </div>
      </div>
      <div class="w-full px-3 mb-6">
        <label
          class="block tracking-wide text-sm font-semibold mb-2"
          for="theme"
        >
          Theme
        </label>
        <div class="relative">
          <select
            id="theme"
            v-model="theme"
            class="
              block appearance-none w-full
              bg-gray-200 border border-gray-200 text-gray-700
              py-1 px-4 pr-8 rounded leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500
            "
          >
            <option value="green_32">
              green(32px)
            </option>
            <option value="MS_32">
              MS(32px)
            </option>
            <option value="green_16">
              green(16px)
            </option>
            <option value="MS_16">
              MS(16px)
            </option>
          </select>
          <div
            class="
              pointer-events-none
              absolute inset-y-0 right-0
              flex items-center
              px-2
              text-gray-700
            "
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            ><path
              d="
                M9.293 12.95
                l.707.707
                L15.657 8
                l-1.414-1.414
                L10 10.828 5.757 6.586 4.343 8
                z
              "
            /></svg>
          </div>
        </div>
      </div>
      <div class="w-full px-3 mb-6">
        <label
          class="block tracking-wide text-sm font-semibold mb-2"
          for="level"
        >
          Level
        </label>
        <div class="relative">
          <select
            id="level"
            v-model="level"
            class="
              block appearance-none w-full
              bg-gray-200 border border-gray-200 text-gray-700
              py-1 px-4 pr-8 rounded leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500
            "
          >
            <option value="easy">
              Easy
            </option>
            <option value="medium">
              Medium
            </option>
            <option value="hard">
              Hard
            </option>
            <option value="custom">
              Custom
            </option>
          </select>
          <div
            class="
              pointer-events-none
              absolute inset-y-0 right-0
              flex items-center
              px-2
              text-gray-700
            "
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            ><path
              d="
                M9.293 12.95
                l.707.707
                L15.657 8
                l-1.414-1.414
                L10 10.828 5.757 6.586 4.343 8
                z
              "
            /></svg>
          </div>
        </div>
      </div>
      <template v-if="level === 'custom'">
        <div class="w-full px-3 mb-6">
          <label
            class="block tracking-wide text-sm font-semibold mb-2"
            for="width"
          >
            Width
          </label>
          <input
            id="width"
            v-model="width"
            class="
              block appearance-none w-full
              bg-gray-200 border border-gray-200 text-gray-700
              py-1 px-4 rounded leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500
            "
            type="number"
            placeholder="9 - 30"
          >
        </div>
        <div class="w-full px-3 mb-6">
          <label
            class="block tracking-wide text-sm font-semibold mb-2"
            for="height"
          >
            Height
          </label>
          <input
            id="height"
            v-model="height"
            class="
              block appearance-none w-full
              bg-gray-200 border border-gray-200 text-gray-700
              py-1 px-4 rounded leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500
            "
            type="number"
            placeholder="9 - 24"
          >
        </div>
        <div class="w-full px-3 mb-6">
          <label
            class="block tracking-wide text-sm font-semibold mb-2"
            for="mines"
          >
            Mines
          </label>
          <input
            id="mines"
            v-model="mines"
            class="
              block appearance-none w-full
              bg-gray-200 border border-gray-200 text-gray-700
              py-1 px-4 rounded leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500
            "
            type="number"
            placeholder="10 - 999"
          >
        </div>
      </template>
    </form>
  </div>
</template>
