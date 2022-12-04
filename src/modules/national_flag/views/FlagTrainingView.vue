<script lang="ts">
  import { onMounted, ref } from 'vue'
  import draggable, { MoveEvent } from 'vuedraggable'
  import { shuffle } from '@/core/utils'

  import FlagLabel from '../components/FlagLabel.vue'
  import { getFlagList, FlagType } from '../models/flagsModel'

  type FlagChoiceType = FlagType & {
    choice: FlagType[]
  }
</script>
<script setup lang="ts">
  const org = ref<FlagType[]>([])

  const shuffled = ref<FlagChoiceType[]>([])

  const checkMove = (evt: MoveEvent<FlagType>): boolean => {
    if (evt.relatedContext.list === org.value) return true
    return evt.relatedContext.list.length === 0
  }

  const handleRestart = () => {
    org.value = getFlagList('area:Middle_Africa')
    // org.value = getFlagList('area:Melanesia')
    // org.value = getFlagList('area:Dependent_Territories_in_Europe')
    // org.value = getFlagList('area:Other')
    // org.value = getFlagList('mainLand:GB')
    // org.value = getFlagList('mainLand:FR')
    // org.value = getFlagList('mainLand:US')
    // org.value = getFlagList('mainLand:NL')
    // org.value = getFlagList('mainLand:Other')
    // org.value = getFlagList('pattern:Red_And_White_Stripe')

    shuffled.value = shuffle(org.value).map((o) => ({
      ...o,
      choice: [],
    }))
  }

  onMounted(handleRestart)
</script>
<template>
  <div class="bg-gray-200 p-4 text-center dark:bg-gray-800">
    <h1 class="mb-10 text-3xl font-semibold">National Flag Gachi Training</h1>

    <div class="flex flex-col items-center justify-center">
      <div class="mb-10 grid grid-cols-3 gap-x-6 gap-y-6">
        <template v-for="flag in shuffled" :key="flag.id">
          <div>
            <div class="mb-2 flex h-[200px] w-[240px] items-center">
              <img class="h-full w-full object-contain" :src="flag.url" />
            </div>
            <div
              class="mx-auto h-auto w-[240px] border-2 border-yellow-400 bg-yellow-100 p-2"
            >
              <draggable
                :list="flag.choice"
                group="flags"
                item-key="id"
                ghost-class="ghost"
                :move="checkMove"
              >
                <template #item="{ element }">
                  <FlagLabel
                    >{{ element.id === flag.id ? '⭕️' : '❌' }}
                    {{ element.nameJa }}</FlagLabel
                  >
                </template>
              </draggable>
            </div>
          </div>
        </template>
      </div>

      <div
        class="h-[150px] w-[700px] border-2 border-yellow-400 bg-yellow-100 p-2"
      >
        <draggable
          :list="org"
          group="flags"
          item-key="id"
          class="flex flex-row flex-wrap gap-x-2 gap-y-2"
          ghost-class="ghost"
          :move="checkMove"
        >
          <template #item="{ element }">
            <FlagLabel>{{ element.nameJa }}</FlagLabel>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .ghost {
    opacity: 0.5;
  }
</style>
