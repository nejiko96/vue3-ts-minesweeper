<script lang="ts">
  import { onMounted, ref } from 'vue'
  import {
    TransitionRoot,
    Dialog,
    TransitionChild,
    DialogPanel,
  } from '@headlessui/vue'

  import { fillArray, sample, shuffle } from '@/core/utils'
  import {
    FlagType,
    FlagFilterType,
    getFilter,
    getFlagList,
    getFilterList,
  } from '../models/flagsModel'
  import FlagTrainingPanel from '../components/FlagTrainingPanel.vue'

  const trainingList = getFilterList()
</script>

<script setup lang="ts">
  const trainingObj = ref<FlagFilterType>(sample(trainingList))

  const flagGroups = ref<FlagType[][]>([])

  const handleRestart = () => {
    const flags = shuffle(getFlagList(trainingObj.value.id))
    const sz = flags.length
    const sg = Math.ceil(sz / 6)
    const [q, r] = [(sz / sg) | 0, sz % sg]
    flagGroups.value = fillArray<FlagType[]>(sg, (i) =>
      flags.slice(q * i + Math.min(i, r), q * (i + 1) + Math.min(i + 1, r))
    )
  }

  const isDialogOpen = ref(false)

  const handleTrainingSelect = (id: string) => {
    trainingObj.value = getFilter(id)
    handleRestart()
    isDialogOpen.value = false
  }

  onMounted(handleRestart)
</script>

<template>
  <div class="bg-gray-200 p-4 text-center dark:bg-gray-800">
    <h1 class="mb-4 text-3xl font-semibold">
      National Flag Training :
      <button
        class="rounded-lg border-2 border-transparent bg-orange-500 px-4 py-2 text-white transition duration-300 hover:border-orange-300 hover:bg-orange-600"
        @click="isDialogOpen = true"
      >
        {{ trainingObj.titleJa }}
      </button>
    </h1>
    <FlagTrainingPanel
      v-for="(flags, i) in flagGroups"
      :key="i"
      :flags="flags"
    ></FlagTrainingPanel>
  </div>
  <TransitionRoot :show="isDialogOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="isDialogOpen = false">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all"
            >
              <div class="mt-2 flex justify-evenly">
                <div v-for="i in 3" :key="i">
                  <ul>
                    <template
                      v-for="tr in trainingList.slice((i - 1) * 12, i * 12)"
                      :key="tr.id"
                    >
                      <li
                        class="mb-2 rounded bg-orange-500 px-4 py-1 text-white"
                        @click="() => handleTrainingSelect(tr.id)"
                      >
                        {{ tr.titleJa }}
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div></Dialog
    ></TransitionRoot
  >
</template>

<style scoped>
  .ghost {
    opacity: 0.5;
  }
</style>
