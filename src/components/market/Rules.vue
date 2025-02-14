<template>
  <Card>
    <h2>Rules</h2>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-neutral-400">
        <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
          <tr>
            <th class="px-6 py-3">Type</th>
            <th class="px-6 py-3">Value</th>
            <th class="px-6 py-3">Conditions</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(rule, index) in rules.side" :key="'side-' + index">
            <tr class="border-b bg-neutral-800 border-neutral-700">
              <td v-if="index === 0" :rowspan="rules.side.length">Side</td>
              <td>{{ rule.value.toUpperCase() }}</td>
              <td v-if="rule.conditions.length > 0">
                <ul>
                  <li
                    v-for="(condition, cIndex) in rule.conditions"
                    :key="'side-condition-' + cIndex"
                  >
                    {{ formatCondition(condition) }}
                  </li>
                </ul>
              </td>
            </tr>
          </template>

          <template
            v-for="(rule, index) in rules.leverage"
            :key="'leverage-' + index"
          >
            <tr class="border-b bg-neutral-800 border-neutral-700">
              <td v-if="index === 0" :rowspan="rules.leverage.length">
                Leverage
              </td>
              <td>{{ rule.value }}x</td>
              <td v-if="rule.conditions.length > 0">
                <ul>
                  <li
                    v-for="(condition, cIndex) in rule.conditions"
                    :key="'leverage-condition-' + cIndex"
                  >
                    {{ formatCondition(condition) }}
                  </li>
                </ul>
              </td>
            </tr>
          </template>

          <template v-for="(tp, index) in rules.tp" :key="'tp-' + index">
            <tr class="border-b bg-neutral-800 border-neutral-700">
              <td v-if="index === 0" :rowspan="rules.tp.length">TP</td>
              <td>ATR({{ tp.period }}) × {{ tp.multiplier }}</td>
            </tr>
          </template>

          <template v-for="(sl, index) in rules.sl" :key="'sl-' + index">
            <tr class="border-b bg-neutral-800 border-neutral-700">
              <td v-if="index === 0" :rowspan="rules.sl.length">SL</td>
              <td>ATR({{ sl.period }}) × {{ sl.multiplier }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '../Card.vue'
import type { PropType } from 'vue'
import type {
  IndicatorConditionRuleSettings,
  IndicatorsRulesSettings,
} from '../../types/settings.ts'

defineProps({
  rules: {
    type: Object as PropType<IndicatorsRulesSettings>,
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
