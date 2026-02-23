<script setup lang="ts">
import SystemStatus from '../components/domain/status/SystemStatus.vue'
import ActivePositions from '../components/domain/positions/ActivePositions.vue'
</script>

<template>
  <div class="flex flex-col gap-6 max-w-7xl mx-auto w-full">
    <SystemStatus />
    <ActivePositions />
  </div>
</template>
