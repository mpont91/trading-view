<script setup lang="ts">
import SystemStatus from '../components/domain/status/SystemStatus.vue'
import ActivePositions from '../components/domain/positions/ActivePositions.vue'
import Performance from '../components/domain/performance/performance.vue'
import Portfolio from '../components/domain/portfolio/portfolio.vue'
import LastActivity from '../components/domain/activity/LastActivity.vue'
</script>

<template>
  <div class="flex flex-col gap-6 max-w-7xl mx-auto w-full">
    <SystemStatus />
    <Portfolio />
    <Performance />
    <ActivePositions />
    <LastActivity />
  </div>
</template>
