<script lang="ts">
  import { shallowRef } from 'vue'

  import MsView from '@/views/MsView.vue'
  import CatView from '@/views/CatView.vue'
</script>

<script setup lang="ts">
  const currentView = shallowRef(MsView)
</script>

<template>
  <header>
    <nav class="bg-teal-500 text-white">
      <div
        class="container mx-auto flex h-16 items-center justify-between px-2 py-4"
      >
        <h1 class="text-xl font-semibold">Vue3 + TypeScript demo page</h1>

        <div>
          <ul class="flex items-center justify-end pb-0">
            <li>
              <a
                href="#"
                class="rounded px-8 py-2 hover:bg-teal-600"
                @click="currentView = MsView"
                >Minesweeper</a
              >
            </li>
            <li class="--border-none">
              <a
                href="#"
                class="rounded px-8 py-2 hover:bg-teal-600"
                @click="currentView = CatView"
                >Cat API</a
              >
            </li>
          </ul>
        </div>

        <a
          href="https://github.com/nejiko96/vue3-ts-minesweeper"
          target="_blank"
          title="View source on GitHub"
          aria-label="View source on GitHub"
        >
          <fa icon="fa-brands fa-github" size="2xl" />
        </a>
      </div>
    </nav>
  </header>
  <main>
    <keep-alive>
      <component :is="currentView" />
    </keep-alive>
  </main>
</template>
