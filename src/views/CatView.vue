<script lang="ts">
  import { ref, onBeforeMount } from 'vue'

  interface CatCategory {
    id: number
    name: string
  }

  interface SearchCatImage {
    breeds: string[]
    categories: CatCategory[]
    id: string
    url: string
    width: number
    height: number
  }

  const fetchCatImage = async (): Promise<SearchCatImage> => {
    const res = await fetch('https://api.thecatapi.com/v1/images/search')
    const result = await res.json()
    return result[0]
  }
</script>

<script setup lang="ts">
  const catImageUrl = ref('')

  const updateCatImage = async () => {
    const image = await fetchCatImage()
    catImageUrl.value = image.url
  }

  const handleClick = updateCatImage

  onBeforeMount(updateCatImage)
</script>

<template>
  <div class="p-4">
    <button
      class="mx-auto block cursor-pointer rounded border-2 border-transparent bg-red-500 px-4 py-2 font-semibold text-white transition duration-300 hover:border-red-300 hover:bg-red-600"
      @click="handleClick"
    >
      Today's Cat
    </button>
    <img class="mx-auto mt-4" :src="catImageUrl" width="500" height="auto" />
  </div>
</template>
