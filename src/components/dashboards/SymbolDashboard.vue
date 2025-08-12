<template>
  <LastTradesContainer :symbol="symbol" />
</template>
<script setup lang="ts">
import LastTradesContainer from '../containers/LastTradesContainer.vue'

defineProps({
  symbol: {
    type: String,
    required: true,
  },
})
</script>
