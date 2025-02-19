<template>
  <Card>
    <h2>Rules</h2>
    <SideRules :rules="rules.side" />
    <LeverageRules :rules="rules.leverage" />
    <TPSLRules :tp="rules.tp" :sl="rules.sl" />
  </Card>
</template>
<script setup lang="ts">
import Card from '../Card.vue'
import type { PropType } from 'vue'
import type { IndicatorsRulesSettings } from '../../types/settings.ts'
import SideRules from './SideRules.vue'
import LeverageRules from './LeverageRules.vue'
import TPSLRules from './TPSLRules.vue'

defineProps({
  rules: {
    type: Object as PropType<IndicatorsRulesSettings>,
    required: true,
  },
})
</script>
