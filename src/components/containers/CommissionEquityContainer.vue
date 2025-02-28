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
import { createEmptyCommissionEquity } from '../../helpers/commission-helper.ts'
import type { TradingMode } from '../../types/trading-mode.ts'
import type { CommissionEquity as CommissionEquityType } from '../../types/commission-equity.ts'
import type { PropType } from 'vue'

const props = defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
})

const api = new TradingApi(props.tradingMode)
const commissionEquity = ref<CommissionEquityType>(
  createEmptyCommissionEquity(),
)
const isLoadingCommissionEquity = ref(true)
const hasErrorCommissionEquity = ref(false)

onMounted(() => {
  if (props.tradingMode === 'spot') {
    fetchCommissionEquity()
  }
})

async function fetchCommissionEquity() {
  hasErrorCommissionEquity.value = false
  isLoadingCommissionEquity.value = true
  try {
    commissionEquity.value = await api.getCommissionEquity()
  } catch (error) {
    hasErrorCommissionEquity.value = true
  } finally {
    isLoadingCommissionEquity.value = false
  }
}
</script>
