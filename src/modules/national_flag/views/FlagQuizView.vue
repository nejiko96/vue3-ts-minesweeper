<script setup lang="ts">
  import { fillArray, sample, shuffle } from '@/core/utils'
  import { ref, computed } from 'vue'
  import {
    FlagQuizSettingType,
    getQuizSettingList,
    getFlagList,
  } from '../models/flagsModel'
  import FlagQuizPanel, { FlagQuizType } from '../components/FlagQuizPanel.vue'

  type FlagQuizNoType = {
    correct?: boolean
  } & FlagQuizType

  const settings = getQuizSettingList()

  const setting = ref<FlagQuizSettingType | null>(null)

  const qs = ref<FlagQuizNoType[]>([])

  const cur = ref(-1)

  const ccnt = computed(() => qs.value.filter((q) => q.correct).length)

  const handleSelectSetting = (st: FlagQuizSettingType) => {
    setting.value = st
    const flags = shuffle(getFlagList(st.range))
    qs.value = fillArray(st.qcnt, (i) => {
      const options = flags.slice(i * 4, (i + 1) * 4)
      const answer = sample(options)
      return { answer, options }
    })
    cur.value = 0
  }

  const handleAnswer = (q: FlagQuizNoType, i: number, correct: boolean) => {
    q.correct = correct
    window.setTimeout(() => {
      cur.value = i + 1
    }, 500)
  }

  const handleRestart = () => {
    setting.value = null
    qs.value = []
    cur.value = -1
  }
</script>

<template>
  <div
    class="p-4 text-center"
    :class="qs[cur] ? 'bg-gray-100 dark:bg-gray-800' : ''"
  >
    <div v-if="setting === null">
      <h1 class="mb-10 text-3xl font-semibold">National Flag Quiz</h1>

      <div class="flex h-[400px] flex-col items-center justify-start gap-y-6">
        <button
          v-for="(st, i) in settings"
          :key="i"
          class="w-[550px] rounded-lg border-2 border-transparent bg-orange-500 py-2 text-3xl text-white hover:border-orange-300 hover:bg-orange-600"
          @click="() => handleSelectSetting(st)"
        >
          {{ st.title['ja'] }} ( {{ st.qcnt }} / {{ st.tcnt }} )
        </button>
      </div>
    </div>
    <div v-else-if="cur < setting.qcnt">
      <h1 class="mb-10 text-3xl font-semibold">
        National Flag Quiz : {{ setting.title['ja'] }} ({{ cur + 1 }}/{{
          setting.qcnt
        }})
      </h1>
      <template v-for="(q, i) in qs" :key="i">
        <FlagQuizPanel
          v-show="i === cur"
          :q="q"
          @answer="(correct) => handleAnswer(q, i, correct)"
        />
      </template>
    </div>
    <div v-else>
      <h1 class="mb-10 text-3xl font-semibold">
        National Flag Quiz : {{ setting.title['ja'] }} (Result)
      </h1>
      <div>
        <div class="mb-10 flex flex-row justify-center gap-x-5">
          <div>
            <div class="text-xl">correct</div>
            <div class="text-5xl">{{ ccnt }}</div>
          </div>
          <div>
            <div class="text-xl">&nbsp;</div>
            <div class="text-5xl">/</div>
          </div>
          <div>
            <div class="text-xl">total</div>
            <div class="text-5xl">{{ setting.qcnt }}</div>
          </div>
        </div>
        <button
          class="w-[200px] rounded-lg border-2 border-transparent bg-orange-500 py-2 text-3xl text-white hover:border-orange-300 hover:bg-orange-600"
          @click="handleRestart"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>
