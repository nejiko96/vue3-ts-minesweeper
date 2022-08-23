<script setup lang="ts">
import MsView from '@/views/MsView.vue'
</script>

<template>
  <header>
    <nav
      class="bg-teal-500 text-white"
    >
      <div
        class="
          container mx-auto px-2 py-4 h-16
          flex justify-between items-center
        "
      >
        <h1 class="text-xl font-semibold">
          Vue3 + TypeScript demo page
        </h1>

        <div>
          <ul class="flex justify-end items-center pb-0">
            <li>
              <a
                href="#"
                class="hover:bg-teal-600 px-8 py-2 rounded"
              >Minesweeper</a>
            </li>
            <li class="--border-none">
              <a
                href="#"
                class="hover:bg-teal-600 px-8 py-2 rounded"
              >Cat API</a>
            </li>
          </ul>
        </div>

        <a
          href="https://github.com/nejiko96/vue3-ts-minesweeper"
          target="_blank"
          title="View source on GitHub"
          aria-label="View source on GitHub"
        >
          <fa
            icon="fa-brands fa-github"
            size="2xl"
          />
        </a>
      </div>
    </nav>
  </header>
  <main>
    <ms-view />
  </main>
</template>
