<template>
  <CommissionEquitySkeleton v-if="isLoadingCommissionEquity" />
  <CardError
    title="Commission available"
    v-else-if="hasErrorCommissionEquity"
  />
  <CommissionEquityView v-else :commission-equity="commissionEquity" />
</template>

<script setup lang="ts">
import CommissionEquitySkeleton from '../skeletons/CommissionEquitySkeleton.vue'
import CardError from '../errors/CardError.vue'
import CommissionEquityView from '../views/CommissionEquityView.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import type { CommissionEquity as CommissionEquityType } from '../../types/commission-equity.ts'

const api = new TradingApi()
const commissionEquity = ref<CommissionEquityType | null>(null)
const isLoadingCommissionEquity = ref(true)
const hasErrorCommissionEquity = ref(false)

onMounted(() => {
  fetchCommissionEquity()
})

async function fetchCommissionEquity() {
  hasErrorCommissionEquity.value = false
  isLoadingCommissionEquity.value = true
  try {
    commissionEquity.value = await api.getCommissionEquity()
    console.log(commissionEquity.value)
  } catch (error) {
    hasErrorCommissionEquity.value = true
  } finally {
    isLoadingCommissionEquity.value = false
  }
}
</script>
