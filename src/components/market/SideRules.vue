<template>
  <h3 class="mb-1">Side rules</h3>
  <div class="relative overflow-x-auto mb-4">
    <table class="w-full text-sm text-left text-neutral-400">
      <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
        <tr>
          <th v-for="rule in rules" class="px-6 py-3">
            {{ rule.value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b bg-neutral-800 border-neutral-700">
          <td class="px-6 py-4" v-for="rule in rules">
            <ul>
              <li v-for="condition in rule.conditions">
                {{ formatCondition(condition) }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type {
  IndicatorConditionRuleSettings,
  IndicatorSideRuleSettings,
} from '../../types/settings.ts'

defineProps({
  rules: {
    type: Array as PropType<IndicatorSideRuleSettings[]>,
    required: true,
  },
})

const formatCondition = (condition: IndicatorConditionRuleSettings): string => {
  if (condition.compareWith) {
    return `${condition.indicator.toUpperCase()}(${condition.period}) ${condition.condition} ${condition.compareWith.indicator.toUpperCase()}(${condition.compareWith.period})`
  } else {
    return `${condition.indicator.toUpperCase()}(${condition.period}) ${condition.condition} ${condition.threshold}`
  }
}
</script>
