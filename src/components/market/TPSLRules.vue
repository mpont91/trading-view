<template>
  <h3 class="mb-1">TP & SL rules</h3>
  <div class="relative overflow-x-auto mb-4">
    <table class="w-full text-sm text-left text-neutral-400">
      <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
        <tr>
          <th class="px-6 py-3">Take profit</th>
          <th class="px-6 py-3">Stop loss</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b bg-neutral-800 border-neutral-700">
          <td class="px-6 py-4">
            <ul>
              <li v-for="atr in tp.atr">
                ATR({{ atr.period }}) x {{ atr.multiplier }}
              </li>
              <li>Min: {{ tp.min * 100 }}%</li>
              <li>Max: {{ tp.max * 100 }}%</li>
            </ul>
          </td>
          <td class="px-6 py-4">
            <ul>
              <li v-for="atr in sl.atr">
                ATR({{ atr.period }}) x {{ atr.multiplier }}
              </li>
              <li>Min: {{ sl.min * 100 }}%</li>
              <li>Max: {{ sl.max * 100 }}%</li>
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
  IndicatorTPSLRuleSettings,
} from '../../types/settings.ts'

defineProps({
  tp: {
    type: Object as PropType<IndicatorTPSLRuleSettings>,
    required: true,
  },
  sl: {
    type: Object as PropType<IndicatorTPSLRuleSettings>,
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
