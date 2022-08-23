<script setup lang="ts">
import MsView from '@/views/MsView.vue'
</script>

<template>
  <header class="bg-teal-500 text-white">
    <nav
      class="container mx-auto px-2 py-4 h-16"
    >
      <div class="flex justify-between items-center">
        <span class="text-xl font-semibold">
          Vue3 + TypeScript minesweeper demo page
        </span>

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
