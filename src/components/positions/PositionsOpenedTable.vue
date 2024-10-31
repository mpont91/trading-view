<template>
  <ErrorMessage v-if="hasError" message="Couldn't fetch the positions!" />

  <div v-if="!hasError && !isLoading">
    <PositionsOpenedDataTable :positions="positions" :pairs="pairs" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPairs, getPositions } from '../../api.ts'
import ErrorMessage from '../shared/ErrorMessage.vue'
import PositionsOpenedDataTable from './PositionsOpenedDataTable.vue'
import type { Pair } from '../../models/pair.ts'
import type { Position } from '../../models/position.ts'

const hasError = ref<boolean>(false)
const positions = ref<Position[]>([])
const isLoading = ref<boolean>(true)
const pairs = ref<Pair[]>([])

onMounted(async () => {
  await refresh()
})

async function refresh() {
  isLoading.value = true
  positions.value = []

  try {
    const [fetchedPairs, fetchedPositions] = await Promise.all([
      getPairs(),
      getPositions({
        filters: {
          is_closed: '0',
        },
      }),
    ])

    pairs.value = fetchedPairs
    positions.value = fetchedPositions.data
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
