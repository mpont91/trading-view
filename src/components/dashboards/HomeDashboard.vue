<template>
  <StatusContainer />
  <EquityGraphContainer />
  <PerformanceContainer />
  <CommissionEquityContainer />
  <PositionsContainer />
  <TrailingContainer />
  <LastTradesContainer />
</template>
<script setup lang="ts">
import StatusContainer from '../containers/StatusContainer.vue'
import EquityGraphContainer from '../containers/EquityGraphContainer.vue'
import PerformanceContainer from '../containers/PerformanceContainer.vue'
import CommissionEquityContainer from '../containers/CommissionEquityContainer.vue'
import LastTradesContainer from '../containers/LastTradesContainer.vue'
import PositionsContainer from '../containers/PositionsContainer.vue'
import TrailingContainer from '../containers/TrailingContainer.vue'
</script>
