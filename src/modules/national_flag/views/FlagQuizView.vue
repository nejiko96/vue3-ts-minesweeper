<script setup lang="ts">
  import { fillArray, sample } from '@/core/utils'
  import { ref, computed } from 'vue'
  import {
    FlagQuizSettingType,
    getQuizSettingList,
    getFlagList,
  } from '../models/flagsModel'
  import LanguageToggle, { LangType } from '../components/LanguageToggle.vue'
  import FlagQuizPanel, { FlagQuizType } from '../components/FlagQuizPanel.vue'

  type FlagQuizResultType = {
    correct?: boolean
  } & FlagQuizType

  const title = { ja: '国旗当てクイズ', en: 'National Flag Quiz' }

  const settings = getQuizSettingList()

  const setting = ref<FlagQuizSettingType | null>(null)

  const qs = ref<FlagQuizResultType[]>([])

  const qi = ref(-1)

  const ccnt = computed((): number => qs.value.filter((q) => q.correct).length)

  const lang = ref<LangType>('ja')

  const handleSelectSetting = (st: FlagQuizSettingType) => {
    setting.value = st

    const flags = getFlagList(st.range)
    if (st.qcnt * 4 <= st.tcnt) {
      const shuffled = sample(flags, st.qcnt * 4)
      qs.value = fillArray<FlagQuizResultType>(st.qcnt, (i) => {
        const options = shuffled.slice(i * 4, (i + 1) * 4)
        const answer = sample(options)
        return { answer, options }
      })
    } else {
      const as = sample(flags, st.qcnt)
      qs.value = as.map<FlagQuizResultType>((answer) => {
        const options = sample(flags, 4)
        if (!options.includes(answer)) {
          options[Math.floor(Math.random() * 4)] = answer
        }
        return { answer, options }
      })
    }
    qi.value = 0
  }

  const handleAnswer = (q: FlagQuizResultType, i: number, correct: boolean) => {
    q.correct = correct
    window.setTimeout(() => {
      qi.value = i + 1
    }, 500)
  }

  const handleRestart = () => {
    setting.value = null
    qs.value = []
    qi.value = -1
  }
</script>

<template>
  <div class="relative p-4 text-center">
    <Transition
      enter-active-class="transition-opacity duration-500 delay-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-500 ease"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="setting === null">
        <h1 class="mb-10 text-3xl font-semibold">{{ title[lang] }}</h1>

        <div class="flex h-[400px] flex-col items-center justify-start gap-y-6">
          <button
            v-for="(st, i) in settings"
            :key="i"
            class="w-[550px] rounded-lg border-2 border-transparent bg-orange-500 py-2 text-3xl text-white transition duration-300 hover:border-orange-300 hover:bg-orange-600"
            @click="() => handleSelectSetting(st)"
          >
            {{ st.title[lang] }} ( {{ st.qcnt }} / {{ st.tcnt }} )
          </button>
        </div>
      </div>
      <div v-else-if="qi < setting.qcnt">
        <h1 class="mb-10 text-3xl font-semibold">
          {{ title[lang] }} : {{ setting.title[lang] }} ({{ qi + 1 }}/{{
            setting.qcnt
          }})
        </h1>
        <TransitionGroup
          leave-active-class="transition duration-500 ease"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          enter-active-class="transition delay-500 duration-500 ease"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
        >
          <FlagQuizPanel
            v-for="(q, i) in qs"
            v-show="i === qi"
            :key="i"
            :q="q"
            class="mb-4"
            :lang="lang"
            @answer="(correct) => handleAnswer(q, i, correct)"
          />
        </TransitionGroup>
      </div>
      <div v-else>
        <h1 class="mb-10 text-3xl font-semibold">
          {{ title[lang] }} : {{ setting.title[lang] }} (Result)
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
            class="w-[200px] rounded-lg border-2 border-transparent bg-orange-500 py-2 text-3xl text-white transition duration-300 hover:border-orange-300 hover:bg-orange-600"
            @click="handleRestart"
          >
            Back
          </button>
        </div>
      </div>
    </Transition>
    <div class="absolute right-2.5 top-2.5">
      <LanguageToggle v-model="lang"></LanguageToggle>
    </div>
  </div>
</template>
