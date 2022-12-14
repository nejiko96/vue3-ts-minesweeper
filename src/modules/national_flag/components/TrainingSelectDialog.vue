<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
  } from '@headlessui/vue'
  import { FlagFilterType } from '../models/flagsModel'

  defineProps<{
    trainings: FlagFilterType[]
    lang: string
    isOpen: boolean
  }>()

  const emits = defineEmits<{
    (e: 'close'): void
    (e: 'select', id: string): void
  }>()
</script>

<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="() => emits('close')">
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
                      v-for="tr in trainings.slice((i - 1) * 12, i * 12)"
                      :key="tr.id"
                    >
                      <li
                        class="mb-2 max-w-[200px] rounded bg-orange-500 px-4 py-1 text-white"
                        @click="() => emits('select', tr.id)"
                      >
                        {{ tr.title[lang] }}
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
