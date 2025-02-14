<template>
  <IndicatorsSkeleton v-if="isLoadingIndicators" />
  <CardError title="Indicators" v-else-if="hasErrorIndicators" />
  <Indicators v-else :indicators="indicators" :rules="rules" />

  <RulesSkeleton v-if="isLoadingRules" />
  <CardError title="Rules" v-else-if="hasErrorRules" />
  <Rules v-else :rules="rules" />

  <StrategiesSkeleton v-if="isLoadingStrategies" />
  <CardError title="Strategies" v-else-if="hasErrorStrategies" />
  <Strategies v-else :strategies="strategies" />

  <OpportunitiesSkeleton v-if="isLoadingOpportunities" />
  <CardError title="Latest opportunities" v-else-if="hasErrorOpportunities" />
  <Strategies v-else :strategies="opportunities" />
</template>
<script setup lang="ts">
import Indicators from './Indicators.vue'
import Strategies from './Strategies.vue'
import Rules from './Rules.vue'
import IndicatorsSkeleton from '../skeletons/IndicatorsSkeleton.vue'
import CardError from '../errors/CardError.vue'
import { TradingApi } from '../../trading-api.ts'
import { ref, onMounted } from 'vue'
import type { Indicator } from '../../types/indicator.ts'
import type { Strategy } from '../../types/strategy.ts'
import type { IndicatorsRulesSettings } from '../../types/settings.ts'
import StrategiesSkeleton from '../skeletons/StrategiesSkeleton.vue'
import OpportunitiesSkeleton from '../skeletons/OpportunitiesSkeleton.vue'
import RulesSkeleton from '../skeletons/RulesSkeleton.vue'

const api = new TradingApi()

const indicators = ref<Indicator[]>([])
const isLoadingIndicators = ref(true)
const hasErrorIndicators = ref(false)
const strategies = ref<Strategy[]>([])
const isLoadingStrategies = ref(true)
const hasErrorStrategies = ref(false)
const opportunities = ref<Strategy[]>([])
const isLoadingOpportunities = ref(true)
const hasErrorOpportunities = ref(false)
const rules = ref<IndicatorsRulesSettings>()
const isLoadingRules = ref(true)
const hasErrorRules = ref(false)

onMounted(() => {
  fetchIndicators()
  fetchStrategies()
  fetchLatestOpportunities()
  fetchRules()
})

async function fetchIndicators() {
  hasErrorIndicators.value = false
  isLoadingIndicators.value = true
  try {
    indicators.value = await api.getIndicators()
  } catch (error) {
    hasErrorIndicators.value = true
  } finally {
    isLoadingIndicators.value = false
  }
}

async function fetchStrategies() {
  hasErrorStrategies.value = false
  isLoadingStrategies.value = true
  try {
    strategies.value = await api.getStrategies()
  } catch (error) {
    hasErrorStrategies.value = true
  } finally {
    isLoadingStrategies.value = false
  }
}

async function fetchLatestOpportunities() {
  hasErrorOpportunities.value = false
  isLoadingOpportunities.value = true
  try {
    opportunities.value = await api.getLatestOpportunities()
  } catch (error) {
    hasErrorOpportunities.value = true
  } finally {
    isLoadingOpportunities.value = false
  }
}

async function fetchRules() {
  hasErrorRules.value = false
  isLoadingRules.value = true
  try {
    rules.value = await api.getRules()
  } catch (error) {
    hasErrorRules.value = true
  } finally {
    isLoadingRules.value = false
  }
}
</script>
