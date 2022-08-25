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
      class="block mx-auto px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold border-2 border-transparent hover:border-red-300 cursor-pointer transition duration-300"
      @click="handleClick"
    >
      Today's Cat
    </button>
    <img class="mx-auto mt-4" :src="catImageUrl" width="500" height="auto" />
  </div>
</template>
