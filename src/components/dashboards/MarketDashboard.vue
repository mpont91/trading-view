<template>
  <LastStrategiesContainer trading-mode="spot" />
  <LastStrategiesContainer trading-mode="futures" />
  <LastOpportunitiesContainer trading-mode="spot" />
  <LastOpportunitiesContainer trading-mode="futures" />
</template>
<script setup lang="ts">
import LastStrategiesContainer from '../containers/LastStrategiesContainer.vue'
import LastOpportunitiesContainer from '../containers/LastOpportunitiesContainer.vue'
</script>
