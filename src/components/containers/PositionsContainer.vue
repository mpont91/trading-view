<template>
  <TableSkeleton title="Positions" v-if="isLoadingPositions" />
  <CardError title="Positions" v-else-if="hasErrorPositions" />
  <PositionsView v-else :positions="positions" />
</template>
<script setup lang="ts">
import PositionsView from '../views/PositionsView.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import TableSkeleton from '../skeletons/TableSkeleton.vue'
import type { Position } from '../../types/position.ts'

const api = new TradingApi()
const positions = ref<Position[]>([])
const isLoadingPositions = ref(true)
const hasErrorPositions = ref(false)

onMounted(() => {
  fetchPositions()
})

async function fetchPositions() {
  hasErrorPositions.value = false
  isLoadingPositions.value = true
  try {
    positions.value = await api.getPositions()
  } catch (error) {
    hasErrorPositions.value = true
  } finally {
    isLoadingPositions.value = false
  }
}
</script>
