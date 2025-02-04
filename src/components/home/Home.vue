<template>
  <StatusSkeleton v-if="isLoadingUptime" />
  <CardError title="Status" v-else-if="hasErrorUptime" />
  <Status v-else :uptime="uptime" />
</template>
<script setup lang="ts">
import Status from './Status.vue'
import StatusSkeleton from '../skeletons/StatusSkeleton.vue'
import CardError from '../errors/CardError.vue'
import { TradingApi } from '../../trading-api.ts'
import { ref, onMounted } from 'vue'

const api = new TradingApi()
const uptime = ref<Number>(0)

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
