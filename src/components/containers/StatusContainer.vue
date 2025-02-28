<template>
  <StatusSkeleton v-if="isLoadingUptime" />
  <CardError title="Status" v-else-if="hasErrorUptime" />
  <StatusView v-else :uptime="uptime" />
</template>
<script setup lang="ts">
import StatusSkeleton from '../skeletons/StatusSkeleton.vue'
import StatusView from '../views/StatusView.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'

const api = new TradingApi()
const uptime = ref<number>(0)
const isLoadingUptime = ref(true)
const hasErrorUptime = ref(false)

onMounted(() => {
  fetchUptime()
})

async function fetchUptime() {
  hasErrorUptime.value = false
  isLoadingUptime.value = true
  try {
    uptime.value = await api.getUptime()
  } catch (error) {
    hasErrorUptime.value = true
  } finally {
    isLoadingUptime.value = false
  }
}
</script>
