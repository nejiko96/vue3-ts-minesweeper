<script lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { Switch } from '@headlessui/vue'

  import { fillArray, sample, shuffle } from '@/core/utils'
  import {
    FlagFilterType,
    FlagType,
    getFilterList,
    getFilter,
    getFlagList,
  } from '../models/flagsModel'
  import FlagTrainingPanel from '../components/FlagTrainingPanel.vue'
  import TrainingSelectDialog from '../components/TrainingSelectDialog.vue'

  const trainingList = getFilterList()
</script>

<script setup lang="ts">
  const trainingObj = ref<FlagFilterType>(sample(trainingList))

  const flagGroups = ref<FlagType[][]>([])

  const english = ref(false)

  const lang = computed(() => (english.value ? 'en' : 'ja'))

  const isDialogOpen = ref(false)

  const handleRestart = () => {
    const flags = shuffle(getFlagList(trainingObj.value.id))
    const sz = flags.length
    const sg = Math.ceil(sz / 6)
    const [q, r] = [(sz / sg) | 0, sz % sg]
    flagGroups.value = fillArray<FlagType[]>(sg, (i) =>
      flags.slice(q * i + Math.min(i, r), q * (i + 1) + Math.min(i + 1, r))
    )
  }

  const handleTrainingSelect = (id: string) => {
    trainingObj.value = getFilter(id)
    handleRestart()
    isDialogOpen.value = false
  }

  onMounted(handleRestart)
</script>

<template>
  <div class="relative bg-gray-200 p-4 text-center dark:bg-gray-800">
    <h1 class="mb-4 text-3xl font-semibold">
      National Flag Training :
      <button
        class="rounded-lg border-2 border-transparent bg-orange-500 px-4 py-2 text-white transition duration-300 hover:border-orange-300 hover:bg-orange-600"
        @click="isDialogOpen = true"
      >
        {{ trainingObj.title[lang] }}
      </button>
    </h1>
    <FlagTrainingPanel
      v-for="(flags, i) in flagGroups"
      :key="i"
      :flags="flags"
      :lang="lang"
    ></FlagTrainingPanel>
    <div class="absolute top-2.5 right-2.5">
      <span
        class="cursor-pointer rounded-lg px-1.5 text-3xl hover:bg-gray-300 dark:hover:bg-gray-600"
        @click="english = false"
        >🇯🇵</span
      >
      <Switch
        v-model="english"
        :class="english ? 'bg-orange-500' : 'bg-orange-300'"
        class="relative inline-flex h-[24px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span class="sr-only">Language</span>
        <span
          aria-hidden="true"
          :class="english ? 'translate-x-7' : 'translate-x-0'"
          class="pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        ></span>
      </Switch>
      <span
        class="cursor-pointer rounded-lg px-1.5 text-3xl hover:bg-gray-300 dark:hover:bg-gray-600"
        @click="english = true"
        >🇬🇧</span
      >
    </div>
  </div>
  <TrainingSelectDialog
    :trainings="trainingList"
    :is-open="isDialogOpen"
    :lang="lang"
    @close="isDialogOpen = false"
    @select="(id: string) => handleTrainingSelect(id)"
  ></TrainingSelectDialog>
</template>
