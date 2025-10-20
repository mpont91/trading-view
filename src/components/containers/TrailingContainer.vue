<template>
  <TableSkeleton title="Trailing" v-if="isLoadingTrailing" />
  <CardError title="Trailing" v-else-if="hasErrorTrailing" />
  <TrailingView v-else :trailing="trailing" />
</template>
<script setup lang="ts">
import TrailingView from '../views/TrailingView.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import TableSkeleton from '../skeletons/TableSkeleton.vue'
import type { Trailing } from '../../types/trailing.ts'

const api = new TradingApi()
const trailing = ref<Trailing[]>([])
const isLoadingTrailing = ref(true)
const hasErrorTrailing = ref(false)

onMounted(() => {
  fetchTrailing()
})

async function fetchTrailing() {
  hasErrorTrailing.value = false
  isLoadingTrailing.value = true
  try {
    trailing.value = await api.getTrailing()
  } catch (error) {
    hasErrorTrailing.value = true
  } finally {
    isLoadingTrailing.value = false
  }
}
</script>
