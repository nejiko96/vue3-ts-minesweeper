<script lang="ts">
  import { onMounted, ref } from 'vue'

  import { fillArray, sample, shuffle } from '@/core/utils'
  import {
    FlagGroupType,
    FlagType,
    getGroupList,
    getFlagList,
  } from '../models/flagsModel'
  import LanguageToggle, { LangType } from '../components/LanguageToggle.vue'
  import TrainingSelectDialog from '../components/TrainingSelectDialog.vue'
  import FlagTrainingPanel from '../components/FlagTrainingPanel.vue'

  const trainingList = getGroupList()
</script>

<script setup lang="ts">
  const title = { ja: '国旗暗記ツール', en: 'National Flag Training' }

  const trainingObj = ref<FlagGroupType>(sample(trainingList))

  const flagGroups = ref<FlagType[][]>([])

  const lang = ref<LangType>('ja')

  const isDialogOpen = ref(false)

  const handleRestart = () => {
    const flags = shuffle(getFlagList(trainingObj.value.filter))
    const sz = flags.length
    const sg = Math.ceil(sz / 6)
    const [q, r] = [(sz / sg) | 0, sz % sg]
    flagGroups.value = fillArray<FlagType[]>(sg, (i) =>
      flags.slice(q * i + Math.min(i, r), q * (i + 1) + Math.min(i + 1, r))
    )
  }

  const handleTrainingSelect = (tr: FlagGroupType) => {
    trainingObj.value = tr
    handleRestart()
    isDialogOpen.value = false
  }

  onMounted(handleRestart)
</script>

<template>
  <div class="relative p-4 text-center">
    <h1 class="mb-4 text-3xl font-semibold">
      {{ title[lang] }} :
      <button
        class="rounded-lg border-2 border-transparent px-4 py-2 text-white transition duration-300"
        :class="{
          'bg-orange-500 hover:border-orange-300 hover:bg-orange-600':
            trainingObj.type === 'area',
          'bg-amber-500 hover:border-amber-300 hover:bg-amber-600':
            trainingObj.type === 'mainland',
          'bg-yellow-500 hover:border-yellow-300 hover:bg-yellow-600':
            trainingObj.type === 'design',
        }"
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
    <div class="absolute right-2.5 top-2.5">
      <LanguageToggle v-model="lang"></LanguageToggle>
    </div>
  </div>
  <TrainingSelectDialog
    :trainings="trainingList"
    :is-open="isDialogOpen"
    :lang="lang"
    @close="isDialogOpen = false"
    @select="(tr: FlagGroupType) => handleTrainingSelect(tr)"
  ></TrainingSelectDialog>
</template>
