<script lang="ts">
  import { onMounted, ref } from 'vue'

  import { fillArray, sample, shuffle } from '@/core/utils'
  import {
    FlagFilterType,
    FlagType,
    getFilterList,
    getFlagList,
  } from '../models/flagsModel'
  import LanguageToggle from '../components/LanguageToggle.vue'
  import TrainingSelectDialog from '../components/TrainingSelectDialog.vue'
  import FlagTrainingPanel from '../components/FlagTrainingPanel.vue'

  const trainingList = getFilterList()
</script>

<script setup lang="ts">
  const trainingObj = ref<FlagFilterType>(sample(trainingList))

  const flagGroups = ref<FlagType[][]>([])

  const lang = ref('ja')

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

  const handleTrainingSelect = (tr: FlagFilterType) => {
    trainingObj.value = tr
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
      <LanguageToggle v-model="lang"></LanguageToggle>
    </div>
  </div>
  <TrainingSelectDialog
    :trainings="trainingList"
    :is-open="isDialogOpen"
    :lang="lang"
    @close="isDialogOpen = false"
    @select="(tr: FlagFilterType) => handleTrainingSelect(tr)"
  ></TrainingSelectDialog>
</template>
